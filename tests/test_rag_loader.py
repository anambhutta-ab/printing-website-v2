from pathlib import Path

from printing_rag_bot.rag.loaders import load_text_files_from_directory


def test_loader_uses_only_the_printing_knowledge_base(tmp_path: Path):
    (tmp_path / "printing_consultant_knowledgebase.txt").write_text(
        "approved source", encoding="utf-8"
    )
    (tmp_path / "FAQ.txt").write_text("legacy source", encoding="utf-8")
    (tmp_path / "extra.txt").write_text("unapproved source", encoding="utf-8")

    documents = load_text_files_from_directory(tmp_path)

    assert len(documents) == 1
    assert documents[0].page_content == "approved source"
    assert documents[0].metadata["file_name"] == (
        "printing_consultant_knowledgebase.txt"
    )