from fastapi import APIRouter, HTTPException, File, UploadFile
from fastapi.responses import FileResponse
import random
import tempfile
import os

from modules.image_analysis.object_detection import object_detection
from modules.image_analysis.image_quality_assessment import image_quality_assessment
from modules.image_analysis.aesthetic_evaluation import aesthetic_evaluation
from modules.image_analysis.emotion_and_mood_analysis import emotion_mood_analysis
from modules.image_analysis.text_extraction import extract_text_from_image

router = APIRouter()

SAMPLE_DIR = "assets"

# phase object detection
@router.post("/object-detection")
async def detect_object(file: UploadFile = File(...)):
    try:
        _, ext = os.path.splitext(file.filename)
        if ext.lower() not in [".jpg", ".jpeg", ".png", ".webp", ".bmp", ".tiff"]:
            raise HTTPException(status_code=400, detail="Unsupported image format.")
        
        contents  = await file.read()
        with tempfile.NamedTemporaryFile(suffix=ext, delete=False) as tmp:
            tmp.write(contents)
            tmp_path = tmp.name
        
        result = object_detection(tmp_path)
        os.remove(tmp_path)

        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# phase image quality assessment
@router.post("/image-quality")
async def image_quality(file: UploadFile = File(...)):
    try:
        _, ext = os.path.splitext(file.filename)
        if ext.lower() not in [".jpg", ".jpeg", ".png", ".webp", ".bmp", ".tiff"]:
            raise HTTPException(status_code=400, detail="Unsupported image format.")
        
        contents  = await file.read()
        with tempfile.NamedTemporaryFile(suffix=ext, delete=False) as tmp:
            tmp.write(contents)
            tmp_path = tmp.name
        
        result = image_quality_assessment(tmp_path)
        os.remove(tmp_path)

        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# phase aesthitic evauation
@router.post("/aesthetic-evaluation")
async def aesthetics(file: UploadFile = File(...)):
    try:
        _, ext = os.path.splitext(file.filename)
        if ext.lower() not in [".jpg", ".jpeg", ".png", ".webp", ".bmp", ".tiff"]:
            raise HTTPException(status_code=400, detail="Unsupported image format.")
        
        contents  = await file.read()
        with tempfile.NamedTemporaryFile(suffix=ext, delete=False) as tmp:
            tmp.write(contents)
            tmp_path = tmp.name
        
        result = aesthetic_evaluation(tmp_path)
        os.remove(tmp_path)

        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# phase emotion detection
@router.post("/emotion-detection")
async def emotion_detection(file: UploadFile = File(...)):
    try:
        _, ext = os.path.splitext(file.filename)
        if ext.lower() not in [".jpg", ".jpeg", ".png", ".webp", ".bmp", ".tiff"]:
            raise HTTPException(status_code=400, detail="Unsupported image format.")
        
        contents  = await file.read()
        with tempfile.NamedTemporaryFile(suffix=ext, delete=False) as tmp:
            tmp.write(contents)
            tmp_path = tmp.name
        
        result = emotion_mood_analysis(tmp_path)
        os.remove(tmp_path)

        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
# phase text extraction
@router.post("/extract-text")
async def text_extraction(file: UploadFile = File(...)):
    try:
        _, ext = os.path.splitext(file.filename)
        if ext.lower() not in [".jpg", ".jpeg", ".png", ".webp", ".bmp", ".tiff"]:
            raise HTTPException(status_code=400, detail="Unsupported image format.")
        
        contents  = await file.read()
        with tempfile.NamedTemporaryFile(suffix=ext, delete=False) as tmp:
            tmp.write(contents)
            tmp_path = tmp.name
        
        result = extract_text_from_image(tmp_path)
        os.remove(tmp_path)

        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
# phase get sample
@router.get("/get-sample")
async def get_sample():
    try:
        allowed_extensions = (".jpg", ".jpeg", ".png", ".webp", ".bmp", ".tiff")
        files = [
            os.path.join(SAMPLE_DIR, f) for f in os.listdir(SAMPLE_DIR) if f.lower().endswith(allowed_extensions)
        ]

        if not files:
            raise HTTPException(status_code=404, detail="No sample image available.")
        
        print("All available files:", files)
        selected_image = random.choice(files)
        print(f"Selected sample image: {selected_image}")
        return FileResponse(selected_image, media_type="image/jpeg")
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))