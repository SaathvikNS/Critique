import spacy

# Load the English model for spaCy
nlp = spacy.load("en_core_web_sm")

def detect_run_ons(sentences):
    run_ons = []
    for sent in sentences:
        doc = nlp(sent)
        independent_clauses = 0
        # Check for independent clauses (root verbs)
        for token in doc:
            if token.dep_ == "ROOT" and token.pos_ == "VERB":
                independent_clauses += 1
        # Heuristic: More than one independent clause without a coordinating conjunction
        if independent_clauses > 1 and not any(tok.dep_ == "cc" for tok in doc):
            run_ons.append(sent)
    return run_ons

def detect_comma_splices(sentences):
    comma_splices = []
    for sent in sentences:
        if "," in sent:
            doc = nlp(sent)
            clause_count = 0
            # Check for independent clauses (root verbs)
            for token in doc:
                if token.dep_ == "ROOT" and token.pos_ == "VERB":
                    clause_count += 1
            # Heuristic: More than one clause and no coordinating conjunction (cc)
            if clause_count > 1 and not any(tok.dep_ == "cc" for tok in doc):
                comma_splices.append(sent)
    return comma_splices

def analyze_transitions(sentences):
    # Basic transition word checker (can be extended)
    transition_words = ["however", "therefore", "moreover", "on the other hand", "in contrast"]
    awkward = []

    for i in range(1, len(sentences)):
        prev = sentences[i-1].lower()
        curr = sentences[i].lower()
        # If no transition word is found
        if not any(word in curr for word in transition_words):
            # Check for abrupt topic shifts (naive check)
            prev_doc = nlp(sentences[i-1])
            curr_doc = nlp(sentences[i])
            prev_nouns = set([token.lemma_ for token in prev_doc if token.pos_ == "NOUN"])
            curr_nouns = set([token.lemma_ for token in curr_doc if token.pos_ == "NOUN"])
            overlap = prev_nouns.intersection(curr_nouns)
            # If no overlap in nouns, consider it an awkward transition
            if len(overlap) == 0:
                awkward.append((sentences[i-1], sentences[i]))
    return awkward

def analyze_structural_flow(sentences):
    # Combine all flow analysis functions into one
    return {
        "run_on_sentences": detect_run_ons(sentences),
        "comma_splices": detect_comma_splices(sentences),
        "awkward_transitions": analyze_transitions(sentences)
    }

def correct_flow_issues(text):
    """
    Corrects detected flow issues (run-ons, comma splices, awkward transitions).
    Returns the corrected text and an explanation of each change.
    """
    corrected_text = text
    sentences = text.split(". ")

    flow_issues = analyze_structural_flow(sentences)

    # Correct run-on sentences
    for sent in flow_issues['run_on_sentences']:
        original = sent
        corrected = sent.replace(",", ".")  # Simple fix for run-on sentences
        corrected_text = corrected_text.replace(original, corrected)

    # Correct comma splices
    for sent in flow_issues['comma_splices']:
        original = sent
        corrected = sent.replace(",", ";")  # Fix comma splices by replacing commas with semicolons
        corrected_text = corrected_text.replace(original, corrected)

    # Correct awkward transitions
    for prev_sent, curr_sent in flow_issues['awkward_transitions']:
        original = prev_sent + " " + curr_sent
        corrected = prev_sent + ". " + curr_sent  # Fix awkward transition by adding a period
        corrected_text = corrected_text.replace(original, corrected)
    
    return corrected_text