from collections.abc import AsyncGenerator

from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

app = FastAPI()


class ChatRequest(BaseModel):
    message: str


@app.post("/api/chat")
async def chat(request: ChatRequest):
    return {
        "success": True,
        "data": {
            "answer": f"python-stub-answer: {request.message}",
            "model": "fastapi-demo",
        },
    }


async def stream_chunks(message: str) -> AsyncGenerator[str, None]:
    for chunk in ["python", "stream", message]:
        yield f"data:{chunk}\n\n"


@app.post("/api/chat/stream")
async def chat_stream(request: ChatRequest):
    return StreamingResponse(stream_chunks(request.message), media_type="text/event-stream")
