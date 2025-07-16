# PostPal AI

PostPal AI is a web app that helps you generate engaging LinkedIn posts using AI. It features a modern dark mode UI and supports OpenAI integration via a secure backend proxy.

## Features
- Generate LinkedIn posts with different tones
- Suggest hashtags, emojis, critiques, image prompts, and threads
- Modern, beautiful UI (Cursor-inspired)
- Secure backend proxy for OpenAI API key

## Project Structure
```
postpal-ai/
  backend/         # Node.js/Express backend proxy for OpenAI
    server.js
    package.json
    .env.example
  frontend/        # React frontend (with Tailwind CSS)
    App.jsx
    package.json
    tailwind.config.js
    tailwind.css
  README.md
  .gitignore
```

## Setup Instructions

### 1. Backend (Express Proxy)
1. Copy `backend/.env.example` to `backend/.env` and add your OpenAI API key.
2. Install dependencies:
   ```sh
   cd backend
   npm install
   ```
3. Start the backend server:
   ```sh
   npm start
   ```
   The backend will run on `http://localhost:3001` by default.

### 2. Frontend (React + Tailwind)
1. Install dependencies:
   ```sh
   cd frontend
   npm install
   ```
2. Start the frontend dev server:
   ```sh
   npm run dev
   ```
   The frontend will run on `http://localhost:5173` (Vite default).

3. (Optional) If running both locally, set up a proxy in `frontend/package.json`:
   ```json
   "proxy": "http://localhost:3001"
   ```

### 3. Security Note
- **Never expose your OpenAI API key in frontend code.**
- Always use the backend proxy for API requests.
- Do not commit your `.env` file to version control.

---

Enjoy using PostPal AI! 