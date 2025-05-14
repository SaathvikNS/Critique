from textstat import textstat
import spacy
from wordfreq import word_frequency
from nltk.corpus import wordnet as wn

nlp = spacy.load("en_core_web_sm")

def get_frequent_synonyms(word, original_freq, top_n=3):
    synonyms = set()
    for syn in wn.synsets(word):
        for lemma in syn.lemmas():
            lemma_name = lemma.name().replace('_', ' ')
            if lemma_name.lower() != word.lower():
                synonyms.add(lemma_name)

    scored = []
    for syn in synonyms:
        freq = word_frequency(syn.lower(), 'en')
        if freq > original_freq: 
            scored.append((syn, freq))

    scored.sort(key=lambda x: x[1], reverse=True)
    return [s[0] for s in scored[:top_n]]

def get_simple_replacements(text, readability_score):
    doc = nlp(text)
    suggestions = []

    frequency_threshold = abs(readability_score)/(1000 * (abs(readability_score - 100) +1))
    syllable_threshold = 3

    for token in doc:
        if not token.is_alpha or token.is_stop:
            continue

        word = token.text
        freq = word_frequency(word.lower(), 'en')
        syllable = textstat.syllable_count(word.lower())

        if freq < frequency_threshold and syllable > syllable_threshold:
            simpler_words = get_frequent_synonyms(word, freq)
            if simpler_words:
                suggestions.append({
                    "word": word,
                    "word_index": token.i,
                    "frequency": freq,
                    "suggestions": simpler_words
                })

    return suggestions


def readability_score(text):
    scores = {}

    scores["reading_ease"] = textstat.flesch_reading_ease(text)
    # scores["grade_level"] = textstat.flesch_kincaid_grade(text)
    # scores["gunning_fog"] = textstat.gunning_fog(text)
    # scores["ari"] = textstat.automated_readability_index(text)
    # scores["dale-chall"] = textstat.dale_chall_readability_score(text)
    scores["standard_grade"] = textstat.text_standard(text)
    scores["reading_time"] = textstat.reading_time(text)

    complex_words = get_simple_replacements(text, scores["reading_ease"])

    """review output contains:
    1. flesch reading ease score
    2. text standard grade
    3. reading time
    4. complex word, its index, its frequency of usage in real word, suggestion word for replacement
    """
    return scores, complex_words