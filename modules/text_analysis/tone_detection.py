from transformers import pipeline
from random import randint

classifier = pipeline("text-classification", model="j-hartmann/emotion-english-distilroberta-base")

tone_examples = {
    "anger": [
        "This is absolutely ridiculous!",
        "You seriously did that?!",
        "Fix this mess right now!",
        "Why are you ignoring me?!",
        "You completely ruined everything!"
    ],
    "disgust": [
        "This is revolting.",
        "That behavior is disgusting.",
        "I can't stand this — change it.",
        "Being ignored like this is sickening.",
        "I feel nauseated just thinking about that mistake."
    ],
    "fear": [
        "This really worries me.",
        "I didn’t expect that and it scares me.",
        "Can someone please fix this before it's too late?",
        "Why is no one responding? I’m getting anxious.",
        "I’m afraid we’ve seriously messed up."
    ],
    "joy": [
        "Even though it's not perfect, I’m still hopeful!",
        "Whoa! That was unexpected — but cool!",
        "Let’s fix it together — we’ve got this!",
        "Maybe they’re just busy — no stress.",
        "It’s okay to make mistakes — we learn and move on!"
    ],
    "neutral": [
        "This is not ideal.",
        "That was unexpected.",
        "Please address the issue.",
        "Still waiting on a response.",
        "There was an error."
    ],
    "sadness": [
        "I'm really disappointed.",
        "I didn’t expect this from you…",
        "I wish things could be fixed.",
        "It hurts to be ignored like this.",
        "I feel terrible about what happened."
    ],
    "surprise": [
        "I can't believe this happened!",
        "Whoa — you really did that?!",
        "I didn’t expect this to go so wrong.",
        "Wait, still no reply? Seriously?",
        "Oh no — that mistake was unexpected!"
    ]
}

tone_explanations = {
    "anger": {
        "dominant": "The overall tone is predominantly angry. The language strongly suggests feelings of displeasure, frustration, or outrage.",
        "slightly": "While other tones may be present, anger is slightly dominant. There are indications of displeasure or frustration, though perhaps mixed with other emotions."
    },
    "disgust": {
        "dominant": "The overall tone is predominantly disgusted. The language strongly expresses revulsion, aversion, or strong dislike.",
        "slightly": "While other tones may be present, disgust is slightly dominant. There are indications of revulsion or strong dislike, though perhaps mixed with other feelings."
    },
    "fear": {
        "dominant": "The overall tone is predominantly fearful. The language strongly suggests worry, anxiety, or a sense of threat.",
        "slightly": "While other tones may be present, fear is slightly dominant. There are indications of worry or anxiety, though perhaps mixed with other emotions."
    },
    "joy": {
        "dominant": "The overall tone is predominantly joyful. The language strongly expresses happiness, elation, or positive feelings.",
        "slightly": "While other tones may be present, joy is slightly dominant. There are indications of happiness or positive feelings, though perhaps mixed with other emotions."
    },
    "neutral": {
        "dominant": "The overall tone is predominantly neutral. The language lacks strong emotional coloring and focuses on objective information.",
        "slightly": "While other subtle tones might be present, the overall tone leans towards neutral. There's a general lack of strong emotional expression."
    },
    "sadness": {
        "dominant": "The overall tone is predominantly sad. The language strongly conveys sorrow, disappointment, or grief.",
        "slightly": "While other tones may be present, sadness is slightly dominant. There are indications of sorrow or disappointment, though perhaps mixed with other emotions."
    },
    "surprise": {
        "dominant": "The overall tone is predominantly surprised. The language strongly indicates astonishment or unexpectedness.",
        "slightly": "While other tones may be present, surprise is slightly dominant. There are indications of astonishment or unexpectedness, though perhaps mixed with other feelings."
    },
    "undeterministic": "The overall tone of the text is undeterministic. There is no clear dominant emotion, or the emotional signals are too weak or conflicting to confidently classify the tone."
}

constant_suggestion = "Take a look at what follows – it'll show you how picking different words and usage of punctuation can change the whole feel of a sentence, even if it means the exact same thing."

def detect_tone(text: str):
    result = classifier(text)[0]
    output = {}

    if (result["score"] * 100) <= 30:
        output['tone'] = tone_explanations['undeterministic']
    elif (result["score"] * 100) > 30 and (result["score"] * 100) < 60:
        output['tone'] = tone_explanations[result['label']]['slightly']
    else:
        output['tone'] = tone_explanations[result['label']]['dominant']

    output['constant'] = constant_suggestion

    option = randint( 0, 4 )
    
    output['current_tone_example'] = {result['label']: tone_examples[result['label']][option]}
    output['other_tone_example'] = { key: value[option] for key, value in tone_examples.items() if key != result['label']}

    """review output contains:
    1. tone
    2. constant
    3. current_tone_example
    4. other_tone_example
    """

    return output