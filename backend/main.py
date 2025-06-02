from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routes import text
from backend.routes import image
from backend.routes import audio

app = FastAPI()

# origins = [
#     "http://localhost"
#     "http://localhost:5173",
# ]

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials = True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(text.router, prefix="/api/text", tags=["Text Analysis"])
app.include_router(image.router, prefix="/api/image", tags=["Image Analysis"])
app.include_router(audio.router, prefix="/api/audio", tags=["Audio Analysis"])