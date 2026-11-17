# BILLORA

> **Track Smart. Spend Better.**

Billora is a professional fintech web application designed for personal subscription and auto-debit management. It empowers individuals and teams to keep complete control over recurring charges, monitor upcoming payment renewals, analyze expenses, and project annual subscription expenditures.

---

## 🚀 Tech Stack

### Frontend
- **Framework:** [React.js](https://react.dev/) (v18+) with [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Tooling:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Client Integration:** [@supabase/supabase-js](https://supabase.com/docs/reference/javascript/introduction)

### Backend
- **Framework:** [FastAPI](https://fastapi.tiangolo.com/) (Python 3.10+)
- **ASGI Server:** [Uvicorn](https://www.uvicorn.org/)
- **Validation & Settings:** [Pydantic v2](https://docs.pydantic.dev/) & [pydantic-settings](https://docs.pydantic.dev/latest/concepts/pydantic_settings/)
- **SDK:** [supabase-py](https://github.com/supabase-community/supabase-py)

### Database
- **Provider:** [Supabase](https://supabase.com/) (Managed PostgreSQL)

---

## 📁 Repository Structure

```text
Billora/
├── .env.example              # Centralized environment reference
├── .gitignore                # Root gitignore rules
├── README.md                 # Project documentation & setup instructions
│
├── frontend/                 # React + TypeScript + Vite + Tailwind CSS
│   ├── .env.example          # Frontend-specific environment variables
│   ├── .gitignore            # Frontend-specific gitignore
│   ├── index.html            # HTML entry point with Billora branding
│   ├── package.json          # Frontend dependencies & scripts
│   ├── postcss.config.js     # PostCSS configuration
│   ├── tailwind.config.js    # Tailwind CSS design system tokens
│   ├── tsconfig.json         # TypeScript compiler configuration
│   ├── tsconfig.node.json    # TypeScript config for Vite tooling
│   ├── vite.config.ts        # Vite configuration & path aliases
│   └── src/
│       ├── App.tsx           # Setup confirmation view
│       ├── main.tsx          # React application root
│       ├── index.css         # Tailwind base styles
│       ├── vite-env.d.ts     # Vite environment type declarations
│       ├── components/       # Reusable UI components
│       ├── hooks/            # Custom React hooks
│       ├── pages/            # View pages and route containers
│       ├── services/         # API and Supabase client services
│       ├── types/            # TypeScript interfaces & types
│       └── utils/            # Helper functions & formatters
│
└── backend/                  # FastAPI + Python
    ├── .env.example          # Backend-specific environment variables
    ├── .gitignore            # Backend-specific gitignore
    ├── requirements.txt      # Python dependencies
    └── app/
        ├── __init__.py       # Package marker
        ├── main.py           # FastAPI entrypoint, middleware, routers
        ├── api/
        │   ├── __init__.py
        │   └── v1/
        │       ├── __init__.py
        │       ├── api.py    # Main v1 router aggregator
        │       └── endpoints/
        │           ├── __init__.py
        │           └── health.py # Health check endpoint
        ├── core/
        │   ├── __init__.py
        │   ├── config.py     # Pydantic BaseSettings environment loader
        │   └── database.py   # Supabase client singleton
        ├── models/           # Domain/Database entity models
        ├── schemas/          # Pydantic input/output validation schemas
        └── services/         # Business logic layer
```

---

## 🛠️ Setup & Installation

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** / **yarn** / **pnpm**
- **Python**: v3.10 or higher
- **Supabase Account**: An active Supabase PostgreSQL project

---

### 2. Backend Setup (FastAPI)

1. Open your terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate a Python virtual environment:
   - **Windows:**
     ```powershell
     python -m venv .venv
     .venv\Scripts\Activate.ps1
     ```
   - **macOS / Linux:**
     ```bash
     python3 -m venv .venv
     source .venv/bin/activate
     ```

3. Install required Python dependencies:
   ```bash
   pip install --upgrade pip
   pip install -r requirements.txt
   ```

4. Configure environment variables:
   ```bash
   cp .env.example .env
   ```
   Update `.env` with your Supabase credentials:
   - `SUPABASE_URL`: Your Supabase Project URL (`https://<project-ref>.supabase.co`)
   - `SUPABASE_KEY`: Supabase anon public key or service role key
   - `DATABASE_URL`: Supabase PostgreSQL direct/pooler connection string

5. Run the FastAPI development server:
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```
   - API Root: `http://localhost:8000/`
   - Interactive Swagger API Documentation: `http://localhost:8000/docs`
   - Redoc Documentation: `http://localhost:8000/redoc`
   - Healthcheck: `http://localhost:8000/api/v1/health`

---

### 3. Frontend Setup (React + Vite + Tailwind CSS)

1. Open another terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env
   ```
   Ensure `VITE_API_URL` and `VITE_SUPABASE_URL` match your backend and Supabase configurations.

4. Start the Vite development server:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

---

## 🔒 Security & Best Practices
- **No Banking Mocks:** Financial data handling and subscription entries follow clean database schemas and user-defined inputs without fragile or mock scraping scripts.
- **Environment Isolation:** Secrets (`.env`) are excluded from version control via `.gitignore`.
- **CORS Protection:** FastAPI is configured to allow requests only from authorized frontend origins.
- **Type Safety:** Full TypeScript on the frontend and Pydantic v2 schemas on the backend ensure consistency between clients and servers.

---

## 📌 Development Roadmap
- [x] Initial project scaffolding & directory architecture
- [ ] Database schema definition (users, subscriptions, categories, billing schedules, payment methods)
- [ ] Supabase Authentication & Row-Level Security (RLS) policies
- [ ] Subscription CRUD endpoints & spending calculation engine
- [ ] Upcoming renewal alerts & notification dispatchers
- [ ] Frontend dashboard, metric cards & renewal calendar
