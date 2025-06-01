import cv2
import numpy as np
from sklearn.cluster import KMeans

def sharpness(img):
    h, w = img.shape[:2]
    sharpness = float(round(cv2.Laplacian(cv2.cvtColor(img, cv2.COLOR_BGR2GRAY), cv2.CV_64F).var(), 2))
    return (sharpness / (w*h)) * 1e4

def brightness(img, hsv):
    return float(round(hsv[..., 2].mean(), 2))

def exposure(img, gray):
    under = np.sum(gray < 30) / gray.size
    over = np.sum(gray > 225) / gray.size
    return {
        "underexposed_pct": float(round(under * 100, 2)),
        "overexposed_pct": float(round(over * 100, 2))
    }

def contrast(img, gray):
    return float(round(gray.std(), 2))

def noise(img, gray):
    blurred = cv2.GaussianBlur(gray, (3, 3), 0)
    return float(round(np.abs(gray.astype(np.float32) - blurred.astype(np.float32)).mean(), 2))

def dominant_colors(img, k=5):
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img = img.reshape((-1, 3))
    kmeans = KMeans(n_clusters=k, n_init=10, random_state=0).fit(img)
    return [tuple(map(int, color)) for color in kmeans.cluster_centers_]

def saturation(img, hsv):
    return round(hsv[..., 1].mean(), 2)

def dynamic_range(img, gray):
    return int(gray.max() - gray.min())

def localized_blur(img, gray, win_size=64, threshold=100):
    h, w = gray.shape
    blurry_regions = 0
    total = 0
    for y in range(0, h, win_size):
        for x in range(0, w, win_size):
            window = gray[y:y+win_size, x:x+win_size]
            if window.size == 0:
                continue
            total += 1
            if cv2.Laplacian(window, cv2.CV_64F).var() < threshold:
                blurry_regions += 1
    return float(round((blurry_regions / total) * 100, 2))

def white_balance(img):
    avg_b, avg_g, avg_r = [img[:, :, i].mean() for i in range(3)]
    avg = (avg_b + avg_g + avg_r) / 3
    return {
        "R_deviation": float(round(abs(avg - avg_r), 2)),
        "G_deviation": float(round(abs(avg - avg_g), 2)),
        "B_deviation": float(round(abs(avg - avg_b), 2)),
    }

def image_quality_assessment(image_path):
    image = cv2.imread(image_path)
    if image is None:
        return {"error": "Image could not be read."}

    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)

    return {
        "sharpness": sharpness(image),
        "brightness": brightness(image, hsv),
        "exposure": exposure(image, gray),
        "contrast": contrast(image, gray),
        "noise": noise(image, gray),
        "dominant_colors": dominant_colors(image),
        "saturation": saturation(image, hsv),
        "dynamic_range": dynamic_range(image, gray),
        "localized_blur": localized_blur(image, gray),
        "white_balance_deviation": white_balance(image),
    }
