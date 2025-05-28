from transformers import pipeline

summarizer = pipeline("summarization", model="sshleifer/distilbart-cnn-12-6")

def get_summary(text: str):
    word_count = len(text.split())

    if word_count >= 200:
        max_len = min(512, int(word_count * 0.4 * 1.3)) 
        min_len = int(word_count * 0.2 * 1.3)
    elif word_count >= 100:
        max_len = int(word_count * 0.5 * 1.3)
        min_len = int(word_count * 0.25 * 1.3)
    else:
        max_len = max(50, int(word_count * 0.6 * 1.3))
        min_len = max(10, int(word_count * 0.3 * 1.3))

    if len(text.split()) > 850:
        text = ' '.join(text.split()[:850])

    summary = summarizer( text, max_length=max_len, min_length=min_len, do_sample=False, truncation=True)
        
    """format of output:
    1. short summary of original text
    """

    return summary[0]#['summary_text'].strip()
