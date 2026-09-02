from langchain_core.documents import Document
from printing_rag_bot.rag.splitters import make_text_splitter, split_documents

from langchain_core.documents import Document

from printing_rag_bot.rag.splitters import make_text_splitter, split_documents


def test_make_text_splitter_defaults():
    splitter = make_text_splitter()
    # Create a long enough text to require multiple chunks
    text = "Line\n" * 500
    doc = Document(page_content=text, metadata={})
    chunks = splitter.split_documents([doc])

    # We expect more than one chunk
    assert len(chunks) > 1

    # We expect each chunk to be non-empty and not too large
    for chunk in chunks:
        assert 0 < len(chunk.page_content) <= 1000

def test_split_documents_produces_chunks():
    text = "Line 1\n\nLine 2\n\nLine 3\n\n" * 50
    doc = Document(page_content=text, metadata={"source": "test"})
    chunks = split_documents([doc], chunk_size=200, chunk_overlap=20)

    assert len(chunks) > 1
    for chunk in chunks:
        assert "source" in chunk.metadata
        assert chunk.metadata["source"] == "test"
        assert len(chunk.page_content) > 0