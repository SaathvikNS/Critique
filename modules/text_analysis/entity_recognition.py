import spacy

nlp = spacy.load("en_core_web_sm")
target_labels = ["PERSON", "FAC", "ORG", "GPE", "LOC", "PRODUCT", "EVENT", "WORK_OF_ART", "LAW", "FACILITY"]

def entity_recognition(text: str):
    doc = nlp(text)

    entities = [(ent.text, ent.label_) for ent in doc.ents if ent.label_ in target_labels]

    return entities