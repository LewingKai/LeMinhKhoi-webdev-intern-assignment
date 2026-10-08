# G-Scores

G-Scores is a full-stack MERN application for checking, analyzing, and reporting THPT 2024 exam scores by registration number, subject, and top Group A candidates.

## Project overview

This project includes:

- CSV import and normalization into MongoDB via a seeder script
- score lookup by registration number (SBD)
- subject-based score distribution across 4 bands: < 4, 4-6, 6-8, >= 8
- Top Group A leaderboard based on Math + Physics + Chemistry totals

## Tech stack

- Backend: Node.js, Express, Mongoose, MongoDB
- Frontend: React, Vite, Tailwind CSS, Recharts
- Language: JavaScript

## Requirements

- Node.js 20+
- npm 10+
- MongoDB Atlas or a local MongoDB instance

## Quick start

### 1) Install dependencies

```bash
npm install
npm run install:all
```

### 2) Configure environment variables

Backend:

```bash
Copy-Item backend/.env.example backend/.env
```

Example:

```env
PORT=5000
MONGO_URL=mongodb+srv://<username>:<password>@<cluster>/<database>?retryWrites=true&w=majority
CORS_ORIGIN=http://localhost:5173
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=200
```

Frontend:

```bash
Copy-Item frontend/.env.example frontend/.env
```

Example:

```env
VITE_API_BASE_URL=
```

> For local development, leave VITE_API_BASE_URL empty so Vite can proxy /api to the backend.

### 3) Seed the CSV data

```bash
npm run seed
```

Or run directly in the backend folder:

```bash
cd backend
npm run seed -- --reset
```

### 4) Run the app locally

Run backend and frontend in two separate terminals.

Terminal 1 (backend):

```bash
cd backend
npm run dev
```

Terminal 2 (frontend):

```bash
cd frontend
npm run dev
```

Default URLs after both servers are running:

- Backend: http://localhost:5000
- Frontend: http://localhost:5173

### 5) Production build

```bash
npm run build
```

## Demo links

- Frontend (Vercel): https://le-minh-khoi-g-scores.vercel.app
- Backend API (Render): https://le-minh-khoi-g-scores-backend.onrender.com
- Local demo: http://localhost:5173

## Main API endpoints

- GET /api/students/:sbd
- GET /api/reports/levels
- GET /api/reports/levels?subject=toan
- GET /api/reports/top-group-a?limit=10

## Core features

### Student lookup

- Input an 8-digit registration number
- Valid SBD returns all subject scores
- Invalid SBD returns a clear validation error

### Subject score report

- Calculates scores across four bands
- Supports subject filtering
- Shows distribution with a bar chart

### Top Group A ranking

- Sums Math + Physics + Chemistry scores
- Sorts in descending order
- Displays the top 10 by default

## Deployment (Current Production)

- Frontend is deployed on Vercel.
- Backend is deployed on Render.

### Frontend (Vercel)

1. Import repository to Vercel.
2. Set Root Directory to `frontend`.
3. Framework preset: Vite.
4. Add environment variable:
   - `VITE_API_BASE_URL=https://le-minh-khoi-g-scores-backend.onrender.com`
5. Deploy.

`frontend/vercel.json` is used for SPA rewrites to `index.html`.

### Backend (Render)

Configure environment variables on Render:

- `MONGO_URL`: MongoDB connection string
- `CORS_ORIGIN`: frontend domain(s), for example `https://le-minh-khoi-g-scores.vercel.app`
- `RATE_LIMIT_WINDOW_MS`: `900000` (optional)
- `RATE_LIMIT_MAX`: `200` (optional)

If using multiple frontend domains:

```env
CORS_ORIGIN=https://le-minh-khoi-g-scores.vercel.app,https://preview-domain.vercel.app
```

## Production Verification (2026-10-08)

Validated against:

- Frontend: https://le-minh-khoi-g-scores.vercel.app
- Backend: https://le-minh-khoi-g-scores-backend.onrender.com

Results:

- API health endpoint works: `GET /` returns status ok.
- Student lookup works:
  - Valid SBD `01000003` returns subject scores.
  - Invalid SBD format `123` returns HTTP 400.
  - Non-existing SBD `99999999` returns HTTP 404.
- Report endpoint works:
  - `GET /api/reports/levels` returns multi-subject 4-level statistics.
  - `GET /api/reports/levels?subject=toan` returns subject-filtered statistics.
- Top Group A endpoint works:
  - `GET /api/reports/top-group-a?limit=10` returns top 10 ranking.
- Frontend routes work directly on Vercel:
  - `/`, `/reports`, `/top-group-a` all accessible.
- Frontend Search flow verified:
  - Search `01000003` displays detailed score card.
  - Search `99999999` displays not-found message.

## Assignment Checklist (Based on Assignment.md)

### Must have

- [x] Convert raw CSV data into database by source-controlled code (seeder/migration style).
- [x] Feature to check score by registration number (SBD input).
- [x] Feature report with 4 score bands by subject and chart visualization.
- [x] List top 10 students of Group A (Math, Physics, Chemistry).

### Nice to have

- [x] Responsive design for desktop/mobile usage.
- [ ] Dockerized setup.
- [x] Live deployment.

## Assignment requirement mapping

- Raw CSV is converted and imported by source-controlled seeder script: backend/src/seeders/seedStudents.js
- Score lookup by registration number: GET /api/students/:sbd + Search page UI
- 4-level score report by subject with chart: GET /api/reports/levels + Report page chart
- Top 10 Group A candidates (Math, Physics, Chemistry): GET /api/reports/top-group-a?limit=10
- OOP for subject management: backend/src/services/SubjectService.js and backend/src/services/ReportService.js
- Form validation and logic tightening: backend/src/middlewares/validators.js

## Notes

- Business logic is centralized in the backend, while the frontend is focused on a responsive experience.
- MongoDB allows sparse score fields, so missing exams are stored as null values without breaking the schema.
