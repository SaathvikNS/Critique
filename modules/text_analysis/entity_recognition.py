import spacy

nlp = spacy.load("en_core_web_sm")
target_labels = ["PERSON", "FAC", "ORG", "GPE", "LOC", "PRODUCT", "EVENT", "WORK_OF_ART", "LAW", "FACILITY"]
label_map = {
    "PERSON": "Person",
    "FAC": "Facility",
    "ORG": "Organization",
    "GPE": "Geopolitical Entity",
    "LOC": "Location",
    "PRODUCT": "Product",
    "EVENT": "Event",
    "WORK_OF_ART": "Work of Art",
    "LAW": "Law",
    "FACILITY": "Facility",
}

def entity_recognition(text: str):
    doc = nlp(text)

    entities = [(ent.text, label_map[ent.label_]) for ent in doc.ents if ent.label_ in target_labels]

    """format of output:
    1. list of entities in text
    2. labe of that entity
    """

    return entities