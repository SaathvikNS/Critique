import warnings
warnings.filterwarnings("ignore", category=FutureWarning)

from grammar_corrector import analyze_text
# from readability_score import readability_score
# from tone_detection import detect_tone
# from keyword_extraction_and_density import get_word_analysis
# from topic_detection import get_topic
# from entity_recognition import entity_recognition
# from summarization import get_summary

sample = [ 
    "their going to the park later today but I dont think its a good idea because its suppose to rain. The kids was playing outside untill it got dark, they didnt had no jackets so they feeled cold. I should of brought some snacks, but I forgeted. Also, the dog runned away again, its really being a problem lately.",
    'Last weekend me and my friends was going to the mall to buy some cloths and hangout. We leaved around noon but forgetted to check if it was open, so we drived there for no reason. When we arrived, the doors was locked and their was a sign saying “Closed for maintanence.” One of my friend said we should of checked online but none of us thought of it. After that we decides to go to the movies instead but the theater were full with people and the line was really long, so we leaved. On the way back, someone have dropped there phone in the parking lot and I picked it up to find whose it was. I tried calling a number in the contact list but nobody answer. Eventually we just gone home and played video games for a while. It wasnt the best day, but atleast we tryed to make it fun.',
    'Despite of the weather being bad, the team had went ahead with there plans for the outdoor event, which was suppose to begin at 10am sharp. Many attendees was already arriving early, some of whom wasn’t even aware that the forecast predicted heavy rains. It didn’t help neither that the venue staff were delayed due to traffic which resulted in no one being there to setup the equipments on time. The organizers, whom should have coordinated better, seemed unprepared and was making last minute calls to vendors whom didn’t arrived yet. “We should of rescheduled,” said the assistant manager who looked overwhelmed and stress. The announcements over the speakers was barely audible, and the informations being shared lacked clarity and direction. By noon, the crowd have started to grew restless. There was people standing under trees trying to stayed dry, while others was complaining about the lack of seating or refreshments. To make matters worst, one of the food trucks had broken down in route, causing even more frustation amongst the attendees. “This is not how it was suppose to be,” someone muttered while leaving the place, shaking there head in dissapointment.',
    'Yesterday I goes to the market for buying some fruits, but there wasn’t any apples so I buyed bananas instead. The shopkeeper were very rude and he don’t give me back the correct change which was upsetted me alot. I thinks he does it intentional because he looking suspicious. After that, I walks to home quickly because it were raining and I forgot to carry umbrella even though weather forecast had said it will be sunny. My brother tell me that I should’ve stayed at home but he himself go out for hang with friends.',
    "Last week me and my cousin was planning to gone for a trip, but due to the weather it get cancel. We was booked the tickets and packed everything, but when we wakes up that day, it were raining heavily and the roads was closed. My cousin he tolded me we should go anyway, but I said that would be a bad ideal. Then we staying at home doing nothing whole day which was very boring. Later my mom cooked food but forget putting salt in it, so we didn't ate much. I feeled like everything gone wrong and it wasn’t fair because we waited for this trip since many months ago.",
    'In college, students is expected to submit their assignments before the deadlines, but many of them don’t takes it serious. One of my classmate, he always copying from other peoples and say that he still learning. Last time, the professor caughted him and gived a strict warning, but he doesn’t care. He thinks education is not for everyone and just want to passed without effort. This type of attitude aren’t helping anyone. Some student even ask me to doing their work for them, which I refuses because it doesn’t feels right. Teachers tries to improve things, but rules is not following properly.',
    "I have went to the interview yesterday and I don’t think it go well. The interviewer asks me question which I wasn’t prepared for, and I doesn't know what to answered. He say they looking for someone who have experience in customer dealing, but I told I didn’t done that kind of job before. Also, I forget my resume at home so I had nothing to showing him. After the interview, I leaved immediately and didn’t said bye properly. Now I’m worrying they might thinking I’m unprofessional or not serious. Maybe I should had been more prepare and confidence.",
    "The teacher explained the topic very goodly, but some students wasn’t paying attention and kept talk with each others. He telled them to silent but they don’t listening. One of them even play games on the phone during class, which is very disrespectful. The teacher gotted angry and asked him to leaves. After that, class become quiet but the lesson already disrupted. I think students nowadays are not caring about studies. They just want pass and go to next class without learning nothing. This is not how education supposed to works. Everyone should taken learning more serious, especially in important subjects.",
    "My friend invite me to a party last night but I didn't know it was formal event. I shows up wearing casual clothes while everyone was dressing fancy. I feel embarased and wanted to leave but she insist me to stayed. The music was too loud and peoples was shouting instead of talking. Also, the food wasn't taste good and there were no enough drinks. One guy accidentally poured juice on my shoes and just says sorry like it nothing happen. I think I shouldn't have come there in first place. It was the worsted party I ever been and I hope I not going to another soon.",
    'Their going to the libary to study there lesssons, but they doesn’t has enogh time becaus the exam are tomorow',
    "The convoluted concatenation of polysyllabic lexical units, often exhibiting a marked predilection for abstract nominalizations and intricate syntactic architectures, engenders a formidable impediment to facile comprehension for individuals unaccustomed to such prolix and abstruse discursive modalities, thereby necessitating a significant cognitive expenditure for even a rudimentary grasp of the intended semantic content, which, in its very essence, frequently partakes of an obfuscatory tendency, further exacerbating the inherent difficulties in deciphering the underlying propositional framework.",
    "Yesterday, Elon Musk, the CEO of Tesla, announced a new Gigafactory in Berlin, Germany. He mentioned that the facility will primarily focus on producing the Model Y and aims to employ thousands of people in the region. The announcement was made during a press conference held at 10 AM local time and was live-streamed globally. Shares of Tesla Inc. (TSLA) saw a jump of 2.5% following the news. Saathvik N Sharma made this statement clear during his speech in Bengaluru",
    "Last week, Professor Anya Sharma from Stanford University published a groundbreaking paper in the journal Nature. The research focused on the impact of climate change on the Amazon rainforest, a vast location in South America. According to the study, deforestation rates have increased by 15% in the past year. The findings were presented at the International Climate Summit held in Paris, France, where Greta Thunberg also delivered a keynote speech.",
    "The old house stood on the hill like a forgotten sentinel, its windows dark eyes staring out at the whispering woods. A chilling breeze, a phantom's sigh, slithered through the overgrown garden, rustling the skeletal branches of the ancient oaks. The moon, a silver coin in the inky sky, cast long, dancing shadows that stretched and recoiled like frightened creatures. Inside, dust motes danced in the faint light filtering through cracks in the boarded-up windows, each a tiny ghost of memories past. Silence reigned, thick and heavy as a velvet curtain, broken only by the occasional creak of the floorboards, a mournful groan from the house's weary bones. The air hung still, pregnant with the scent of decay and the faint, sweet perfume of forgotten roses, a bittersweet oxymoron of beauty and ruin.",
    "The city was a concrete jungle, its towering skyscrapers the jagged teeth of some colossal beast gnawing at the sky. Rush hour traffic flowed like a sluggish artery, each honking car a frustrated heartbeat in the urban sprawl. Ideas sparked and collided in the crowded cafes, each conversation a tiny supernova of thought. The internet, an invisible web spun across continents, hummed with the endless chatter of billions. Opportunity knocked on every door, a persistent and often deceptive suitor. But beneath the glittering surface, a current of loneliness snaked through the crowds, each individual islanded in their own thoughts, despite the teeming masses. The city, for all its vibrant energy, often felt like a gilded cage.",
    "Grief descended upon her like a thick fog, obscuring all light and leaving her lost in a world of gray. Tears streamed down her face, a relentless river carving paths through her sorrow. Memories flickered like dying embers, casting fleeting warmth before fading into the cold reality of her loss. Her heart, a shattered vase, could no longer hold the vibrant flowers of joy. Time, a relentless thief, had stolen a precious piece of her soul. She felt as if she were walking through a dream, a slow-motion nightmare where every step was an unbearable weight. The silence in the house screamed his absence, each empty room a stark symbol of the void he had left behind.",
    "The debate raged on, a tempest in a teacup, with arguments flying back and forth like furious bees. Each side clung to their beliefs with the tenacity of a bulldog, unwilling to budge an inch. Accusations were hurled like stones, and tempers flared, turning cheeks as red as ripe cherries. The politician's promises were as hollow as a drum, resonating with empty rhetoric. He painted a rosy picture of the future, but his words lacked the genuine brushstrokes of sincerity. The truth, a slippery eel, evaded their grasp, twisting and turning in the murky waters of their conflicting narratives. It was a cacophony of voices, a verbal volley where understanding was lost in the din of disagreement, leaving everyone feeling as though they had been through a wringer.",
]

