from printing_rag_bot.rag.pipeline import RAGPipeline

def main():
    pipeline = RAGPipeline()
    question = input("Ask a question: ")
    answer = pipeline.answer_question(question)
    print("\nAnswer:\n")
    print(answer)


if __name__ == "__main__":
    main()