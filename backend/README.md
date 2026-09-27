# Talent Forge Module 1 Backend

This backend currently implements the AI profile-analysis flow only. PostgreSQL is intentionally not included yet.

## Setup

1. Create a virtual environment:
   `python -m venv .venv`
2. Activate it.
3. Install dependencies:
   `pip install -r requirements.txt`
4. Copy `.env.example` values into `.env` and add your real `OPENAI_API_KEY`.
5. From the `backend` folder run:
   `uvicorn app.main:app --reload`

The API runs at `http://localhost:8000`.

## Current endpoints

- `GET /health`
- `POST /api/v1/ai/profile-analysis`
- FastAPI docs: `http://localhost:8000/docs`

## Frontend

Serve the project frontend with a local HTTP server rather than opening HTML files directly. For example, from the project root:

`python -m http.server 5500`

Then open `http://localhost:5500`.
