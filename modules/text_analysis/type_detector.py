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

def get_critique():
    output = {}
    original = {}
    corrected = {}

    original["word"] = "original word comes here"
    original["definition"] = "definition comes here"
    original["usage"] = "when to use"
    original["example"] = "short example"

    corrected["word"] = "corrected word comes here"
    corrected["definition"] = "definition comes here"
    corrected["usage"] = "when to use"
    corrected["example"] = "short example"

    output["category"] = "category comes here"
    output["critique"] = "critique comes here"
    output["original"] = original
    output["corrected"] = corrected

    return output

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