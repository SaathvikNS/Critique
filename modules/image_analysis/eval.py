from random import randint

from object_detection import object_detection
from image_quality_assessment import image_quality_assessment
from aesthetic_evaluation import aesthetic_evaluation
from emotion_and_mood_analysis import emotion_mood_analysis
from text_extraction import extract_text_from_image

for i in range(28,29):
    choice = randint(1,22)
    print(f"Image {i}")
    image_path = f"./assets/31.jpg"

    # # phase object detection
    # odresults = object_detection(image_path)
    # for detects in odresults["detections"]:
    #     print(f"> {detects}")
    # print()
    # print("Count:")
    # print(odresults["object_counts"])
    # print()
    # print("Caption:")
    # print(odresults["caption"])
    # print()
    # print("Category tag:")
    # print(odresults["category_tag"])
    # print()
    # print("Salient object")
    # print(odresults["salient_object"])

    # # phase image quality assessment
    # iqaresults = image_quality_assessment(image_path)

    # print()
    # print("Sharpness: ", iqaresults["sharpness"]) #format this like (<50: blurry, 50-150: slightly soft, 150-500: good, >500: sharp)
    # print("Brightness: ", iqaresults["brightness"]) #format this like (<100: low, 100-120: ideal but slightly dark, 120-160: ideal, 160-180: ideal but slightly brighter, 180<: too bright)
    # print("Exposure: ", iqaresults["exposure"]) #format this like 2 values ( under exposed % are too dark, over exposed % are too bright) (overall higher value number is answer if the difference is less than 3 then normal)
    # print("Contrast: ", iqaresults["contrast"]) #format this like (< 20: Low contrast, 20–50: Moderate, 50–100: High (good))
    # print("Noise: ", iqaresults["noise"]) #format this like ( If < 1.0 → Low noise = good.)
    # print("Dominant Colors: ", iqaresults["dominant_colors"]) #format this like (print colors)
    # print("Saturation: ", iqaresults["saturation"]) #format this like (< 50: Muted or flat, 50–150: Normal, 150: Oversaturated)
    # print("Dynamic Range: ", iqaresults["dynamic_range"]) #format this like (i<= 30: "Flat / Low Dynamic Range", 30 <= 100: "Low Dynamic Range", 100 <= 180"Moderate Dynamic Range", 180 = 230: "High Dynamic Range", 230<:"Very High Dynamic Range")
    # print("Loaclized Blur: ", iqaresults["localized_blur"]) #format this like (0-10: vary sharp, 11-25: mostly sharp, 26-50: moderately sharp, 51-75: blurry, 76-100: very blurry)
    # print("White Balance Deviation: ", iqaresults["white_balance_deviation"]) #format this like (0-10 is acceptable, 10+: color cast ex: b>10 then blue cast)

    # # phase aesthetic evaluation
    # aeresult = aesthetic_evaluation(image_path) #format depends on the image quality assessment response

    # print("Composition: ", aeresult["composition"]) #format like (print directly)
    # print()
    # print("Balance: ", aeresult["balance"]) #format like (print directly)
    # print()
    # print("Visual Appeal: ", aeresult["visual_appeal"]) #format like (there are four divisions, >8, >6, >4, <4 try for a bar line that creates these categoriess and show a tooltip on the quarter where the current value lies, print remark direcctly)
    # print()
    # print("Color Aesthetics: ", aeresult["color_aesthetics"]) #format like (harmany:str, warmth:str, variety:str)
    # print()
    # print("Palette Psycology: ", aeresult["palette_psycology"]) #format like (print directly)
    # print()
    # print("Leading Lines: ", aeresult["leading_lines"]) #format like (display image, print the description)
    # print()
    # print("Texture Consistency: ", aeresult["texture_consistency"]) #format like (print verdict and score in bracket)
    # print()
    # print("Negative Space Ratio: ", aeresult["negative_space_ratio"]) #format like (print verdict and score in bracket)
    # print()
    # print("Focal Point Confidence: ", aeresult["focal_point"]) #format like (print verdict and score in bracket)
    # print()

    # # phase emotion and mood analysis
    # emaresult = emotion_mood_analysis(image_path)

    # print("Color Emotion: ", emaresult["color_emotion"]) #format like (emotion - percentage)

    # phase Text extraction
    # tresult = extract_text_from_image(image_path)

    # print(tresult["extracted_text"]) #format like (emotion - percentage)
    
    print("*"*50)
