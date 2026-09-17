"""Migrate a local Chroma collection to Qdrant Cloud.

Run from the repository root after setting QDRANT_URL and QDRANT_API_KEY:
    python migrate_chroma_to_qdrant.py
"""

from __future__ import annotations

import os
import sys
import uuid
from pathlib import Path
from typing import Any

from dotenv import load_dotenv
from qdrant_client import QdrantClient
from qdrant_client.http import models

try:
    import chromadb
except ImportError as error: 
    raise SystemExit(
        "ChromaDB is required for this migration. Install it with: pip install chromadb"
    ) from error


CHROMA_PATH = Path("data/vectorstore")
CHROMA_COLLECTION = "printing_rag"
QDRANT_COLLECTION = "printing_rag"
BATCH_SIZE = 100


def get_required_environment_variable(name: str) -> str:
    value = os.getenv(name, "").strip()
    if not value:
        raise RuntimeError(f"Missing required environment variable: {name}")
    return value


def make_qdrant_id(chroma_id: str) -> str:
    """Convert any Chroma ID into a stable Qdrant-compatible UUID."""
    return str(uuid.uuid5(uuid.NAMESPACE_URL, f"chroma:{chroma_id}"))


def load_chroma_data() -> dict[str, Any]:
    print(f"Loading Chroma collection '{CHROMA_COLLECTION}' from {CHROMA_PATH}...")
    chroma_client = chromadb.PersistentClient(path=str(CHROMA_PATH))
    chroma_collection = chroma_client.get_collection(name=CHROMA_COLLECTION)
    return chroma_collection.get(
        include=["embeddings", "documents", "metadatas"]
    )


def validate_chroma_data(chroma_data: dict[str, Any]) -> tuple[list, list, list, list]:
    ids = chroma_data.get("ids") or []
    embeddings = chroma_data.get("embeddings")
    documents = chroma_data.get("documents")
    metadatas = chroma_data.get("metadatas")
    embeddings = [] if embeddings is None else embeddings
    documents = [] if documents is None else documents
    metadatas = [] if metadatas is None else metadatas

    if not ids:
        return [], [], [], []

    if not embeddings or len(ids) != len(embeddings):
        raise RuntimeError("Chroma returned incomplete or mismatched vector data.")

    if len(documents) != len(ids) or len(metadatas) != len(ids):
        raise RuntimeError("Chroma returned incomplete document or metadata data.")

    return ids, embeddings, documents, metadatas


def connect_to_qdrant() -> QdrantClient:
    print("Connecting to Qdrant Cloud...")
    return QdrantClient(
        url=get_required_environment_variable("QDRANT_URL"),
        api_key=get_required_environment_variable("QDRANT_API_KEY"),
        prefer_grpc=True,
    )


def ensure_qdrant_collection(
    qdrant_client: QdrantClient,
    vector_size: int,
) -> None:
    if qdrant_client.collection_exists(QDRANT_COLLECTION):
        collection_info = qdrant_client.get_collection(QDRANT_COLLECTION)
        vectors_config = collection_info.config.params.vectors
        if isinstance(vectors_config, models.VectorParams):
            existing_size = vectors_config.size
        else:
            raise RuntimeError(
                f"Qdrant collection '{QDRANT_COLLECTION}' uses named vectors; "
                "refusing to migrate into an incompatible collection."
            )
        if existing_size != vector_size:
            raise RuntimeError(
                f"Vector dimension mismatch: Chroma={vector_size}, "
                f"Qdrant={existing_size}."
            )
        print(f"Using existing Qdrant collection '{QDRANT_COLLECTION}'.")
        return

    qdrant_client.create_collection(
        collection_name=QDRANT_COLLECTION,
        vectors_config=models.VectorParams(
            size=vector_size,
            distance=models.Distance.COSINE,
        ),
    )
    print(
        f"Created Qdrant collection '{QDRANT_COLLECTION}' "
        f"with vector size {vector_size}."
    )


def upload_vectors(
    qdrant_client: QdrantClient,
    ids: list,
    embeddings: list,
    documents: list,
    metadatas: list,
) -> int:

    migrated = 0
    for start in range(0, len(ids), BATCH_SIZE):
        end = min(start + BATCH_SIZE, len(ids))
        points = [
            models.PointStruct(
                id=make_qdrant_id(str(chroma_id)),
                vector=list(embedding),
                payload={
                    "page_content": documents[index] or "",
                    "metadata": metadatas[index] or {},
                },
            )
            for index, (chroma_id, embedding) in enumerate(
                zip(ids[start:end], embeddings[start:end]), start=start
            )
        ]
        qdrant_client.upsert(collection_name=QDRANT_COLLECTION, points=points)
        migrated += len(points)
        print(f"Migrated {migrated}/{len(ids)} vectors...")

    return migrated


def migrate() -> int:
    load_dotenv()
    if not CHROMA_PATH.exists():
        raise FileNotFoundError(f"Local Chroma path does not exist: {CHROMA_PATH}")

    chroma_data = load_chroma_data()
    ids, embeddings, documents, metadatas = validate_chroma_data(chroma_data)
    if not ids:
        print("No vectors found in the Chroma collection.")
        return 0

    print(f"Found {len(ids)} vectors.")
    qdrant_client = connect_to_qdrant()
    vector_size = len(embeddings[0])
    if vector_size == 0:
        raise RuntimeError("The Chroma collection contains an empty embedding.")

    ensure_qdrant_collection(qdrant_client, vector_size)
    migrated = upload_vectors(
        qdrant_client,
        ids,
        embeddings,
        documents,
        metadatas,
    )
    print(
        f"Migration complete: {migrated} vectors migrated to "
        f"Qdrant collection '{QDRANT_COLLECTION}'."
    )
    return migrated


def main() -> int:
    try:
        migrate()
    except Exception as error:
        print(f"Migration failed: {error}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
