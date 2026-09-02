from langchain_core.documents import Document

from .vector_store import VectorStoreManager


class RetrieverService:
    def __init__(self, vector_store_manager: VectorStoreManager) -> None:
        self.vector_store_manager = vector_store_manager

    def retrieve(self, query: str, k: int = 4) -> list[Document]:
        return self.vector_store_manager.similarity_search(query, k=k)