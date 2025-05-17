import torch
import language_tool_python
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
from gramformer import Gramformer 
from sentence_splitter import chunk_text
from type_detector import get_critique
import string

model_name = "modules/text_analysis/model/model"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSeq2SeqLM.from_pretrained(model_name)
tool = language_tool_python.LanguageTool('en-US')
gf = Gramformer(models=1, use_gpu=False)

def correct_with_t5(text: str) -> str:
    input_text = f"grammar: {text}"
    input_ids = tokenizer.encode(input_text, return_tensors="pt", truncation=True)
    with torch.no_grad():
        outputs = model.generate(input_ids, max_length=512)
    corrected = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return corrected

def apply_languagetool_suggestion(text):
    matches=tool.check(text)
    matches = sorted(matches, key=lambda m: m.offset, reverse=True)
    for match in matches:
        if match.replacements:
            text = text[:match.offset] + match.replacements[0] + text[match.offset + match.errorLength:]
    return text

def analyze_text(text: str):
    corrected_chunks = []
    issue_indeces = []

    chunks = chunk_text(text)  
    for chunk in chunks:
        corrected_text = correct_with_t5(chunk)
        applied_suggestions = apply_languagetool_suggestion(corrected_text)
        gramformer_corrected = list(gf.correct(applied_suggestions))
        corrected_chunks.append(gramformer_corrected[0])

    corrected_text = " ".join(corrected_chunks)  

    edits = gf.get_edits(text, corrected_text)

    critique = get_critique(edits)

    for suggestion in edits:
        issue_indeces.append((suggestion[2], suggestion[3]))

    return {
        "original_text": text,
        "issue_indeces": issue_indeces,
        "corrected_text": corrected_text,
        "diff_suggestions": critique,
    }