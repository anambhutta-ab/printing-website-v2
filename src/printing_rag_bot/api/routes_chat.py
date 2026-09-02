from fastapi import APIRouter, HTTPException

from printing_rag_bot.api.deps import get_pipeline
from printing_rag_bot.api.schemas import ChatRequest, ChatResponse, SourceChunk

router = APIRouter(tags=["chat"])


@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest) -> ChatResponse:
    pipeline = get_pipeline()

    try:
        result = pipeline.answer_question(request.question, k=request.k)

        sources = [
            SourceChunk(source=s.source, snippet=s.snippet)
            for s in result.sources
        ]

        return ChatResponse(answer=result.answer, sources=sources)

    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))