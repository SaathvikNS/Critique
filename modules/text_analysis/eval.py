import warnings
warnings.filterwarnings("ignore", category=FutureWarning)

from grammar_corrector import analyze_text

sample = [ 
    "i was goin to the market yesterday but it was rainning so hard i decide to stay home instead my freind told me that he went their and buyed alot of fruits, apples oranges and bananas he also seen some new shop openning near the bus stop its look really nice maybe we can go their tomorrow if your free.",
    "their going to the park later today but I dont think its a good idea because its suppose to rain. The kids was playing outside untill it got dark, they didnt had no jackets so they feeled cold. I should of brought some snacks, but I forgeted. Also, the dog runned away again, its really being a problem lately.",
    'Last weekend me and my friends was going to the mall to buy some cloths and hangout. We leaved around noon but forgetted to check if it was open, so we drived there for no reason. When we arrived, the doors was locked and their was a sign saying “Closed for maintanence.” One of my friend said we should of checked online but none of us thought of it. After that we decides to go to the movies instead but the theater were full with people and the line was really long, so we leaved. On the way back, someone have dropped there phone in the parking lot and I picked it up to find whose it was. I tried calling a number in the contact list but nobody answer. Eventually we just gone home and played video games for a while. It wasnt the best day, but atleast we tryed to make it fun.',
    'Despite of the weather being bad, the team had went ahead with there plans for the outdoor event, which was suppose to begin at 10am sharp. Many attendees was already arriving early, some of whom wasn’t even aware that the forecast predicted heavy rains. It didn’t help neither that the venue staff were delayed due to traffic which resulted in no one being there to setup the equipments on time. The organizers, whom should have coordinated better, seemed unprepared and was making last minute calls to vendors whom didn’t arrived yet. “We should of rescheduled,” said the assistant manager who looked overwhelmed and stress. The announcements over the speakers was barely audible, and the informations being shared lacked clarity and direction. By noon, the crowd have started to grew restless. There was people standing under trees trying to stayed dry, while others was complaining about the lack of seating or refreshments. To make matters worst, one of the food trucks had broken down in route, causing even more frustation amongst the attendees. “This is not how it was suppose to be,” someone muttered while leaving the place, shaking there head in dissapointment.',
]

for num, i in enumerate(sample):
    result = analyze_text(i)
    print(f"Sample{num+1}: \n")
    print("Original Text:", result["original_text"])
    print(f"\nCorrected Text:", result["corrected_text"])
    print("\n\nDiff Suggestions:", result["diff_suggestions"])
    print("\nExplanations on Original Text:")
    for e in result["original_explanations"]:
        print(f"• {e['context']} → {e['message']} (Suggestions: {e['suggestions']})")
    print("************************************************************************************")
