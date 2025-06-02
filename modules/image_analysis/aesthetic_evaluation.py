import cv2
import numpy as np
from ultralytics import YOLO
import colorsys
from collections import Counter
from PIL import Image
from io import BytesIO
import base64
from skimage.feature import local_binary_pattern
from modules.image_analysis.image_quality_assessment import image_quality_assessment

# phase leading line detection

def detect_leading_lines(image, include_visualization=True):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    edges = cv2.Canny(gray, 50, 150, apertureSize=3)

    lines = cv2.HoughLinesP(edges, 1, np.pi/180, threshold=100, minLineLength=100, maxLineGap=10)

    if lines is None or len(lines) < 5:
        result = {
            "leading_lines_detected": 0,
            "description": "No strong leading lines detected."
        }
        if include_visualization:
            result["visualization_base64"] = None
        return result

    line_directions = []
    image_copy = image.copy()

    for line in lines:
        x1, y1, x2, y2 = line[0]
        angle = np.arctan2(y2 - y1, x2 - x1) * 180 / np.pi
        line_directions.append(angle)

        if include_visualization:
            cv2.line(image_copy, (x1, y1), (x2, y2), (0, 255, 0), 2)

    vertical = sum(1 for a in line_directions if abs(a) > 75)
    horizontal = sum(1 for a in line_directions if abs(a) < 15)
    diagonal = len(line_directions) - vertical - horizontal
    total = len(line_directions)

    msg = "Leading lines detected. "
    if vertical / total > 0.5:
        msg += "The image is dominated by vertical lines, giving a sense of strength or formality."
    elif horizontal / total > 0.5:
        msg += "The image has strong horizontal lines, evoking calm or stability."
    elif diagonal / total > 0.5:
        msg += "Diagonal leading lines dominate the composition, creating dynamic movement."
    else:
        msg += "Lines are mixed in direction, suggesting complexity or variety."

    result = {
        "leading_lines_detected": total,
        "description": msg
    }

    if include_visualization:
        image_rgb = cv2.cvtColor(image_copy, cv2.COLOR_BGR2RGB)
        pil_img = Image.fromarray(image_rgb)
        buffer = BytesIO()
        pil_img.save(buffer, format="JPEG")
        encoded_image = base64.b64encode(buffer.getvalue()).decode("utf-8")
        result["visualization_base64"] = encoded_image

    return result


# phase psycological impact
def map_color_to_emotion(rgb):
    import colorsys

    def rgb_to_hsv(rgb):
        return colorsys.rgb_to_hsv(rgb[0]/255, rgb[1]/255, rgb[2]/255)

    h, s, v = rgb_to_hsv(rgb)
    hue_deg = h * 360

    # Light/dark thresholds
    brightness = v * 100
    darkness = s < 0.2 and v < 0.3
    lightness = s < 0.2 and v > 0.8

    if darkness:
        return "elegance or sadness (dark tones)"
    if lightness:
        return "simplicity or purity (light tones)"

    if 0 <= hue_deg < 30 or hue_deg >= 330:
        return "energy or passion (red tones)"
    elif 30 <= hue_deg < 60:
        return "enthusiasm or warmth (orange tones)"
    elif 60 <= hue_deg < 90:
        return "optimism or alertness (yellow tones)"
    elif 90 <= hue_deg < 150:
        return "calmness or nature (green tones)"
    elif 150 <= hue_deg < 210:
        return "freshness or tranquility (cyan tones)"
    elif 210 <= hue_deg < 270:
        return "trust or serenity (blue tones)"
    elif 270 <= hue_deg < 330:
        return "creativity or luxury (purple tones)"
    return "neutral"

def describe_palette_psychology(features):

    emotions = [map_color_to_emotion(color) for color in features["dominant_colors"]]
    emotion_counts = Counter(emotions)
    dominant_emotion = emotion_counts.most_common(1)[0][0]
    
    return f"The color palette evokes {dominant_emotion}."

# phase color aesthetics
def rgb_to_hsv(rgb):
    return colorsys.rgb_to_hsv(rgb[0]/255, rgb[1]/255, rgb[2]/255)

def get_hue_angle(rgb):
    hsv = rgb_to_hsv(rgb)
    return hsv[0] * 360

def analyze_color_harmony(dominant_colors):
    hues = [get_hue_angle(rgb) for rgb in dominant_colors]
    hues = sorted(hues)
    diffs = [abs(hues[i] - hues[i-1]) for i in range(1, len(hues))]
    
    if all(diff < 40 for diff in diffs):
        harmony = "Analogous color scheme (harmonious)"
    elif any(abs(h - 180) < 30 for h in diffs):
        harmony = "Complementary colors (balanced contrast)"
    elif len(set(hues)) < 3:
        harmony = "Monochromatic scheme (minimalist look)"
    else:
        harmony = "Mixed palette (may feel chaotic)"
    return harmony

