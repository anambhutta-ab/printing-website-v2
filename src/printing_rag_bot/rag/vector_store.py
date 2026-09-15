from pathlib import Path
from typing import Optional

from langchain_chroma import Chroma
from langchain_core.documents import Document
from langchain_google_genai import GoogleGenerativeAIEmbeddings

from printing_rag_bot.config import settings
from .index import build_text_corpus

# Standard Google AI Studio stable text embedding model
DEFAULT_EMBEDDING_MODEL = "models/gemini-embedding-001"


class VectorStoreManager:
    def __init__(
        self,
        persist_directory: str | Path = "data/vectorstore",
        collection_name: str = "printing_rag",
        embedding_model_name: str = DEFAULT_EMBEDDING_MODEL,
        embeddings: Optional[GoogleGenerativeAIEmbeddings] = None,
    ) -> None:
        self.persist_directory = str(persist_directory)
        self.collection_name = collection_name

        google_api_key = getattr(settings, "google_api_key", "").strip()
        if not google_api_key or google_api_key.lower() == "dummy":
            raise ValueError(
                "GOOGLE_API_KEY is missing, empty, or set to 'dummy'. "
                "Please set a valid Gemini API key in your .env or environment variables."
            )

        self.embeddings = embeddings or GoogleGenerativeAIEmbeddings(
            model=embedding_model_name,
            google_api_key=google_api_key,
        )
        self._vectorstore: Optional[Chroma] = None

    def build_from_documents(self, documents: list[Document]) -> Chroma:
        if not documents:
            raise ValueError("No documents provided to build vector store")

        vectorstore = Chroma.from_documents(
            documents=documents,
            embedding=self.embeddings,
            collection_name=self.collection_name,
            persist_directory=self.persist_directory,
        )
        self._vectorstore = vectorstore
        return vectorstore

    def load_existing(self) -> Chroma:
        vectorstore = Chroma(
            collection_name=self.collection_name,
            persist_directory=self.persist_directory,
            embedding_function=self.embeddings,
        )
        self._vectorstore = vectorstore
        return vectorstore

    def get_vectorstore(self) -> Chroma:
        if self._vectorstore is not None:
            return self._vectorstore
        return self.load_existing()

    def similarity_search(self, query: str, k: int = 4) -> list[Document]:
        vectorstore = self.get_vectorstore()
        return vectorstore.similarity_search(query, k=k)


def build_and_store_vectorstore(
    data_dir: str | Path,
    persist_directory: str | Path = "data/vectorstore",
    collection_name: str = "printing_rag",
) -> Chroma:
    corpus = build_text_corpus(data_dir)
    manager = VectorStoreManager(
        persist_directory=persist_directory,
        collection_name=collection_name,
    )
    return manager.build_from_documents(corpus)