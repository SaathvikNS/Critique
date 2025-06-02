import whisper
import os
import tempfile
from pydub import AudioSegment
from typing import Dict, Any

model = whisper.load_model("base").to("cuda" if whisper.torch.cuda.is_available() else "cpu")

def convert_audio_to_wav(file_path: str) -> str:
    audio = AudioSegment.from_file(file_path)
    audio = audio.set_channels(1).set_frame_rate(16000)
    with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as tmp:
        audio.export(tmp.name, format="wav")
        return tmp.name

def transcribe_with_whisper(wav_path: str) -> Dict[str, Any]:
    result = model.transcribe(wav_path, word_timestamps=False, verbose=False)
    
    transcript = result.get("text", "").strip()
    segments = result.get("segments", [])
    avg_confidence = None

    if segments:
        avg_logprob = sum(seg.get("avg_logprob", 0) for seg in segments) / len(segments)
        avg_confidence = round((2.718 ** avg_logprob) * 100, 2)

    source_type = "lyrics" if any(w in transcript.lower() for w in ["chorus", "verse", "hook", "bridge"]) else "speech"

    return {
        "transcript": transcript,
        "language": result.get("language", "unknown"),
        "duration_seconds": round(segments[-1]["end"], 2) if segments else 0,
        "average_confidence_percent": avg_confidence,
        "source_type": source_type,
    }

def transcribe_audio(file_path: str) -> Dict[str, Any]:
    wav_path = convert_audio_to_wav(file_path)
    try:
        return transcribe_with_whisper(wav_path)
    finally:
        os.remove(wav_path)
