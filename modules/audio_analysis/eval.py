
from random import randint

# from transcription import transcribe_audio
# from modules.text_analysis.summarization import get_summary
from clarity_score import compute_clarity_score
from musical_elements import analyze_musical_elements

for i in range(1,2):
    choice = randint(1,10)

    print(f"Sample: {choice}")

    # phase transcription
    # tresult = transcribe_audio(f"./assets/AudioAssets/{1}.mp3")

    # print("Transcription Phase: ")
    # print(tresult["transcript"])
    # print()
    # print(tresult["language"])
    # print()
    # print(tresult["duration_seconds"])
    # print()
    # print(tresult["average_confidence_percent"])
    # print()
    # print(tresult["source_type"])
        
    # phase summarization
    # sresult = get_summary("Wake up to reality! Nothing ever goes as planned in this accursed world. The longer you live, the more you realize that the only things that truly exist in this reality are merely pain. suffering and futility. Listen, everywhere you look in this world, wherever there is light, there will always be shadows to be found as well. As long as there is a concept of victors, the vanquished will also exist. The selfish intent of wanting to preserve peace, initiates war. and hatred is born in order to protect love. There are nexuses causal relationships that cannot be separated I want to sever the fate of this world. A world of only Victors. A world of only peace. A world of only love. I will create such a world. I am… the ghost of the uchiha. For truly this reality… is a hell.")
    # print(sresult)

    # # phase Clarity Score
    clarity_result = compute_clarity_score(f"./assets/AudioAssets/{1}.mp3", "Wake up to reality. Nothing ever goes as planned in this accursed world.")

    print(clarity_result)

# phase musical elements
    result = analyze_musical_elements(f"./assets/AudioAssets/{1}.mp3")

    print(result)

    print("*"*50)