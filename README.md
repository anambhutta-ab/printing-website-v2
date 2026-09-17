# Printing RAG Assistant

A demo AI-powered printing consultation assistant that answers questions about printing products, materials, finishes, and pricing using Retrieval-Augmented Generation (RAG). The assistant retrieves relevant information from a knowledge base and generates accurate, cited responses in a chat interface.

## Overview

This project demonstrates a full-stack RAG application for a printing business. It combines:

- A React + Vite + Tailwind CSS frontend with a responsive, branded chatbot UI.
- A FastAPI backend that serves a RAG pipeline using LangChain, Qdrant, and Groq.
- A chat interface that shows answers, sources, and example questions.

The assistant is designed as a portfolio/demo project. All business details, inventory, and contact information are placeholders.

## Features

- **RAG-based Q&A**: Answers questions using a vector database of printing product information.
- **Cited responses**: Each answer includes expandable source cards with document references.
- **Example questions**: Predefined questions help users explore the assistant's capabilities.
- **Responsive UI**: Works on mobile, tablet, and desktop.
- **Branded design**: Uses a consistent color palette and typography.
- **Local development**: Runs entirely on your machine with no external services required.

## Tech Stack

### Frontend

- React 19
- Vite
- Tailwind CSS
- `react-markdown` for rendering formatted answers
- `lucide-react` for icons

### Backend

- Python 3.11+
- FastAPI
- Uvicorn
- LangChain
- Qdrant
- Groq (LLM provider)
- `python-dotenv` for environment variables

## Architecture

```text
printing-rag-assistant/
├─ src/
│  └─ printing_rag_bot/
│     ├─ api/
│     │  └─ app.py          # FastAPI RAG endpoints
│     ├─ data/
│     │  └─ ...             # Knowledge base documents
│     └─ rag/
│        ├─ vector_store.py   # Qdrant vector store
│        ├─ ingest.py        # Document ingestion script
│        └─ rag_chain.py     # LangChain RAG chain
├─ printing-rag-frontend/
│  ├─ public/
│  ├─ src/
│  │  ├─ components/
│  │  │  ├─ Chatbot.jsx
│  │  │  ├─ Header.jsx
│  │  │  └─ ...
│  │  ├─ App.jsx
│  │  └─ main.jsx
│  ├─ index.html
│  └─ ...
├─ .env.example              # Root environment template
├─ .gitignore
└─ README.md
```

## Local Setup

### Prerequisites

- Node.js 18+ and npm
- Python 3.11+
- A Groq API key

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/printing-rag-assistant.git
cd printing-rag-assistant
```

### 2. Backend setup

```bash
python -m venv .venv
# Windows
.venv\Scripts\activate
# macOS/Linux
source .venv/bin/activate

pip install -r requirements.txt
```

Create a `.env` file in the project root:

```env
GROQ_API_KEY=your_groq_api_key_here
```

Ingest your knowledge base:

```bash
set PYTHONPATH=src
python scripts/build_vectorstore.py
```

Run the backend:

```bash
uvicorn printing_rag_bot.api.app:app
```

The backend uses Qdrant Cloud. Set `QDRANT_URL` and `QDRANT_API_KEY` in the
deployment environment before starting the API. Build the collection once
against Qdrant Cloud before serving queries.

To migrate an existing local Chroma collection to Qdrant Cloud, run:

```bash
pip install chromadb
python migrate_chroma_to_qdrant.py
```

ChromaDB is only required for this one-time local migration and is intentionally
excluded from the production deployment dependencies.

The API will be available at:

```text
http://127.0.0.1:8000
```

### 3. Frontend setup

```bash
cd printing-rag-frontend
npm install
```

Create a `.env` file in `printing-rag-frontend/`:

```env
VITE_API_URL=http://127.0.0.1:8000
```

Run the development server:

```bash
npm run dev
```

Or build and preview the production version:

```bash
npm run build
npm run preview
```

## Environment Variables

### Root `.env`

| Variable | Description |
|---|---|
| `GROQ_API_KEY` | Your Groq API key for the LLM |
| `GOOGLE_API_KEY` | Google API key used for document and query embeddings |
| `QDRANT_URL` | Qdrant Cloud cluster URL |
| `QDRANT_API_KEY` | Qdrant Cloud API key |

### Frontend `.env`

| Variable | Description |
|---|---|
| `VITE_API_URL` | Base URL of the FastAPI backend |

## Usage

1. Start the backend and frontend as described above.
2. Open the frontend URL in your browser.
3. Click the chatbot icon in the bottom-right corner.
4. Ask a question or click an example question.
5. View the answer and expand sources to see references.

## Future Improvements

- Add authentication and user sessions.
- Integrate with a real printing inventory or CMS.
- Support file uploads for custom quotes.
- Add analytics and conversation logging.
- Deploy to a cloud platform (e.g., Vercel + Render).

## License

MIT License. This is a demo project for educational and portfolio purposes.