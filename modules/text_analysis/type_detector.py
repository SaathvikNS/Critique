import difflib

# Predefined confusion sets (can expand this)
COMMON_CONFUSIONS = {
    ('your', "you're"),
    ('there', 'their'),
    ('their', 'there'),
    ('buyed', 'bought'),
    ('alot', 'a lot'),
    ('its', "it's"),
    ('it', 'its'),
}

# Helper function
def is_common_confusion(orig, corr):
    return (orig.lower(), corr.lower()) in COMMON_CONFUSIONS

def is_spelling_error(orig, corr):
    # Rough simple check based on difflib sequence matching
    return difflib.SequenceMatcher(None, orig.lower(), corr.lower()).ratio() > 0.7 and orig.lower() != corr.lower()

def is_case_change(orig, corr):
    return orig.lower() == corr.lower() and orig != corr

def is_punctuation_change(orig, corr):
    punctuations = ',.;:!?'
    return (orig.strip(punctuations) == corr.strip(punctuations))

def is_verb_form_error(orig, corr):
    irregular_verbs = {
        'buy': 'bought', 'go': 'went', 'see': 'saw', 'come': 'came',
        'run': 'ran', 'take': 'took', 'write': 'wrote', 'eat': 'ate',
        'choose': 'chose', 'break': 'broke', 'begin': 'began'
        # Add more if needed
    }
    return (orig.lower() in irregular_verbs and corr.lower() == irregular_verbs[orig.lower()]) or (corr.lower() in irregular_verbs.values())

def is_plural_form_error(orig, corr):
    return (orig.lower() + 's' == corr.lower()) or (orig.lower() == corr.lower() + 's')

def is_tense_change(orig, corr):
    # Very rough heuristic: word changes with 'ed' at end
    return orig.lower() + 'ed' == corr.lower() or (orig.lower().endswith('e') and orig.lower() + 'd' == corr.lower())

def is_subject_verb_agreement_error(orig, corr):
    # example: look → looks
    if orig.endswith('s') or corr.endswith('s'):
        return True
    return False

def detect_types(original_tokens, corrected_tokens):
    types = []
    
    orig_text = " ".join(original_tokens)
    corr_text = " ".join(corrected_tokens)
    
    # Token based checks
    if len(original_tokens) == 1 and len(corrected_tokens) == 1:
        orig = original_tokens[0]
        corr = corrected_tokens[0]

        if is_common_confusion(orig, corr):
            types.append("common_confusion")
        if is_case_change(orig, corr):
            types.append("case_change")
        if is_spelling_error(orig, corr):
            types.append("spelling")
        if is_punctuation_change(orig, corr):
            types.append("punctuation")
        if is_plural_form_error(orig, corr):
            types.append("plural_form")
        if is_verb_form_error(orig, corr):
            types.append("verb_form")
        if is_tense_change(orig, corr):
            types.append("tense_change")
        if is_subject_verb_agreement_error(orig, corr):
            types.append("subject_verb_agreement")
    else:
        # Phrase level
        if any(is_punctuation_change(tok1, tok2) for tok1, tok2 in zip(original_tokens, corrected_tokens)):
            types.append("punctuation")
        if any(is_case_change(tok1, tok2) for tok1, tok2 in zip(original_tokens, corrected_tokens)):
            types.append("case_change")
        if any(is_spelling_error(tok1, tok2) for tok1, tok2 in zip(original_tokens, corrected_tokens)):
            types.append("spelling")
        if any(is_common_confusion(tok1, tok2) for tok1, tok2 in zip(original_tokens, corrected_tokens)):
            types.append("common_confusion")
        if any(is_verb_form_error(tok1, tok2) for tok1, tok2 in zip(original_tokens, corrected_tokens)):
            types.append("verb_form")
        if any(is_tense_change(tok1, tok2) for tok1, tok2 in zip(original_tokens, corrected_tokens)):
            types.append("tense_change")
        if any(is_plural_form_error(tok1, tok2) for tok1, tok2 in zip(original_tokens, corrected_tokens)):
            types.append("plural_form")
        if any(is_subject_verb_agreement_error(tok1, tok2) for tok1, tok2 in zip(original_tokens, corrected_tokens)):
            types.append("subject_verb_agreement")

        types.append("rephrasing")
    
    if not types:
        types.append("other")
    
    return types
