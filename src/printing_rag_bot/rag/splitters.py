from typing import List

from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.documents import Document

def make_text_splitter(
    chunk_size: int = 800,
    chunk_overlap: int = 120,
) -> RecursiveCharacterTextSplitter:
    """
    Factory for a standard text splitter.

    Uses recursive character splitting with sensible defaults for FAQs,
    policy docs, and other prose-like content.
    """
    return RecursiveCharacterTextSplitter(
        chunk_size=chunk_size,
        chunk_overlap=chunk_overlap,
        separators=["\n\n", "\n", " ", ""],
    )


def split_documents(
    docs: List[Document],
    chunk_size: int = 800,
    chunk_overlap: int = 120,
) -> List[Document]:
    """
    Split LangChain Document objects into smaller chunks.

    Keeps metadata attached to each chunk so later retrieval can
    reference source files/pages.
    """
    splitter = make_text_splitter(chunk_size=chunk_size, chunk_overlap=chunk_overlap)
    return splitter.split_documents(docs)