from pathlib import Path
from typing import List

from langchain_core.documents import Document

from .loaders import load_text_files_from_directory
from .splitters import split_documents


def build_text_corpus(
    data_dir: str | Path,
    chunk_size: int = 800,
    chunk_overlap: int = 120,
) -> List[Document]:
    """
    Load raw text documents and split them into chunks.

    This does not yet persist to a vector store; it prepares
    the chunks that a later step will embed and index.
    """
    docs = load_text_files_from_directory(data_dir)
    if not docs:
        # It can be useful to warn/log here later, but for now just return []
        return []

    return split_documents(
        docs,
        chunk_size=chunk_size,
        chunk_overlap=chunk_overlap,
    )

# This helps you inspect how chunking works on your actual content.
''' 
from printing_rag_bot.rag.index import build_text_corpus

chunks = build_text_corpus("data/raw")
print(len(chunks))
if chunks:
    print(chunks[0].page_content[:100])
    print(chunks[0].metadata)
    '''