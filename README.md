# Testimonial Platform

Vercel Deployed(frontend): https://testimonial-navy.vercel.app/

Render Deployed(Backend)

A small testimonial collection tool: customers submit reviews, the business owner
approves/rejects them from a dashboard, and approved ones appear on a public wall
and an embeddable widget for third-party sites.

## Stack

- **Frontend:** React (Vite) + react-router-dom
- **Backend:** Node.js + Express
- **Database:** SQLite (via better-sqlite3) — a single file, zero setup
- **Widget:** vanilla JS, framework-free, served as a static file from the backend

## How to run it locally

You need Node.js 18+ installed.

### 1. Backend

```bash
cd backend
npm install
npm run dev
```

Runs at `http://localhost:4000`. It creates `backend/db/data.sqlite` automatically
on first run — no manual database setup needed.

### 2. Frontend

In a **second terminal**:

```bash
cd frontend
npm install
npm run dev
```

Runs at `http://localhost:5173`. Open that URL in your browser.

- `/` — submission form (public)
- `/wall` — public wall of approved testimonials
- `/dashboard` — moderation dashboard (no login, per assignment spec)

### 3. Widget demo (proves the embed works on an outside site)

With the backend still running, open `widget/demo.html` directly in your browser
(or use the VS Code "Live Server" extension). It loads testimonials from
`http://localhost:4000/widget.js` exactly like a real third-party site would.

## What's done

- [x] Submission form → backend → SQLite
- [x] Moderation dashboard: pending / approved / rejected tabs, approve/reject/delete
- [x] Public wall showing only approved testimonials
- [x] Embeddable widget (`<div> + <script>`) with a working third-party demo page
- [x] Widget accent color customization via `data-accent`
- [x] Loading / empty / error states on wall, dashboard, and widget
- [x] Deployed on vercel 

## What's not done / cut

- No pagination (fine at small scale; would add cursor-based pagination if the wall grew large)
- No duplicate/spam detection beyond basic input validation
- No AI-powered feature (P2) — see JOURNAL.md for reasoning on what was prioritized instead

## Project structure

```
backend/
  server.js          # Express app entry point
  db/db.js           # SQLite connection + schema
  routes/testimonials.js  # all API endpoints
frontend/
  src/pages/          # SubmitForm, Wall, Dashboard
  src/components/     # StarRating, TestimonialCard
  src/api.js          # all fetch() calls to the backend, in one place
widget/
  widget.js           # embeddable vanilla-JS widget
  demo.html           # simulated third-party site using the widget
```

See `JOURNAL.md` for decisions made along the way and `CLAUDE.md` for how AI
tools were directed while building this.
