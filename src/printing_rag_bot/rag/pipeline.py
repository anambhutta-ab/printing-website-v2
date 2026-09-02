from dataclasses import dataclass
from pathlib import Path

from langchain_core.documents import Document

from printing_rag_bot.rag.index import build_text_corpus
from printing_rag_bot.rag.llm import GroqLLMService
from printing_rag_bot.rag.vector_store import VectorStoreManager


@dataclass
class RetrievedSource:
    source: str
    snippet: str


@dataclass
class RAGResult:
    answer: str
    sources: list[RetrievedSource]


class RAGPipeline:
    def __init__(
        self,
        persist_directory: str | Path = "data/vectorstore",
        collection_name: str = "printing_rag",
        model_name: str = "openai/gpt-oss-20b",
    ) -> None:
        self.vector_store_manager = VectorStoreManager(
            persist_directory=persist_directory,
            collection_name=collection_name,
        )
        self.llm_service = GroqLLMService(model_name=model_name)

    def build_index(self, data_dir: str | Path) -> int:
        docs = build_text_corpus(data_dir)
        self.vector_store_manager.build_from_documents(docs)
        return len(docs)

    def retrieve(self, question: str, k: int = 4) -> list[Document]:
        return self.vector_store_manager.similarity_search(question, k=k)

    def answer_question(self, question: str, k: int = 4) -> RAGResult:
        docs = self.retrieve(question, k=k)

        if not docs:
            return RAGResult(
                answer="I couldn't find relevant information in the knowledge base.",
                sources=[],
            )

        context = "\n\n".join(
            f"[Source: {doc.metadata.get('source', 'unknown')}]\n{doc.page_content}"
            for doc in docs
        )

        answer = self.llm_service.generate_answer(
            question=question,
            context=context,
        )

        sources = [
            RetrievedSource(
                source=doc.metadata.get("source", "unknown"),
                snippet=doc.page_content[:300],
            )
            for doc in docs
        ]

        return RAGResult(answer=answer, sources=sources)