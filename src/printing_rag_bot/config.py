from dotenv import load_dotenv
from pydantic_settings import BaseSettings

load_dotenv()

class Settings(BaseSettings):
    groq_api_key: str
    google_api_key: str  

    class Config:
        env_file = ".env"
        extra = "ignore"


settings = Settings()