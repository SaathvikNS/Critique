from transformers import pipeline

summarizer = pipeline("summarization", model="sshleifer/distilbart-cnn-12-6")

def get_summary(text: str):
    word_count = len(text.split())

    if word_count >= 200:
        max_len = int(word_count * 0.3)
        min_len = int(word_count * 0.15)
    elif word_count >= 100:
        max_len = int(word_count * 0.4)
        min_len = int(word_count * 0.2)
    else:
        max_len = max(50, int(word_count * 0.5))
        min_len = max(5, int(word_count * 0.2))

    summary = summarizer(text, max_length=max_len, min_length=min_len, do_sample=False)

    """review output contains:
    1. short summary of original text
    """
    return summary[0]['summary_text'].strip()
