from fastapi import APIRouter, HTTPException, File, UploadFile, Form
from fastapi.responses import FileResponse
from pydantic import BaseModel
import random
import os
import tempfile

from modules.audio_analysis.transcription import transcribe_audio
from modules.text_analysis.summarization import get_summary
from modules.text_analysis.entity_recognition import entity_recognition
from modules.audio_analysis.tone_detection import detect_tone
from modules.text_analysis.topic_detection import get_topic
from modules.audio_analysis.clarity_score import compute_clarity_score
from modules.audio_analysis.musical_elements import analyze_musical_elements

router = APIRouter()

SAMPLE_DIR = "assets/AudioAssets"

class TextInput(BaseModel):
    text: str

# phase transcription
@router.post("/audio-transcription")
async def transcribe_audio_file(file: UploadFile = File(...)):
    try:
        _, ext = os.path.splitext(file.filename)
        if ext.lower() not in [".mp3", ".wav", ".m4a", ".flac", ".ogg", ".aac"]:
            raise HTTPException(status_code=400, detail="Unsupported audio format.")

        contents = await file.read()
        with tempfile.NamedTemporaryFile(suffix=ext, delete=False) as tmp:
            tmp.write(contents)
            tmp_path = tmp.name

        result = transcribe_audio(tmp_path)
        os.remove(tmp_path)

        return result

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
# phase Clarity
@router.post("/clarity-score")
async def clarity_score(file: UploadFile = File(...), text: str = Form(...)):
    try:
        _, ext = os.path.splitext(file.filename)
        if ext.lower() not in [".mp3", ".wav", ".m4a", ".flac", ".ogg", ".aac"]:
            raise HTTPException(status_code=400, detail="Unsupported audio format.")

        contents = await file.read()
        with tempfile.NamedTemporaryFile(suffix=ext, delete=False) as tmp:
            tmp.write(contents)
            tmp_path = tmp.name

        result = compute_clarity_score(tmp_path, text)
        os.remove(tmp_path)

        return result

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# phase summarisation
@router.post("/summary")
async def summary(data: TextInput):
    try:
        result = get_summary(data.text)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# phase Tone
@router.post("/tone")
async def tone(data: TextInput):
    try:
        result = detect_tone(data.text)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
# phase Topic
@router.post("/topic")
async def topic(data: TextInput):
    try:
        result = get_topic(data.text)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
# phase Entity
@router.post("/entity")
async def entity(data: TextInput):
    try:
        result = entity_recognition(data.text)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# phase musical element
@router.post("/musical-element")
async def musical_element(file: UploadFile = File(...)):
    try:
        _, ext = os.path.splitext(file.filename)
        if ext.lower() not in [".mp3", ".wav", ".m4a", ".flac", ".ogg", ".aac"]:
            raise HTTPException(status_code=400, detail="Unsupported audio format.")

        contents = await file.read()
        with tempfile.NamedTemporaryFile(suffix=ext, delete=False) as tmp:
            tmp.write(contents)
            tmp_path = tmp.name

        result = analyze_musical_elements(tmp_path)
        os.remove(tmp_path)

        return result

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# phase get sample
@router.get("/get-sample")
def get_sample():
    try:
        files = [f for f in os.listdir(SAMPLE_DIR) if f.lower().endswith(('.wav', '.mp3', '.flac'))]
        if not files:
            raise HTTPException(status_code=404, detail="No audio files found.")
        
        selected_file = random.choice(files)
        file_path = os.path.join(SAMPLE_DIR, selected_file)
        return FileResponse(path=file_path, media_type="audio/mpeg", filename=selected_file)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))