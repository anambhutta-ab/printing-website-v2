"""Inspect collections in the local Chroma vector store."""

from __future__ import annotations

import sys
from pathlib import Path

try:
    import chromadb
except ImportError as error:  
    raise SystemExit(
        "ChromaDB is required. Install it with: pip install chromadb"
    ) from error


CHROMA_PATH = Path("data/vectorstore")
SAMPLE_SIZE = 3


def collection_name(collection: object) -> str:
    """Support Chroma versions returning names or collection objects."""
    return collection if isinstance(collection, str) else collection.name


def inspect_chroma() -> int:
    if not CHROMA_PATH.exists():
        print(f"Chroma path does not exist: {CHROMA_PATH}", file=sys.stderr)
        return 1

    try:
        client = chromadb.PersistentClient(path=str(CHROMA_PATH))
        collections = client.list_collections()
    except Exception as error:
        print(f"Could not open Chroma at {CHROMA_PATH}: {error}", file=sys.stderr)
        return 1

    if not collections:
        print(f"No collections found in {CHROMA_PATH}.")
        return 0

    print(f"Found {len(collections)} collection(s) in {CHROMA_PATH}:\n")
    for collection_entry in collections:
        name = collection_name(collection_entry)
        try:
            collection = client.get_collection(name=name)
            count = collection.count()
            sample = collection.get(limit=SAMPLE_SIZE, include=[]).get("ids", [])
        except Exception as error:
            print(f"Collection: {name}")
            print(f"  Error: {error}\n")
            continue

        print(f"Collection: {name}")
        print(f"  Number of vectors: {count}")
        print(f"  Sample IDs: {sample[:SAMPLE_SIZE]}\n")

    return 0


if __name__ == "__main__":
    raise SystemExit(inspect_chroma())
