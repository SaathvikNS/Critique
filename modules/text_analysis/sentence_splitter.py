import re

# First, split by punctuation marks
def split_by_punctuation(text: str):
    return re.split(r'(?<=[.!?]) +', text)

# Second, split by word count if the chunk exceeds max_length
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

# Third, chunk sentences that are too long even after splitting by words
def chunk_text(text: str, max_length: int = 500):
    # First, split by punctuation
    sentences = split_by_punctuation(text)
    
    # Now, check for long sentences and split them if needed
    chunks = []
    for sentence in sentences:
        if len(sentence) > max_length:
            # Split by word count if the sentence is too long
            word_chunks = split_by_word_limit(sentence, max_length)
            chunks.extend(word_chunks)
        else:
            chunks.append(sentence)

    return chunks
