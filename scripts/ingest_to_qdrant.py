"""Ingest uploaded PDF and text files into Qdrant Cloud.

Run from the repository root after setting QDRANT_URL and QDRANT_API_KEY.
The default embedding provider matches the existing chatbot collection:
    python scripts/ingest_to_qdrant.py

To use Sentence Transformers instead, set:
    EMBEDDING_PROVIDER=sentence-transformers
    SENTENCE_TRANSFORMER_MODEL=all-MiniLM-L6-v2
"""

from __future__ import annotations

import os
import sys
import uuid
from pathlib import Path
from typing import Any, Protocol

from dotenv import load_dotenv
from langchain_core.documents import Document
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from pypdf import PdfReader
from qdrant_client import QdrantClient
from qdrant_client.http import models

try:
    from sentence_transformers import SentenceTransformer
except ImportError:  # Optional unless EMBEDDING_PROVIDER is sentence-transformers.
    SentenceTransformer = None


UPLOADS_DIR = Path("data/raw/")
COLLECTION_NAME = "printing_rag"
BATCH_SIZE = 100
CHUNK_SIZE = 500
CHUNK_OVERLAP = 50
DEFAULT_GOOGLE_EMBEDDING_MODEL = "gemini-embedding-001"
DEFAULT_SENTENCE_TRANSFORMER_MODEL = "all-MiniLM-L6-v2"


class EmbeddingProvider(Protocol):
    def embed_documents(self, texts: list[str]) -> list[list[float]]: ...


class SentenceTransformerEmbeddings:
    def __init__(self, model_name: str) -> None:
        if SentenceTransformer is None:
            raise RuntimeError(
                "sentence-transformers is required for EMBEDDING_PROVIDER="
                "sentence-transformers. Install it with: pip install sentence-transformers"
            )
        self.model = SentenceTransformer(model_name)

    def embed_documents(self, texts: list[str]) -> list[list[float]]:
        vectors = self.model.encode(texts, normalize_embeddings=True)
        return vectors.tolist()


def required_environment_variable(name: str) -> str:
    value = os.getenv(name, "").strip()
    if not value:
        raise RuntimeError(f"Missing required environment variable: {name}")
    return value


def load_documents() -> list[Document]:
    if not UPLOADS_DIR.exists():
        raise FileNotFoundError(f"Upload directory does not exist: {UPLOADS_DIR}")

    documents: list[Document] = []
    for path in sorted(UPLOADS_DIR.rglob("*")):
        if not path.is_file():
            continue

        suffix = path.suffix.lower()
        if suffix == ".txt":
            text = path.read_text(encoding="utf-8")
        elif suffix == ".pdf":
            reader = PdfReader(str(path))
            text = "\n".join(page.extract_text() or "" for page in reader.pages)
        else:
            continue

        if text.strip():
            documents.append(
                Document(
                    page_content=text,
                    metadata={"source": str(path), "file_name": path.name},
                )
            )

    return documents


def create_embeddings() -> EmbeddingProvider:
    provider = os.getenv("EMBEDDING_PROVIDER", "google").strip().lower()
    if provider == "sentence-transformers":
        model_name = os.getenv(
            "SENTENCE_TRANSFORMER_MODEL", DEFAULT_SENTENCE_TRANSFORMER_MODEL
        )
        print(f"Using Sentence Transformers model '{model_name}'...")
        return SentenceTransformerEmbeddings(model_name)

    if provider != "google":
        raise ValueError(
            "EMBEDDING_PROVIDER must be 'google' or 'sentence-transformers'."
        )

    google_api_key = required_environment_variable("GOOGLE_API_KEY")
    model_name = os.getenv(
        "GOOGLE_EMBEDDING_MODEL", DEFAULT_GOOGLE_EMBEDDING_MODEL
    )
    print(f"Using Google embedding model '{model_name}'...")
    return GoogleGenerativeAIEmbeddings(
        model=model_name,
        google_api_key=google_api_key,
        task_type="retrieval_document",
        output_dimensionality=768,
    )


def split_documents(documents: list[Document]) -> list[Document]:
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=CHUNK_SIZE,
        chunk_overlap=CHUNK_OVERLAP,
    )
    return splitter.split_documents(documents)


def ensure_collection(client: QdrantClient, vector_size: int) -> None:
    if client.collection_exists(COLLECTION_NAME):
        collection = client.get_collection(COLLECTION_NAME)
        vectors_config = collection.config.params.vectors
        if not isinstance(vectors_config, models.VectorParams):
            raise RuntimeError(
                f"Collection '{COLLECTION_NAME}' uses named vectors; "
                "the ingestion script expects a single unnamed vector."
            )
        if vectors_config.size != vector_size:
            raise RuntimeError(
                f"Embedding dimension mismatch: embeddings={vector_size}, "
                f"Qdrant collection={vectors_config.size}."
            )
        return

    client.create_collection(
        collection_name=COLLECTION_NAME,
        vectors_config=models.VectorParams(
            size=vector_size,
            distance=models.Distance.COSINE,
        ),
    )


def upload_chunks(
    client: QdrantClient,
    chunks: list[Document],
    embeddings: EmbeddingProvider,
) -> int:
    total = len(chunks)
    processed = 0

    for start in range(0, total, BATCH_SIZE):
        batch = chunks[start : start + BATCH_SIZE]
        vectors = embeddings.embed_documents([chunk.page_content for chunk in batch])
        if len(vectors) != len(batch):
            raise RuntimeError("Embedding provider returned an unexpected vector count.")

        points = [
            models.PointStruct(
                id=str(uuid.uuid5(uuid.NAMESPACE_URL, f"upload:{index}:{chunk.metadata.get('source', '')}")),
                vector=vector,
                payload={
                    "page_content": chunk.page_content,
                    "metadata": dict(chunk.metadata),
                },
            )
            for index, (chunk, vector) in enumerate(zip(batch, vectors), start=start)
        ]
        client.upsert(collection_name=COLLECTION_NAME, points=points)
        processed += len(batch)
        print(f"Processed {processed}/{total} chunks...")

    return processed


def ingest() -> int:
    load_dotenv()
    documents = load_documents()
    if not documents:
        print(f"No .pdf or .txt files found in {UPLOADS_DIR}.")
        return 0

    chunks = split_documents(documents)
    print(f"Loaded {len(documents)} documents and split them into {len(chunks)} chunks.")

    embeddings = create_embeddings()
    first_vector = embeddings.embed_documents([chunks[0].page_content])[0]
    client = QdrantClient(
        url=required_environment_variable("QDRANT_URL"),
        api_key=required_environment_variable("QDRANT_API_KEY"),
        prefer_grpc=True,
    )
    ensure_collection(client, len(first_vector))

    processed = upload_chunks(client, chunks, embeddings)
    print(f"✅ Ingested {processed} chunks to Qdrant collection '{COLLECTION_NAME}'")
    return processed


def main() -> int:
    try:
        ingest()
    except Exception as error:
        print(f"Ingestion failed: {error}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
