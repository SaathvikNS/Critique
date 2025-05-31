templates = {
"Adjective Error": [
    "The adjective '{original}' doesn’t quite fit the context. '{corrected}' would describe the noun more precisely.",
    "Consider replacing '{original}' with '{corrected}' to better capture the intended description.",
    "'{original}' feels slightly off as an adjective here. '{corrected}' improves clarity.",
    "'{corrected}' works better than '{original}' in expressing the intended quality.",
    "'{original}' seems vague or inaccurate. '{corrected}' enhances the description."
],
"Adjective Form Error": [
    "'{original}' is not the correct form of the adjective for this usage. Try using '{corrected}' instead.",
    "The comparative/superlative form is misused here — '{corrected}' fits better than '{original}'.",
    "To match the sentence structure, replace '{original}' with its correct form '{corrected}'.",
    "'{original}' needs to be adjusted to its proper adjective form. '{corrected}' would be suitable.",
    "The sentence calls for a different adjective form — '{corrected}' is preferred over '{original}'."
],
"Adverb Error": [
    "'{original}' isn’t the correct adverb here. '{corrected}' conveys the action more appropriately.",
    "The use of '{original}' is awkward. '{corrected}' better modifies the verb.",
    "Try using '{corrected}' instead of '{original}' for smoother and clearer expression.",
    "'{original}' may be misused as an adverb. '{corrected}' better reflects the intended manner.",
    "The action requires a different adverb — consider '{corrected}' in place of '{original}'."
],
"Conjunction Error": [
    "The conjunction '{original}' doesn’t connect the ideas properly. '{corrected}' would make more sense here.",
    "Consider replacing '{original}' with '{corrected}' to improve sentence flow.",
    "The sentence’s logic improves by using '{corrected}' instead of '{original}'.",
    "The word '{original}' is not the best fit for linking these clauses. Try '{corrected}' instead.",
    "'{corrected}' connects the thoughts more effectively than '{original}'."
],
"Contraction Error": [
    "'{original}' is either missing or incorrectly used as a contraction. '{corrected}' is the correct form.",
    "To maintain natural phrasing, replace '{original}' with the contraction '{corrected}'.",
    "The expression sounds more fluent with '{corrected}' instead of '{original}'.",
    "Consider using '{corrected}' — it's the standard contracted form rather than '{original}'.",
    "'{original}' is awkward or grammatically incorrect here. '{corrected}' is the proper contraction."
],
"Determiner Error": [
    "The determiner '{original}' seems incorrect in this context. Consider using '{corrected}' instead.",
    "'{corrected}' fits more naturally here than the determiner '{original}'.",
    "The article or determiner '{original}' doesn’t suit the noun it precedes — try '{corrected}'.",
    "To improve clarity, replace '{original}' with the correct determiner '{corrected}'.",
    "Usage of '{corrected}' makes the noun phrase clearer and more grammatically sound than using '{original}'."
],
"Extra Word/s Omitted": [
    "'{original}' appears to be unnecessary in this context. Removing it improves clarity.",
    "'{original}' doesn’t contribute meaningfully to the sentence — consider omitting it.",
    "Omitting '{original}' results in a cleaner and more concise sentence.",
    "The sentence is more effective without '{original}'.",
    "the sentence can be read more fluently by removing '{original}'."
],
"Lexical Error": [
    "Usage of '{original}' doesn’t seem to carry the intended meaning. '{corrected}' might be more appropriate.",
    "Consider replacing '{original}' with '{corrected}' for better vocabulary usage.",
    "The term '{original}' is not the best fit here — '{corrected}' would suit the context better.",
    "The choice of using '{original}' is a bit off. '{corrected}' offers a more accurate expression.",
    "'{corrected}' aligns better with the sentence’s meaning than '{original}'."
],
"Missing Word/s Added": [
    "The sentence feels incomplete without '{corrected}'.",
    "To make the sentence grammatically complete, '{corrected}' should be added.",
    "'{corrected}' is missing in the original sentence and is needed for proper structure.",
    "'{corrected}' has been added to clarify or complete the sentence meaningfully.",
    "The addition of '{corrected}' improves the sentence's flow and grammatical integrity."
],
"Morphology": [
    "'{original}' is morphologically incorrect. '{corrected}' is the properly formed version.",
    "'{corrected}' reflects the right morphological structure compared to '{original}'.",
    "To follow proper word formation rules, '{original}' should be changed to '{corrected}'.",
    "The form of '{original}' is not valid here — '{corrected}' is the correct morphological form.",
    "Consider using '{corrected}' instead of '{original}' to fix the word structure."
],
"Noun Error": [
    "The noun '{original}' doesn’t fit well in this context — consider replacing it with '{corrected}'.",
    "'{corrected}' serves the sentence better than the noun '{original}'.",
    "'{original}' appears to be a misused noun here. '{corrected}' would be more appropriate.",
    "The noun '{original}' lacks contextual relevance. '{corrected}' is a better fit.",
    "To improve meaning and clarity, try using '{corrected}' instead of '{original}'."
],
"Noun inflection": [
    "The form of the noun '{original}' is incorrect. The inflected form '{corrected}' is more suitable.",
    "'{corrected}' reflects the correct noun inflection needed here, unlike '{original}'.",
    "The inflection of '{original}' seems off — use '{corrected}' to match the sentence structure.",
    "Replace '{original}' with its properly inflected version '{corrected}' for grammatical accuracy.",
    "The noun '{corrected}' is the right inflectional form compared to '{original}'."
],
"Noun number": [
    "'{original}' is the wrong number form here — '{corrected}' better matches the sentence's plurality.",
    "The sentence calls for the {‘plural’ if corrected.endswith(‘s’) else ‘singular’} form '{corrected}' instead of '{original}'.",
    "To match the noun number with the context, use '{corrected}' instead of '{original}'.",
    "'{corrected}' aligns better in number agreement than '{original}'.",
    "The noun number in '{original}' is incorrect — '{corrected}' works better here."
],
"Noun possessive": [
    "The possessive form '{corrected}' is needed here instead of the base noun '{original}'.",
    "To show possession, replace '{original}' with '{corrected}'.",
    "'{original}' should be changed to its possessive form '{corrected}' for clarity.",
    "The context requires a possessive noun. Use '{corrected}' rather than '{original}'.",
    "'{corrected}' clarifies ownership or relation more clearly than '{original}'."
],
"Orthographic Error": [
    "'{original}' contains a formatting or capitalization issue. It should be written as '{corrected}'.",
    "Consider changing '{original}' to '{corrected}' to correct the orthography.",
    "The word '{original}' appears to have an orthographic issue — '{corrected}' is the correct form.",
    "'{corrected}' adheres to standard writing conventions better than '{original}'.",
    "Use '{corrected}' instead of '{original}' for proper capitalization or spelling."
],
"Particle Error": [
    "The use of the particle '{original}' is off — '{corrected}' completes the phrasal verb more naturally.",
    "Consider replacing '{original}' with '{corrected}' to form a proper phrasal verb.",
    "The phrase works better with '{corrected}' instead of the particle '{original}'.",
    "The choice of particle '{original}' breaks the intended meaning. '{corrected}' is the right fit.",
    "In this expression, '{corrected}' is the correct particle, unlike '{original}'."
],
"Preposition Error": [
    "The preposition '{original}' doesn’t suit the context — '{corrected}' would be a better choice.",
    "'{corrected}' fits the sentence more naturally than the preposition '{original}'.",
    "The sentence’s meaning improves by using '{corrected}' instead of '{original}'.",
    "Consider replacing '{original}' with '{corrected}' to correct the prepositional usage.",
    "'{original}' feels out of place here — '{corrected}' offers better grammatical alignment."
],
"Pronoun Error": [
    "The pronoun '{original}' doesn’t match the context — consider using '{corrected}' instead.",
    "'{corrected}' provides the correct reference or case compared to '{original}'.",
    "To clarify the subject or object, replace '{original}' with '{corrected}'.",
    "The sentence works better with the pronoun '{corrected}' than '{original}'.",
    "'{original}' seems misused — '{corrected}' is the appropriate pronoun here."
],
"Punctuation Error": [
    "There seems to be a punctuation issue — '{original}' should be replaced with '{corrected}'.",
    "Replace '{original}' with '{corrected}' for correct punctuation usage.",
    "'{corrected}' clarifies sentence structure better than '{original}'.",
    "The punctuation mark '{original}' disrupts the flow — '{corrected}' is more appropriate.",
    "Using '{corrected}' instead of '{original}' improves readability and grammatical accuracy."
],
"Rephrased": [
    "The phrase '{original}' feels awkward — '{corrected}' is a more natural rephrasing.",
    "Consider rewording '{original}' to '{corrected}' for better clarity.",
    "'{corrected}' is a smoother, more fluent version of '{original}'.",
    "To improve expression, '{original}' has been rephrased as '{corrected}'.",
    "The sentence benefits from rewording '{original}' to '{corrected}'."
],
"Spelling Error": [
    "The word '{original}' seems to be misspelled — it should be '{corrected}'.",
    "Check the spelling of '{original}'; the correct form is '{corrected}'.",
    "It looks like '{original}' is a typo. '{corrected}' is the right spelling.",
    "The spelling of '{original}' is incorrect — '{corrected}' fixes it.",
    "'{corrected}' is the correct spelling to replace the erroneous '{original}'."
],
"Subject-verb agreement Error": [
    "The verb '{original}' does not agree with the subject — '{corrected}' aligns better grammatically.",
    "To match the subject, '{original}' should be changed to '{corrected}'.",
    "The sentence requires subject-verb agreement; replace '{original}' with '{corrected}'.",
    "The verb form '{corrected}' properly agrees with the subject, unlike '{original}'.",
    "Subject-verb mismatch: '{original}' should be corrected to '{corrected}'."
],
"Unrecognized Error": [
    "The change from '{original}' to '{corrected}' improves the sentence, though the exact issue isn’t clearly categorized.",
    "While not classified under a specific error type, replacing '{original}' with '{corrected}' enhances clarity.",
    "'{corrected}' seems to be a better fit here, though the nature of the error isn’t clearly defined.",
    "The replacement of '{original}' with '{corrected}' makes the sentence more appropriate.",
    "This edit — from '{original}' to '{corrected}' — refines the expression, though the issue type is uncertain."
],
"Verb Error": [
    "The verb '{original}' seems incorrect in this context — consider using '{corrected}' instead.",
    "'{corrected}' is a more appropriate verb choice than '{original}' here.",
    "The verb '{original}' doesn’t quite fit the sentence. '{corrected}' works better.",
    "To improve clarity, the verb '{original}' should be replaced with '{corrected}'.",
    "'{corrected}' is a stronger verb in this context compared to '{original}'."
],
"Verb form": [
    "The form of the verb '{original}' seems off — '{corrected}' is the correct form.",
    "'{corrected}' is the right verb form to use instead of '{original}'.",
    "The verb '{original}' should be in the form '{corrected}' for grammatical accuracy.",
    "'{original}' isn’t the right form of the verb; consider changing it to '{corrected}'.",
    "Use '{corrected}' instead of '{original}' to maintain correct verb form."
],
"Verb inflection": [
    "The verb '{original}' appears to have the wrong inflection — '{corrected}' fits better.",
    "'{corrected}' is the properly inflected form of the verb rather than '{original}'.",
    "The inflection used in '{original}' doesn't match the sentence needs. Try '{corrected}'.",
    "'{original}' should be inflected as '{corrected}' in this grammatical context.",
    "'{corrected}' offers the right verb inflection, unlike '{original}'."
],
"Verb tense Error": [
    "The tense of '{original}' is incorrect — '{corrected}' reflects the correct time frame.",
    "Use '{corrected}' instead of '{original}' to match the tense of the sentence.",
    "The verb '{original}' should be changed to the tense '{corrected}' to improve temporal accuracy.",
    "'{original}' is the wrong tense for this context. Try using '{corrected}'.",
    "Tense inconsistency: '{corrected}' is better than '{original}' here."
],
"Word order Error": [
    "The word order is awkward here — try placing '{corrected}' where '{original}' was.",
    "'{corrected}' sounds more natural than '{original}' in this position.",
    "Reordering the sentence to use '{corrected}' instead of '{original}' improves fluency.",
    "The current placement of '{original}' disrupts flow; use '{corrected}' for better order.",
    "Word order issue: switch '{original}' with '{corrected}' to enhance sentence clarity."
],
}             

