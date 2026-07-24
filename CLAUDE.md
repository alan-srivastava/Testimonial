# Project context for AI coding agents

This file steers Claude Code / Cursor / other agents working in this repo.

## What this is
A small testimonial platform: submission form -> moderation dashboard -> public wall
-> embeddable widget. See README.md for the full spec and what's implemented.

## Constraints agents should respect
- Frontend: React (Vite), no additional UI libraries beyond react-router-dom
- Backend: Express + better-sqlite3 (synchronous, simple, no ORM)
- No authentication anywhere — this is intentional (assignment non-goal), do not add login
- No payments, no multi-tenant support — single business, single owner only
- Keep the widget (widget/widget.js) framework-free vanilla JS — it must run on
  arbitrary third-party pages without requiring React

## Conventions
- All frontend API calls go through frontend/src/api.js — don't scatter fetch()
  calls across components
- Backend routes live in backend/routes/, mounted in server.js
- Keep components small and colocate related UI in src/components/
- Prefer readable, explicit code over clever abstractions — this is a small app,
  not a framework

## When making changes
- Run `npm run build` in frontend/ to catch compile errors before considering a
  change done
- Test API endpoints with curl or the dashboard UI, not just by reading the code
