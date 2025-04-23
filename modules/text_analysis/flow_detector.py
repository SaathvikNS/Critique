import spacy

nlp = spacy.load("en_core_web_sm")

def detect_run_ons(sentences):
    run_ons = []
    for sent in sentences:
        doc = nlp(sent)
        independent_clauses = 0
        for token in doc:
            if token.dep_ == "ROOT" and token.pos_ == "VERB":
                independent_clauses += 1
        if independent_clauses > 1 and not any(tok.dep_ == "cc" for tok in doc):
            run_ons.append(sent)
    return run_ons

def detect_comma_splices(sentences):
    comma_splices = []
    for sent in sentences:
        if "," in sent:
            doc = nlp(sent)
            clause_count = 0
            for token in doc:
                if token.dep_ == "ROOT" and token.pos_ == "VERB":
                    clause_count += 1
            if clause_count > 1 and not any(tok.dep_ == "cc" for tok in doc):
                comma_splices.append(sent)
    return comma_splices

def analyze_transitions(sentences):
    transition_words = ["however", "therefore", "moreover", "on the other hand", "in contrast"]
    awkward = []
    for i in range(1, len(sentences)):
        prev = sentences[i-1].lower()
        curr = sentences[i].lower()
        if not any(word in curr for word in transition_words):
            prev_doc = nlp(sentences[i-1])
            curr_doc = nlp(sentences[i])
            prev_nouns = set([token.lemma_ for token in prev_doc if token.pos_ == "NOUN"])
            curr_nouns = set([token.lemma_ for token in curr_doc if token.pos_ == "NOUN"])
            overlap = prev_nouns.intersection(curr_nouns)
            if len(overlap) == 0:
                awkward.append((sentences[i-1], sentences[i]))
    return awkward

def analyze_structural_flow(sentences):
    return {
        "run_on_sentences": detect_run_ons(sentences),
        "comma_splices": detect_comma_splices(sentences),
        "awkward_transitions": analyze_transitions(sentences)
    }

def correct_flow_issues(text):
    corrected_text = text
    sentences = text.split(". ")
    flow_issues = analyze_structural_flow(sentences)

    for sent in flow_issues['run_on_sentences']:
        original = sent
        corrected = sent.replace(",", ".")  
        corrected_text = corrected_text.replace(original, corrected)

    for sent in flow_issues['comma_splices']:
        original = sent
        corrected = sent.replace(",", ";")  
        corrected_text = corrected_text.replace(original, corrected)

    for prev_sent, curr_sent in flow_issues['awkward_transitions']:
        original = prev_sent + " " + curr_sent
        corrected = prev_sent + ". " + curr_sent  
        corrected_text = corrected_text.replace(original, corrected)
    
    return corrected_text