from printing_rag_bot.rag.pipeline import RAGPipeline

def main():
    pipeline = RAGPipeline()
    count = pipeline.build_index("data/raw")
    print(f"Built vector store with {count} chunks")


if __name__ == "__main__":
    main()