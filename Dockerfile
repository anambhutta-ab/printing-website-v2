FROM python:3.11-slim

WORKDIR /app

# System deps
RUN apt-get update && apt-get install -y --no-install-recommends git \
    && rm -rf /var/lib/apt/lists/*

# Dependencies
COPY requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Code
COPY src /app/src
COPY data /app/data

# Port (SnapDeploy will override PORT at runtime)
ENV PORT=8000
EXPOSE 8000

# Start FastAPI
# CMD ["uvicorn", "src.printing_rag_bot.api.app:app", "--host", "0.0.0.0", "--port", "8000"]
CMD ["python", "-m", "uvicorn", "src.printing_rag_bot.api.app:app", "--host", "0.0.0.0", "--port", "8000"]
