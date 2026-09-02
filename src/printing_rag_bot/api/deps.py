from functools import lru_cache

from printing_rag_bot.rag.pipeline import RAGPipeline


@lru_cache
def get_pipeline() -> RAGPipeline:
    return RAGPipeline()