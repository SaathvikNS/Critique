from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from random import randint

from modules.text_analysis.grammar_corrector import analyze_text
from modules.text_analysis.readability_score import readability_score
from modules.text_analysis.tone_detection import detect_tone
from modules.text_analysis.keyword_extraction_and_density import get_word_analysis
from modules.text_analysis.topic_detection import get_topic
from modules.text_analysis.entity_recognition import entity_recognition
from modules.text_analysis.summarization import get_summary
from modules.text_analysis.samples import sample_text

router = APIRouter()

class TextInput(BaseModel):
    text: str

#phase grammar analysis and correction
@router.post("/grammar-analysis")
def grammar_analysis(data: TextInput):
    try:
        result = analyze_text(data.text)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))    

#phase Readability analysis
@router.post("/readability-analysis")
def readability_analysis(data: TextInput):
    try:
        result = readability_score(data.text)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

#phase tone and emotion detection
@router.post("/tone-analysis")
def tone_detection(data: TextInput):
    try:
        result = detect_tone(data.text)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

#phase keyword extraction and density analysis
@router.post("/keyword-analysis")
def keyword_analysis(data: TextInput):
    try:
        result = get_word_analysis(data.text)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

#phase topic detection
@router.post("/topic-detection")
def topic_detection(data: TextInput):
    try:
        result = get_topic(data.text)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

#phase entity recognition
@router.post("/entity-recognition")
def entity(data: TextInput):
    try:
        result = entity_recognition(data.text)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

#phase summary
@router.post("/summary")
def summary(data: TextInput):
    try:
        result = get_summary(data.text)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

#phase get sample text
@router.get("/get-sample")
def get_sample():
    try:
        choice = randint(0,39)
        return sample_text[choice]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))