import numpy as np
import re

# # TEMP FIX for librosa compatibility with newer NumPy
# if not hasattr(np, 'complex'):
#     np.complex = complex

import librosa

def compute_clarity_score(audio_path, transcription_text, filler_words=None, expected_wpm_range=(90, 160)):
    if filler_words is None:
        filler_words = {"um", "uh", "like", "you know", "so", "basically", "actually"}

    # Load audio
    y, sr = librosa.load(audio_path, sr=None)
    duration_sec = librosa.get_duration(y=y, sr=sr)

    # 1. Speech Rate (Words Per Minute)
    words = transcription_text.split()
    word_count = len(words)
    wpm = word_count / (duration_sec / 60)
    wpm_score = 1.0 if expected_wpm_range[0] <= wpm <= expected_wpm_range[1] else max(0, 1 - abs(wpm - np.mean(expected_wpm_range)) / 100)

    # 2. Filler Word Frequency
    filler_count = sum(len(re.findall(rf'\b{re.escape(word)}\b', transcription_text.lower())) for word in filler_words)
    filler_ratio = filler_count / max(1, word_count)
    filler_score = max(0, 1 - filler_ratio * 5)  # penalize if more than 5% are filler words

    # 3. Silence / Pause Detection
    frame_length = 2048
    hop_length = 512
    rms = librosa.feature.rms(y=y, frame_length=frame_length, hop_length=hop_length)[0]
    silence_threshold = np.percentile(rms, 10)
    silence_frames = sum(rms < silence_threshold)
    total_frames = len(rms)
    silence_ratio = silence_frames / total_frames
    silence_score = max(0, 1 - silence_ratio)

    # 4. Volume Stability
    volume_std = np.std(rms)
    volume_score = max(0, 1 - min(volume_std * 20, 1))

    # 5. Background Noise Level
    noise_estimate = np.mean(rms[rms < silence_threshold])
    noise_score = max(0, 1 - noise_estimate * 50)

    # Weighted Clarity Score
    clarity_score = (
        wpm_score * 0.2 +
        filler_score * 0.2 +
        silence_score * 0.2 +
        volume_score * 0.2 +
        noise_score * 0.2
    ) * 100

    return {
        "Clarity Score": round(clarity_score, 2),
        "WPM": round(wpm, 2),
        "Filler Score": round(filler_score * 100, 2),
        "Silence Score": round(silence_score * 100, 2),
        "Volume Score": round(volume_score * 100, 2),
        "Noise Score": round(noise_score * 100, 2)
    }
