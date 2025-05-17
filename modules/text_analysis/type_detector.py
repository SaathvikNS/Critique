#refer ADJ: Adjective error
#refer ADJ:FORM: Adjective form (e.g., comparative/superlative)
#refer ADV: Adverb error
#refer CONJ: Conjunction error
#refer CONTR: Contraction error
#refer DET: Determiner error (e.g., articles, possessives)
#refer MORPH: Morphology (same lemma, different form - often a root form issue)
#refer NOUN: Noun error (general)
#refer NOUN:INFL: Noun inflection (e.g., count/mass, pluralization)
#refer NOUN:NUM: Noun number (singular/plural agreement with context)
#refer NOUN:POSS: Noun possessive (e.g., 's, s')
#refer ORTH: Orthography (case or whitespace errors)
#refer OTHER: A general category for errors that don't fit into other types
#refer PART: Particle error (e.g., in phrasal verbs)
#refer PREP: Preposition error
#refer PRON: Pronoun error (e.g., case, number, type)
#refer PUNCT: Punctuation error
#refer SPELL: Spelling error
#refer VERB: Verb error (general)
#refer VERB:FORM: Verb form (e.g., infinitive, gerund, participle)
#refer VERB:INFL: Verb inflection (general tense/agreement issues not specific enough for other verb tags)
#refer VERB:SVA: Subject-verb agreement error
#refer VERB:TENSE: Verb tense error (including auxiliary verbs and modals related to tense)
#refer WO: Word order error

import string
import Levenshtein
from spellchecker import SpellChecker
from gramformer import Gramformer

gf = Gramformer(models=1, use_gpu=False)
spell = SpellChecker()

#todo this function
def get_definition(word):
    return f"definition of {word}"

# todo this function
def get_when_to_use(word):
    return f"when to use {word}"

# todo this function
def get_example(word):
    return f"example of {word}"

def get_outliers(original, corrected):
    outlier_edits = gf.get_edits("".join(char for char in original if char not in string.punctuation), "".join(char for char in corrected if char not in string.punctuation))
    return outlier_edits[0]

def get_other_category(original, corrected):
    no_punc_original = "".join(char for char in original if char.isalpha() or char==" ")
    no_punc_corrected = "".join(char for char in corrected if char.isalpha() or char==" ")

    dos = ["do", "did", "does", "dont", "didnt", "doesnt", "don't", "didn't", "doesn't"]

    if no_punc_original == no_punc_corrected:
        return "Punctuation Error"
    if original.lower() == "their" or corrected.lower() == "they are" or corrected.lower() == "they're":
        return "Lexical Error"
    if original == "":
        return "Missing Word/s Added"
    if corrected == "":
        return "Extra Word/s Omitted"
    if Levenshtein.distance(original, corrected) >= 5:
        return "Rephrased"
    if Levenshtein.distance(original, corrected) < 5 and len(original) < 5:
        return "Lexical Error"
    if (original.lower() == "of" and corrected.lower() == "have") or (original.lower() == "have" and corrected.lower() == "of"):
        return "Lexical Error"
    if (original.lower() == "who" and corrected.lower() == "whose") or (original.lower() == "whose" and corrected.lower() == "who"):
        return "Pronoun Case Error"
    if original.lower() in dos or corrected.lower() in dos:
        return "Lexical Error"
    if spell.correction(no_punc_original) == no_punc_corrected:
        return "Spelling Error"
    
    return None

def get_category(type, original, corrected):
    if original == "":
        return "Missing Word/s Added"
    if corrected == "":
        return "Extra Word/s Omitted"
    match type:
        case "ADJ": 
            return "Adjective Error"
        case "ADJ:FORM": 
            return "Adjective Form Error"
        case "ADV": 
            return "Adverb Error"
        case "CONJ": 
            return "Conjunction Error"
        case "CONTR": 
            return "Contraction Error"
        case "DET": 
            return "Determiner Error"
        case "MORPH": 
            return "Morphology"
        case "NOUN": 
            return "Noun Error"
        case "NOUN:INFL": 
            return "Noun inflection"
        case "NOUN:NUM": 
            return "Noun number"
        case "NOUN:POSS": 
            return "Noun possessive"
        case "ORTH": 
            return "Orthography"
        case "PART": 
            return "Particle Error"
        case "PREP": 
            return "Preposition Error"
        case "PRON": 
            return "Pronoun Error"
        case "PUNCT": 
            return "Punctuation Error"
        case "SPELL": 
            return "Spelling Error"
        case "VERB": 
            return "Verb Error"
        case "VERB:FORM": 
            return "Verb form"
        case "VERB:INFL": 
            return "Verb inflection"
        case "VERB:SVA": 
            return "Subject-verb agreement Error"
        case "VERB:TENSE": 
            return "Verb tense Error"
        case "WO": 
            return "Word order Error"
        case default:
            return None

def get_critique_statements(blocks):
    return f"generated critique using {blocks[0]}, {blocks[1]}, and {blocks[2]}"

def get_critique(edits):
    output = []

    for edit in edits:
        temp = {}
        original = {}
        corrected = {}

        original["word"] = edit[1]
        original["definition"] = get_definition(original["word"])
        original["usage"] = get_when_to_use(original["word"])
        original["example"] = get_example(original["word"])

        corrected["word"] = edit[4]
        corrected["definition"] = get_definition(corrected["word"])
        corrected["usage"] = get_when_to_use(corrected["word"])
        corrected["example"] = get_example(corrected["word"])

        temp["category"] = (get_category(edit[0], edit[1], edit[4]) if edit[0] !="OTHER" else get_other_category(edit[1], edit[4])) or get_outliers(edit[1], edit[4]) or edit[0]
        temp["critique"] = get_critique_statements((edit[0], edit[1], edit[4]))
        temp["original"] = original
        temp["corrected"] = corrected

        output.append(temp)

    return output
"""note what's done
1. Category
"""

"""format of output
{
  "category": "Grammar Rule / Category (e.g., Subject-Verb Agreement)",
  "critique": "Explanation of why the correction is needed.",
  "original": {
    "word": "was",
    "definition": "Used as the past tense of the verb 'be' with singular subjects.",
    "usage": "Used with 'I', 'he', 'she', or 'it'",
    "example": "The kid was outside."
  },
  "corrected": {
    "word": "were",
    "definition": "Used as the past tense of the verb 'be' with plural or second-person subjects.",
    "usage": "Used with 'you', 'we', or 'they'",
    "example": "The kids were outside."
  }
}
"""

"""format of tooltip
Subject-Verb Agreement
Due to subject-verb agreement, “were” would be a better word choice here.
______________________________________________________________________
Was
verb form of ‘be’
used as the past tense of the verb "be" with singular subjects (I, he, she, it) and with the first-person singular (I)
______________________________________________________________________
Were
verb form of ‘be’
used as the past tense of the verb "be" for second-person singular ("you"), first-person plural ("we"), and third-person plural ("they")
"""