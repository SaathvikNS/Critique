import cv2
from sklearn.cluster import KMeans
from collections import defaultdict


# phase color emotion detection
def map_hue_to_emotion(hue):
    if hue < 10 or hue > 160:
        return "anger/passion"
    elif hue < 25:
        return "excitement/energy"
    elif hue < 35:
        return "happiness"
    elif hue < 85:
        return "calm/freshness"
    elif hue < 135:
        return "sadness/peace"
    elif hue < 160:
        return "creativity/mystery"
    else:
        return "unknown"

def analyze_color_emotion(image, num_clusters=5):
    img = cv2.resize(image, (100, 100))
    hsv_img = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    pixels = hsv_img.reshape((-1, 3))

    kmeans = KMeans(n_clusters=num_clusters, random_state=42, n_init='auto')
    kmeans.fit(pixels)
    cluster_centers = kmeans.cluster_centers_
    labels = kmeans.labels_

    emotion_counts = defaultdict(int)
    for label in labels:
        hue = cluster_centers[label][0]
        emotion = map_hue_to_emotion(hue)
        emotion_counts[emotion] += 1

    total = len(labels)
    emotion_percentages = {emotion: round(count / total * 100, 2) for emotion, count in emotion_counts.items()}

    return emotion_percentages

def emotion_mood_analysis(image_path):
    image = cv2.imread(image_path)
    if image is None:
        return {"error": "Image could not be read."}
    
    color_emotion = analyze_color_emotion(image)
    
    return {
        "color_emotion": color_emotion,
    }