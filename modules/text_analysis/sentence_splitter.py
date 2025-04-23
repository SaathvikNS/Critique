import re

def split_by_punctuation(text: str):
    return re.split(r'(?<=[.!?]) +', text)

def split_by_word_limit(text: str, max_length: int = 100):
    words = text.split()
    chunks = []
    current_chunk = []
    for word in words:
        if len(" ".join(current_chunk + [word])) > max_length:
            chunks.append(" ".join(current_chunk))
            current_chunk = [word]
        else:
            current_chunk.append(word)
    if current_chunk:
        chunks.append(" ".join(current_chunk))
    return chunks

def chunk_text(text: str, max_length: int = 500):
    sentences = split_by_punctuation(text)
    chunks = []
    for sentence in sentences:
        if len(sentence) > max_length:
            word_chunks = split_by_word_limit(sentence, max_length)
            chunks.extend(word_chunks)
        else:
            chunks.append(sentence)

    return chunks
