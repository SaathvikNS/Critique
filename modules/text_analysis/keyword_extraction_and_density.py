import re
from textstat import textstat
import spacy
from rake_nltk import Rake

nlp = spacy.load('en_core_web_sm')
r = Rake()

def get_word_frequency(text: str):
    doc = nlp(text)
    words_list = {}

    for token in doc:
        if token.is_stop or not token.is_alpha:
            continue

        word = token.text

        if word.capitalize() in words_list:
            words_list[word.capitalize()] += 1
        else:
            words_list[word.capitalize()] = 1
        
    
    return words_list

def get_word_analysis(text: str):
    output = {}

    output["word_count"] = get_word_frequency(text)
    r.extract_keywords_from_text(text)
    output["phrases"] = [phrase for phrase in r.get_ranked_phrases() if len(phrase.split()) > 1 and re.match(r'^[A-Za-z]+$', phrase)]
    output["keywords"] = {token.lemma_.capitalize() for phrase in output["phrases"] for token in nlp(phrase) if token.is_alpha and not token.is_stop}
    output["syllable_count"] = textstat.syllable_count(text)
    output["lexicon_count"] = textstat.lexicon_count(text)
    output["sentence_count"] = textstat.sentence_count(text)
    output["character_count"] = textstat.char_count(text, ignore_spaces=True)
    output["average_words_per_sentence"] = output["lexicon_count"]/output["sentence_count"]
    output["unique_words"] = set(output["word_count"])
    output["type_token_ratio"] = (len(output["unique_words"])/output["lexicon_count"]) * 100
    
    """format of output:
    1. word count
    2. keywords
    3. phrases
    4. syllable count
    5. Lexicon count
    6. sentence count
    7. character count
    8. average words per sentence
    9. unique words
    10. type-token ratio (ttr = unique_word_count / word_count) -> a higher score means richer vocabulary
    """
    return output