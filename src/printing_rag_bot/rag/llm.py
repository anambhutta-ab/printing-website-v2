from langchain_groq import ChatGroq

from printing_rag_bot.config import settings
from printing_rag_bot.rag.prompts import build_rag_prompt


class GroqLLMService:
    def __init__(
        self,
        model_name: str = "llama-3.1-8b-instant",
        temperature: float = 0.2,
    ) -> None:
        if not settings.groq_api_key:
            raise ValueError(
                "GROQ_API_KEY is missing. Set it in your .env file or environment."
            )

        self.client = ChatGroq(
            model_name=model_name,
            temperature=temperature,
            groq_api_key=settings.groq_api_key,
        )
        self.prompt = build_rag_prompt()

    def generate_answer(self, question: str, context: str) -> str:
        messages = self.prompt.format_messages(question=question, context=context)
        response = self.client.invoke(messages)
        return response.content