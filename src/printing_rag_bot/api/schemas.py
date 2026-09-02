from pydantic import BaseModel, Field


class ChatRequest(BaseModel):
    question: str = Field(..., min_length=1)
    k: int = Field(default=4, ge=1, le=10)


class SourceChunk(BaseModel):
    source: str
    snippet: str


class ChatResponse(BaseModel):
    answer: str
    sources: list[SourceChunk] = []