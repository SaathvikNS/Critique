from transformers.pipelines import pipeline

classifier = pipeline("zero-shot-classification", model = "facebook/bart-large-mnli")

def get_topic(text: str):
    candidate_labels = ["Education", "Technology", "Health", "Politics", "Travel"]

    detection = classifier(text, candidate_labels)

    topic = {key: value for key, value in zip(detection["labels"], detection["scores"])}

    return topic