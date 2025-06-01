import cv2
from PIL import Image
import pytesseract

def extract_text_from_image(image_path):
    image = cv2.imread(image_path)
    if image is None:
        return {"error": "Image could not be read."}
    
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    
    pil_image = Image.fromarray(image_rgb)
    
    text = pytesseract.image_to_string(pil_image).strip()
    
    return {"extracted_text": text if text else None}