def detect_warm_cool_balance(dominant_colors):
    warm_count = 0
    cool_count = 0
    for rgb in dominant_colors:
        hue = get_hue_angle(rgb)
        if 0 <= hue <= 50 or 330 <= hue <= 360:
            warm_count += 1
        elif 180 <= hue <= 300:
            cool_count += 1
    if warm_count > cool_count:
        return "Warm color dominance (energetic or passionate mood)"
    elif cool_count > warm_count:
        return "Cool color dominance (calm or serene mood)"
    else:
        return "Neutral or balanced color mood"

def evaluate_color_aesthetics(features):
    dominant_colors = features["dominant_colors"]
    harmony = analyze_color_harmony(dominant_colors)
    warmth = detect_warm_cool_balance(dominant_colors)
    color_count = len(set(dominant_colors))

    if color_count < 2:
        variety = "Low color variety (might be too plain)"
    elif color_count <= 5:
        variety = "Balanced color variety"
    else:
        variety = "High color variety (can be chaotic if unstructured)"
    
    return {
        "harmony": harmony,
        "warmth": warmth,
        "variety": variety
    }

# phase composition
def evaluate_composition(objects, img_width, img_height, threshold=0.1):
    third_x = [img_width / 3, 2 * img_width / 3]
    third_y = [img_height / 3, 2 * img_height / 3]
    
    valid_objects = []

    for obj in objects:
        x1, y1, x2, y2 = obj
        cx = (x1 + x2) / 2
        cy = (y1 + y2) / 2

        near_vertical = any(abs(cx - tx) <= threshold * img_width for tx in third_x)
        near_horizontal = any(abs(cy - ty) <= threshold * img_height for ty in third_y)

        if near_vertical and near_horizontal:
            valid_objects.append((obj, (cx, cy)))

    if valid_objects:
        return f"Image aligns with Rule of Thirds ({len(valid_objects)} object(s) centered near thirds).", 1
    else:
        return "Image does NOT follow Rule of Thirds (no object centers near thirds).", 0

def detect_objects(image_path):
    model = YOLO("yolov8l.pt")

    results = model(image_path)

    objects = []

    for r in results:
        for box in r.boxes:
            cls_id = int(box.cls[0])
            label = model.names[cls_id]
            confidence = float(box.conf[0])
            xyxy = box.xyxy[0].tolist()

            objects.append([round(x,2) for x in xyxy])

    return objects

# phase balance
def get_balance(objects, img_width, img_height):
    total_weight = 0
    weighted_sum_x = 0
    weighted_sum_y = 0

    for obj in objects:
        x1, y1, x2, y2 = obj
        width = x2 - x1
        height = y2 - y1
        area = width * height

        cx = (x1 + x2) / 2
        cy = (y1 + y2) / 2

        total_weight += area
        weighted_sum_x += cx * area
        weighted_sum_y += cy * area

    if total_weight == 0:
        return "No objects detected to evaluate balance."

    centroid_x = weighted_sum_x / total_weight
    centroid_y = weighted_sum_y / total_weight

    dx = (centroid_x - img_width / 2) / img_width 
    dy = (centroid_y - img_height / 2) / img_height

    threshold = 0.25

    if abs(dx) < threshold and abs(dy) < threshold:
        return "Balanced composition. Weights in the image are perfectly spread.", 1
    
    messages = []
    if abs(dx) >= threshold:
        if dx < 0:
            messages.append("The balance is leaned towards the left side of the image.")
        else:
            messages.append("The balance is leaned towards the right side of the image.")
    if abs(dy) >= threshold:
        if dy < 0:
            messages.append("The balance is leaned towards the top of the image.")
        else:
            messages.append("The balance is leaned towards the bottom of the image.")

    return "Unbalanced composition: " + " ".join(messages), 0

# phase visual appeal
def evaluate_visual_appeal(features):
    score = 0
    weights = {
        'sharpness': 2,
        'contrast': 2,
        'brightness': 1.5,
        'saturation': 1.5,
        'composition': 2,
        'balance': 1
    }

    sharpness = min(features.get('sharpness', 0), 150)
    score += (sharpness / 500) * weights['sharpness'] * 10

    contrast = features.get('contrast', 0)
    contrast_score = 1 - abs(contrast - 70) / 70
    score += contrast_score * weights['contrast'] * 10

    brightness = features.get('brightness', 0)
    if 120 <= brightness <= 180:
        brightness_score = 1
    else:
        brightness_score = max(0, 1 - abs(brightness - 150) / 150)
    score += brightness_score * weights['brightness'] * 10

    saturation = features.get('saturation', 0)
    saturation_score = min(saturation, 100) / 100
    score += saturation_score * weights['saturation'] * 10

    score += features.get('composition_score', 0) * weights['composition'] * 10
    score += features.get('balance_score', 0) * weights['balance'] * 10

    max_score = sum(weights.values()) * 10
    normalized_score = round(score / max_score * 10, 2) 

    if normalized_score >= 8:
        remark = "Excellent visual appeal"
    elif normalized_score >= 6:
        remark = "Good visual appeal"
    elif normalized_score >= 4:
        remark = "Average visual appeal"
    else:
        remark = "Needs improvement in visual composition"

    return {
        "visual_appeal_score": float(normalized_score),
        "remark": remark
    }

