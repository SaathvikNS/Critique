from transformers import pipeline
from random import randint

classifier = pipeline("text-classification", model="j-hartmann/emotion-english-distilroberta-base")

tone_explanations = {
    "anger": {
        "dominant": [
            "The speaker's tone is clearly angry, marked by strong vocal intensity, sharp phrasing, or aggressive word choice.",
            ["raised voice", "frustration", "agitation", "sharp tone"]
        ],
        "slightly": [
            "There are signs of mild anger in the speaker’s voice — subtle tension, frustration, or sharpness.",
            ["slight frustration", "mild agitation", "tense voice"]
        ]
    },
    "disgust": {
        "dominant": [
            "The speaker sounds strongly disgusted, with clear vocal aversion, dismissive tone, or strong dislike in phrasing.",
            ["aversion", "dismissive tone", "displeasure"]
        ],
        "slightly": [
            "The speaker’s voice shows some signs of disgust — disapproval or aversion, but less intense.",
            ["disapproval", "subtle disgust", "hesitant tone"]
        ]
    },
    "fear": {
        "dominant": [
            "The speaker sounds fearful or anxious. The voice may tremble, or the speech may show urgency and nervousness.",
            ["trembling voice", "urgency", "hesitation", "anxiety"]
        ],
        "slightly": [
            "There are traces of fear in the speaker’s voice — slight nervousness, hesitancy, or stress.",
            ["mild anxiety", "nervous tone", "slightly rushed delivery"]
        ]
    },
    "joy": {
        "dominant": [
            "The speaker’s tone is joyful or upbeat — lively rhythm, positive intonation, or enthusiastic phrasing.",
            ["cheerful tone", "laughter", "excitement", "positive energy"]
        ],
        "slightly": [
            "The voice carries a hint of joy — calm optimism or subtle enthusiasm.",
            ["slight smile in tone", "lightheartedness", "positive attitude"]
        ]
    },
    "neutral": {
        "dominant": [
            "The speaker’s voice is neutral — steady, emotionless, and focused on delivering information without affect.",
            ["even tone", "no emotional inflection", "calm delivery"]
        ],
        "slightly": [
            "The speech is mostly neutral, though there may be traces of emotion.",
            ["flat delivery", "low affect", "subdued tone"]
        ]
    },
    "sadness": {
        "dominant": [
            "The speaker sounds sad or downcast — slow pace, low pitch, and emotional weight are evident.",
            ["low energy", "sorrowful tone", "slowed speech"]
        ],
        "slightly": [
            "There are hints of sadness — slight lowering of voice, quieter delivery, or hesitation.",
            ["soft voice", "subtle sadness", "quieter tone"]
        ]
    },
    "surprise": {
        "dominant": [
            "The speaker expresses clear surprise — sudden pitch changes, quick pacing, or exclamatory delivery.",
            ["exclamations", "abrupt changes in tone", "surprised reaction"]
        ],
        "slightly": [
            "There are subtle hints of surprise — momentary vocal shifts or unexpected phrasing.",
            ["brief astonishment", "mild vocal spike", "unexpected tone shift"]
        ]
    },
    "undeterministic": [
        "The emotional tone of the speaker is unclear or inconsistent. There are no strong indicators of any specific emotion.",
        ["uncertain", "inconsistent cues", "emotionally neutral"]
    ]
}

def detect_tone(text: str):
    result = classifier(text)[0]
    output = {}

    if (result["score"] * 100) <= 30:
        output['tone'] = tone_explanations['undeterministic']
    elif (result["score"] * 100) > 30 and (result["score"] * 100) < 60:
        output['tone'] = tone_explanations[result['label']]['slightly']
    else:
        output['tone'] = tone_explanations[result['label']]['dominant']
    
    """format of output:
    1. tone
    2. current_tone_example
    3. other_tone_example
    """

    return output