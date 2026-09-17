import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "src"
if str(SRC) not in sys.path:
    sys.path.insert(0, str(SRC))

from langchain_core.documents import Document
from printing_rag_bot.config import settings
from printing_rag_bot.rag.vector_store import VectorStoreManager

def run_test():
    print(f"Loaded Google API Key prefix: {settings.google_api_key[:6]}...")
    
    # 1. Initialize Vector Store Manager
    try:
        manager = VectorStoreManager(
            collection_name="test_collection"
        )
        print("✓ VectorStoreManager initialized successfully.")
    except Exception as e:
        print(f"✗ Failed to initialize VectorStoreManager: {e}")
        return

    # 2. Test single text embedding
    try:
        vector = manager.embeddings.embed_query("Testing RAG vector embedding connection.")
        print(f"✓ Single query embedding successful!")
        print(f"  Vector dimension length: {len(vector)}")
        print(f"  First 3 float values: {vector[:3]}")
    except Exception as e:
        print(f"✗ Embed query failed: {e}")
        return

    # 3. Test document ingestion & Qdrant vector store build
    try:
        dummy_docs = [
            Document(page_content="Printing machines use ink rollers.", metadata={"id": 1}),
            Document(page_content="RAG pipelines index text for semantic similarity search.", metadata={"id": 2}),
        ]
        vectorstore = manager.build_from_documents(dummy_docs)
        print("✓ Qdrant vector store created and saved successfully.")

        # 4. Test similarity search
        results = manager.similarity_search("How do printing machines work?", k=1)
        print(f"✓ Similarity search succeeded!")
        print(f"  Most relevant document: '{results[0].page_content}'")

    except Exception as e:
        print(f"✗ Qdrant indexing/search failed: {e}")

if __name__ == "__main__":
    run_test()