# phase texture consistency
def chi_square_distance(hist1, hist2):
    return 0.5 * np.sum(((hist1 - hist2) ** 2) / (hist1 + hist2 + 1e-10))

def analyze_texture_consistency(image, rows=4, cols=4, P=8, R=1):    
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    resized = cv2.resize(gray, (256, 256))
    
    h, w = resized.shape
    block_h, block_w = h // rows, w // cols
    blocks = []
    for i in range(rows):
        for j in range(cols):
            block = resized[i*block_h:(i+1)*block_h, j*block_w:(j+1)*block_w]
            blocks.append(block)
    
    lbp_hists = []
    for block in blocks:
        lbp = local_binary_pattern(block, P, R, method="uniform")
        hist, _ = np.histogram(lbp.ravel(), bins=np.arange(0, P + 3), density=True)
        lbp_hists.append(hist)
    
    distances = []
    for i in range(len(lbp_hists)):
        for j in range(i+1, len(lbp_hists)):
            d = chi_square_distance(lbp_hists[i], lbp_hists[j])
            distances.append(d*10)
    
    avg_distance = np.mean(distances)
    
    if avg_distance < 0.1:
        verdict = "Highly consistent texture"
    elif avg_distance < 0.3:
        verdict = "Moderate texture consistency"
    else:
        verdict = "Inconsistent textures detected"
    
    return {
        'average_distance': float(round(avg_distance, 4)),
        'verdict': verdict
    }

# phase negative space ration
def calculate_negative_space_ratio(image, threshold=200):    
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    resized = cv2.resize(gray, (256, 256))

    _, binary = cv2.threshold(resized, threshold, 255, cv2.THRESH_BINARY)

    negative_pixels = np.sum(binary == 255)
    total_pixels = binary.size

    ratio = negative_pixels / total_pixels

    if ratio > 0.7:
        verdict = "Too much negative space"
    elif 0.3 < ratio <= 0.7:
        verdict = "Well-balanced negative space"
    else:
        verdict = "Too little negative space"

    return {
        "negative_space_ratio": float(round(ratio, 4)),
        "verdict": verdict
    }

# phase focal confidence
def calculate_focal_point_confidence(image):
    resized = cv2.resize(image, (256, 256))

    saliency = cv2.saliency.StaticSaliencyFineGrained_create()
    success, saliencyMap = saliency.computeSaliency(resized)

    if not success:
        raise RuntimeError("Saliency computation failed.")

    saliencyMap = (saliencyMap * 255).astype("uint8")
    _, binary_map = cv2.threshold(saliencyMap, 128, 255, cv2.THRESH_BINARY)

    focal_pixels = np.sum(binary_map == 255)
    total_pixels = binary_map.size

    confidence = (focal_pixels / total_pixels) * 3

    if confidence > 0.5:
        verdict = "Strong focal point"
    elif 0.2 < confidence <= 0.5:
        verdict = "Moderate focal clarity"
    else:
        verdict = "Weak or unclear focal point"

    return {
        "confidence_score": float(round(confidence, 4)),
        "verdict": verdict
    }


# phase main function
def aesthetic_evaluation(image_path,):
    features = image_quality_assessment(image_path)

    image = cv2.imread(image_path)
    if image is None:
        return {"error": "Image could not be read."}
    height, width = image.shape[:2]
    
    objects = detect_objects(image_path)
    composition, comp_score = evaluate_composition(objects, height, width)
    features["composition_score"] = comp_score
    balance, bal_score = get_balance(objects, height, width)
    features["balance_score"] = bal_score
    visual_appeal = evaluate_visual_appeal(features)
    color_aesthetics = evaluate_color_aesthetics(features)
    palette_psycology = describe_palette_psychology(features)
    leading_lines = detect_leading_lines(image)
    texture_consistency = analyze_texture_consistency(image)
    negative_space_ratio = calculate_negative_space_ratio(image)
    focal_point = calculate_focal_point_confidence(image)

    return {
        "composition": composition,
        "balance": balance,
        "visual_appeal": visual_appeal,
        "color_aesthetics": color_aesthetics,
        "palette_psycology": palette_psycology,
        "leading_lines": leading_lines,
        "texture_consistency": texture_consistency,
        "negative_space_ratio": negative_space_ratio,
        "focal_point": focal_point,
    }