meanings = {
    "Adjective Error": "The adjective used is incorrect or inappropriate for the context.",
    "Adjective Form Error": "The adjective form is incorrect (e.g., it should be comparative or superlative).",
    "Adverb Error": "The adverb used is incorrect or does not fit the sentence properly.",
    "Conjunction Error": "The conjunction used is incorrect or missing, affecting sentence flow or meaning.",
    "Contraction Error": "A contraction is used incorrectly or where it should be expanded.",
    "Determiner Error": "A determiner (like 'a', 'an', 'the', or possessives) is missing or used incorrectly.",
    "Extra Word/s Omitted": "One or more unnecessary words were removed to improve clarity and correctness.",
    "Lexical Error": "A word is used incorrectly, often due to vocabulary misuse or wrong word choice for the context.",
    "Missing Word/s Added": "One or more necessary words were inserted to complete the sentence grammatically or logically.",
    "Morphology": "The word form is incorrect, often due to a root or affix issue.",
    "Noun Error": "A noun is used incorrectly or is inappropriate in this context.",
    "Noun inflection": "The noun form is incorrect, such as using a mass noun where a count noun is needed.",
    "Noun number": "There is a number mismatch in the noun (singular/plural agreement is wrong).",
    "Noun possessive": "The possessive form of the noun is incorrect or missing.",
    "Orthographic Error": "There is a problem with spelling, capitalization, or spacing in the text.",
    "Particle Error": "A required particle (such as in phrasal verbs) is missing or misused.",
    "Preposition Error": "A preposition is incorrect, missing, or used awkwardly.",
    "Pronoun Error": "The pronoun is incorrect in form, case, number, or type.",
    "Punctuation Error": "There is an error in punctuation that affects the sentence structure or clarity.",
    "Rephrased": "The word order is incorrect and disrupts the sentence structure.",
    "Spelling Error": "A word is spelled incorrectly.",
    "Subject-verb agreement Error": "The verb does not agree with the subject in number or person.",
    "Unrecognized Error": "An error was found that doesn't fit into any specific category.",
    "Verb Error": "The verb used is incorrect or inappropriate for the sentence.",
    "Verb form": "The form of the verb is wrong (e.g., infinitive, gerund, or participle).",
    "Verb inflection": "The verb is not properly inflected for tense or subject.",
    "Verb tense Error": "The verb tense is incorrect for the sentence’s time or meaning.",
    "Word order Error": "The word order is incorrect and disrupts the sentence structure.",
}