from pathlib import Path
from typing import List

from langchain_core.documents import Document


def load_text_files_from_directory(
    directory: str | Path,
    encoding: str = "utf-8",
) -> List[Document]:
    """
    Load all .txt files from a directory into LangChain Document objects.

    The file path is stored in metadata["source"].
    Raises FileNotFoundError if directory does not exist.
    """
    base_path = Path(directory)
    if not base_path.exists():
        raise FileNotFoundError(f"Directory not found: {base_path}")

    if not base_path.is_dir():
        raise NotADirectoryError(f"Not a directory: {base_path}")

    docs: List[Document] = []

    for path in base_path.rglob("*.txt"):
        if not path.is_file():
            continue

        text = path.read_text(encoding=encoding)
        if not text.strip():
            # Skip empty files to avoid useless chunks
            continue

        docs.append(
            Document(
                page_content=text,
                metadata={
                    "source": str(path),
                    "file_name": path.name,
                },
            )
        )

    return docs