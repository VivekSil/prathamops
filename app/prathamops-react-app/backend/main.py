from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests

app = FastAPI()

# Allow all origins, methods, and headers
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],             # ✅ allow any origin
    allow_credentials=True,
    allow_methods=["*"],             # all HTTP methods
    allow_headers=["*"],             # all headers
)
class GenerateRequest(BaseModel):
    prompt: str
    model: str = "viveksil/prathamops-en-E2B"
    stream: bool = False

class GenerateResponse(BaseModel):
    generated_text: str

OLLAMA_URL = "http://localhost:11434/api/generate"
OLLAMA_CHAT = "http://localhost:11434/api/chat"

@app.post("/generate", response_model=GenerateResponse)
def generate(req: GenerateRequest):
    payload = {
        "model": req.model,
        "prompt": req.prompt,
        "stream": req.stream
    }
    try:
        resp = requests.post(OLLAMA_URL, json=payload, timeout=300)
        resp.raise_for_status()
    except requests.RequestException as e:
        raise HTTPException(status_code=502, detail=f"Ollama error: {e}")
    data = resp.json()
    # Ollama returns 'response' or under message.content for chat
    content = data.get("response") or (data.get("message") or {}).get("content")
    if content is None:
        raise HTTPException(status_code=500, detail="Malformed Ollama reply")
    return GenerateResponse(generated_text=content)

@app.post("/chat", response_model=GenerateResponse)
def chat(req: GenerateRequest):
    payload = {
        "model": req.model,
        "messages": [
            {"role": "user", "content": req.prompt}
        ],
        "stream": False
    }
    try:
        resp = requests.post(OLLAMA_CHAT, json=payload, timeout=300)
        resp.raise_for_status()
    except requests.RequestException as e:
        raise HTTPException(status_code=502, detail=f"Ollama chat error: {e}")
    data = resp.json()
    content = (data.get("message") or {}).get("content")
    if content is None:
        raise HTTPException(status_code=500, detail="Malformed chat reply")
    return GenerateResponse(generated_text=content)

@app.get("/")
def read_root():
    return {"message": "Ollama + FastAPI server up!"}
