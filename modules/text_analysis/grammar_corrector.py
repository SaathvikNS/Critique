import torch
import language_tool_python
import difflib
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
from sentence_splitter import chunk_text
from flow_detector import correct_flow_issues

# Load model and tools
model_name = "modules/text_analysis/model/model"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSeq2SeqLM.from_pretrained(model_name)
tool = language_tool_python.LanguageTool('en-US')

# Grammar correction using T5 model
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

# Explanation using language tool
def explain_with_languagetool(text: str):
    matches = tool.check(text)
    explanations = []
    for match in matches:
        explanations.append({
            "issue": match.ruleIssueType,
            "category": match.category,
            "message": match.message,
            "suggestions": match.replacements,
            "context": text[match.offset:match.offset + match.errorLength]
        })
    return explanations

# Finding differences between original and corrected text
def diff_suggestions(original: str, corrected: str):
    diff = list(difflib.ndiff(original.split(), corrected.split()))
    suggestions = []
    for i, token in enumerate(diff):
        if token.startswith("- "):
            original_word = token[2:]
            if i + 1 < len(diff) and diff[i + 1].startswith("+ "):
                new_word = diff[i + 1][2:]
                suggestions.append({
                    "original": original_word,
                    "replacement": new_word
                })
    return suggestions

# Main function to process text analysis
def analyze_text(text: str):
    # corrected_flow_text = correct_flow_issues(text)
    chunks = chunk_text(text)  # Chunk text based on sentence boundaries
    corrected_chunks = []
    for chunk in chunks:
        corrected_flow = correct_flow_issues(chunk)
        corrected_text = correct_with_t5(corrected_flow)
        applied_suggestions = apply_languagetool_suggestion(corrected_text)
        corrected_chunks.append(applied_suggestions)
    
    corrected_text = " ".join(corrected_chunks)  # Combine corrected chunks into one text
    
    explanations = explain_with_languagetool(text)
    suggestion_diffs = diff_suggestions(text, corrected_text)

    return {
        "original_text": text,
        "corrected_text": corrected_text,
        "diff_suggestions": suggestion_diffs,
        "explanations": explanations,
    }
