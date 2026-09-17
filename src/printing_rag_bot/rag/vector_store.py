import os
from typing import Optional

from dotenv import load_dotenv
from langchain_core.documents import Document
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_qdrant import QdrantVectorStore
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams

from printing_rag_bot.config import settings
from .index import build_text_corpus

# Standard Google AI Studio stable text embedding model
DEFAULT_EMBEDDING_MODEL = "gemini-embedding-001"

load_dotenv()

class VectorStoreManager:
    def __init__(
        self,
        collection_name: str = "printing_rag",
        embedding_model_name: str = DEFAULT_EMBEDDING_MODEL,
        embeddings: Optional[GoogleGenerativeAIEmbeddings] = None,
    ) -> None:
        self.collection_name = collection_name

        qdrant_url = os.getenv("QDRANT_URL", "").strip()
        qdrant_api_key = os.getenv("QDRANT_API_KEY", "").strip()
        if not qdrant_url or not qdrant_api_key:
            raise ValueError(
                "QDRANT_URL and QDRANT_API_KEY must be set for Qdrant Cloud."
            )

        self.client = QdrantClient(
            url=qdrant_url,
            api_key=qdrant_api_key,
            prefer_grpc=True,
        )

        if embeddings is None:
            google_api_key = getattr(settings, "google_api_key", "").strip()
            if not google_api_key or google_api_key.lower() == "dummy":
                raise ValueError(
                    "GOOGLE_API_KEY is missing, empty, or set to 'dummy'. "
                    "Please set a valid Gemini API key in your .env or environment variables."
                )

            embeddings = GoogleGenerativeAIEmbeddings(
                model=embedding_model_name,
                google_api_key=google_api_key,
                task_type="retrieval_document",
                output_dimensionality=768,
            )

        self.embeddings = embeddings
        self._vectorstore: Optional[QdrantVectorStore] = None

    def build_from_documents(self, documents: list[Document]) -> QdrantVectorStore:
        if not documents:
            raise ValueError("No documents provided to build vector store")

        if self.client.collection_exists(self.collection_name):
            self.client.delete_collection(self.collection_name)

        embedding_size = len(self.embeddings.embed_documents(["dummy_text"])[0])
        self.client.create_collection(
            collection_name=self.collection_name,
            vectors_config=VectorParams(
                size=embedding_size,
                distance=Distance.COSINE,
            ),
        )

        vectorstore = QdrantVectorStore(
            client=self.client,
            collection_name=self.collection_name,
            embedding=self.embeddings,
        )
        vectorstore.add_documents(documents)
        self._vectorstore = vectorstore
        return vectorstore

    def load_existing(self) -> QdrantVectorStore:
        vectorstore = QdrantVectorStore(
            client=self.client,
            collection_name=self.collection_name,
            embedding=self.embeddings,
        )
        self._vectorstore = vectorstore
        return vectorstore

    def get_vectorstore(self) -> QdrantVectorStore:
        if self._vectorstore is not None:
            return self._vectorstore
        return self.load_existing()

    def similarity_search(self, query: str, k: int = 4) -> list[Document]:
        vectorstore = self.get_vectorstore()
        return vectorstore.similarity_search(query, k=k)


def build_and_store_vectorstore(
    data_dir: str,
    collection_name: str = "printing_rag",
) -> QdrantVectorStore:
    corpus = build_text_corpus(data_dir)
    manager = VectorStoreManager(
        collection_name=collection_name,
    )
    return manager.build_from_documents(corpus)