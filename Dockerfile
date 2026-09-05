FROM python:3.11-slim

WORKDIR /app

# System deps
RUN apt-get update && apt-get install -y --no-install-recommends git \
    && rm -rf /var/lib/apt/lists/*

# Force use of requirements.txt only
COPY requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Code
COPY src /app/src
COPY data /app/data

<<<<<<< Updated upstream
ENV PYTHONPATH=/app
=======
# Port
>>>>>>> Stashed changes
ENV PORT=8000
EXPOSE 8000

CMD ["python", "-m", "uvicorn", "src.printing_rag_bot.api.app:app", "--host", "0.0.0.0", "--port", "8000"]