for num, i in enumerate(sample):
    print(f"Sample{num+1}: \n")

    """note: grammar punctuation and spelling"""
    grammar_correction = analyze_text(i)
    #review output contains: 1. original text, 2. Index of words that have issue
    print("Original Text:", grammar_correction["original_text"])
    print(f"\nissue_indeces:")
    print(grammar_correction["issue_indeces"])
    
    # """note: readability analysis"""
    # scores, complex_words = readability_score(i)
    # #review output contains: 1. flesch reading ease score, 2. text standard grade, 3. reading time, 4. complex word, its index, its frequency of usage in real word, suggestion word for replacement
    # print(f"\nReadability Score:")
    # for i in scores:
    #     print(f"{i} - {scores[i]}")

    # print(f"\nComplex Words:")
    # for i in complex_words:
    #     print(f"• {i}")

    # """note: tone and emotion detection"""
    # tone = detect_tone(i)
    # #review output contains: 1. tone of the text, 2. a random example of current tone, 3. example of converting current tone into other tones

    # print(tone['tone'])
    # print()
    # print(tone['constant'])
    # print()

    # current_tone_label, current_tone_example = next(iter(tone['current_tone_example'].items()))

    # print(f"Statement in {current_tone_label}: {current_tone_example}")
    # print()
    # for other_tone_label, other_tone_example in tone['other_tone_example'].items():
    #     print(f"• In {other_tone_label}: {other_tone_example}")

    # """note: keyword extraction and density analysis"""
    # word_analysis = get_word_analysis(i)
    # #review output contains: 1. word count, 2. keywords, 3. phrases, 4. syllable count, 5. Lexicon count, 6. sentence count, 7. character count, 8. average words per sentence, 9. unique words, 10. type-token ratio (ttr = unique_word_count / word_count) -> a higher score means richer vocabulary

    # print()
    # print(f'word_count: {word_analysis["word_count"]}')
    # print()
    # print(f'keywords: {word_analysis["keywords"]}')
    # print()
    # print(f'phrases: {word_analysis["phrases"]}')
    # print()
    # print(f'syllable_count: {word_analysis["syllable_count"]}')
    # print()
    # print(f'lexicon_count: {word_analysis["lexicon_count"]}')
    # print()
    # print(f'sentence_count: {word_analysis["sentence_count"]}')
    # print()
    # print(f'character_count: {word_analysis["character_count"]}')
    # print()
    # print(f'average_words_per_sentence: {word_analysis["average_words_per_sentence"]}')
    # print()
    # print(f'unique_words: {word_analysis["unique_words"]}')
    # print()
    # print(f'type_token_ratio: {word_analysis["type_token_ratio"]}')
    # print()

    # """note: topic detection"""
    # topic = get_topic(i)
    # #review output contains: 1. topics list, 2. confidence score of each topic

    # for key, value in topic.items():
    #     print(f"{key}    ->    {(value * 100):.2f} %")

    # """note: entity recognition"""
    # entities = entity_recognition(i)
    # # review output contains: 1. list of entities in text, 2. label of that entity
    # if len(entities) != 0:
    #     for entity in entities:
    #         print(f"{entity[0]} ({entity[1]})")
    # else:
    #     print(f"No entity found!")

    # """note: summarization"""
    # print(i)
    # print()
    # summary = get_summary(i)
    # #review output contains: 1. short summary of original text

    # print(summary)

    # """temp dummy"""
    # print(f"\nCorrected Text:", grammar_correction["corrected_text"])
    # print("\n\nDiff Suggestions:")
    # print(grammar_correction["diff_suggestions"])
    # print(type(grammar_correction["diff_suggestions"]))
    # print(type(grammar_correction["diff_suggestions"][1]))
    # for e in grammar_correction["diff_suggestions"]:
    #     print(e)
    # print("\nExplanations on Original Text:")
    # for e in grammar_correction["explanations"]:
    #     print(f"• {e['context']} → {e['message']} (Suggestions: {e['suggestions']})")
    print("*"*100)
