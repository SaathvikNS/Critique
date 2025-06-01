from ultralytics import YOLO
from PIL import Image
from transformers import BlipProcessor, BlipForConditionalGeneration
from collections import defaultdict
from modules.image_analysis.assets.COCOMapping import COCO_SUPERCATEGORIES
# from assets.COCOMapping import COCO_SUPERCATEGORIES

processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")

suggestion = []

# phase generate caption
def generate_caption(image_path: str):
    image = Image.open(image_path).convert("RGB")
    inputs = processor(image, return_tensors="pt")
    out = model.generate(**inputs)
    caption = processor.decode(out[0], skip_special_tokens=True)

    return caption

# phase detect object and object count
def detect_objects(image_path):
    model = YOLO("yolov8l.pt")

    results = model(image_path)

    detections = []
    object_counts = {}

    for r in results:
        for box in r.boxes:
            cls_id = int(box.cls[0])
            label = model.names[cls_id]
            confidence = float(box.conf[0])
            xyxy = box.xyxy[0].tolist()

            detections.append({
                "label": label,
                "confidence": round(confidence, 3),
                "box": [round(x,2) for x in xyxy]
            })

            object_counts[label] = object_counts.get(label, 0) + 1

    return detections, object_counts

# phase get category tag
def get_supercategory_counts(detected_objects, mapping):
    supercat_counts = defaultdict(int)
    for obj in detected_objects:
        label = obj["label"]
        supercat = mapping.get(label, "uncategorized")
        supercat_counts[supercat] += 1
    return sorted(supercat_counts.items(), key=lambda x: x[1], reverse=True)

# phase get salient object
def get_salient_object(detections):
    max_area = 0
    salient_label = "unknown"

    for obj in detections:
        x1, y1, x2, y2 = obj["box"]
        area = (x2 - x1) * (y2 - y1)
        if area > max_area:
            max_area = area
            salient_label = obj["label"]
    
    return salient_label

def object_detection(image_path):

    detections, objects_count = detect_objects(image_path)
    caption = generate_caption(image_path)
    category_tag = get_supercategory_counts(detections, COCO_SUPERCATEGORIES)
    salient_object = get_salient_object(detections)

    return {
        "detections": detections,
        "object_counts": objects_count,
        "caption": caption,
        "category_tag": category_tag,
        "salient_object": salient_object,
    }