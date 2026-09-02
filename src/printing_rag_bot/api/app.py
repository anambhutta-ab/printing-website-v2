#  fromproject root:  D:\Projects\Printing RAG LLM
# uvicorn src.printing_rag_bot.api.app:app --reload


from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from printing_rag_bot.rag.pipeline import RAGPipeline


app = FastAPI(title="Printing RAG API")


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    question: str


class SourceResponse(BaseModel):
    source: str
    snippet: str


class ChatResponse(BaseModel):
    answer: str
    sources: list[SourceResponse]


rag_pipeline = RAGPipeline(
    persist_directory=Path("data/vectorstore"),
    collection_name="printing_rag",
    model_name="openai/gpt-oss-20b",
)


@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest):
    question = request.question.strip()

    if not question:
        raise HTTPException(
            status_code=400,
            detail="Question cannot be empty.",
        )

    try:
        result = rag_pipeline.answer_question(question)

        return ChatResponse(
            answer=result.answer,
            sources=[
                SourceResponse(
                    source=source.source,
                    snippet=source.snippet,
                )
                for source in result.sources
            ],
        )

    except Exception as error:
        import traceback

        traceback.print_exc()

        raise HTTPException(
            status_code=500,
            detail=str(error),
        )