1. Prioritization

Started with P0 in order: DB schema first, then the API routes, then server.js to wire it together, tested each endpoint with curl before writing any frontend code against it. Only after the backend was confirmed working did I move to connecting it to the frontend and testing the full submit → approve → wall flow.
After P0 was solid, moved to P1: built the embeddable widget (widget.js) and the demo.html page proving it works on a page outside the app.
Deployed after P0+P1 were both verified working locally — backend to Render, frontend to Vercel — so I'd have a live link to submit even if I ran out of time for the P2 stretch feature.

What I cut pagination, duplicate detection, the P2 AI feature.

2. Key decisions
Decision: SQLite via better-sqlite3 for the database. Options considered: Postgres/Supabase, MongoDB Atlas. Why: zero external setup, single file, simple synchronous API, fine for a single-business app with no concurrent write load at this scale
Decision: Rejected testimonials stay in the DB with status = "rejected" instead of being deleted outright. Options: hard-delete immediately on reject. Why: Keeps a record so the dashboard can show a "Rejected" tab and the owner can reconsider. Added a separate explicit Delete action for actually purging spam/junk.

3. Working with AI agents
Tools and models used: Claude (Claude Sonnet 5) for the entire React frontend (pages, components, routing, CSS) and for help while writing widget.js. The database schema, API routes, server.js, and demo.html were written by me directly, without AI assistance.
How I split the work: I treated the backend as my own responsibility since it's the core logic (schema, validation, status transitions) I wanted full control over and to be able to defend every line of. I used Claude for the frontend because it's more repetitive/boilerplate-heavy (forms, routing, styling) and for widget.js specifically because what part I needed help with the DOM-injection approach.
Your agent setup: Kept CLAUDE.md in the repo root documenting constraints for anyone (including future-me with an agent) extending this: no auth, no extra frontend libraries beyond react-router-dom, keep widget.js framework-free vanilla JS, all frontend API calls must go through src/api.js rather than being scattered across components.
My most important prompts: I'm building a testimonial platform for a take-home assignment. Need a React frontend with 3 pages: a public submission form (name, email, company, message, star rating, optional photo URL), a moderation dashboard with pending/approved/rejected tabs and approve/reject/delete buttons, and a public wall showing only approved ones. Backend is Express + SQLite, I'll handle that myself just need the frontend talking to /api/testimonials endpoints.

4.Something you rejected: Claude has given me "AI SaaS template" I stripped it back to flat colors and simpler borders, and swapped the font stack to system fonts instead of importing Google Fonts.

5. Verification
Backend: tested every endpoint directly with curl before writing frontend code against it POST a testimonial, GET all, GET filtered by status, PATCH status, DELETE and confirmed the SQLite file persisted data across server restarts.
Frontend: ran npm run build to catch compile errors, then manually walked the full flow in the browser submit a testimonial, see it pending in the dashboard, approve it, confirm it appears on the wall, confirm a rejected testimonial never shows on the wall.
Widget: opened demo.html via Live Server with the backend running locally, confirmed testimonials rendered correctly on a page completely outside the React app, then re-tested the same after deploying (pointed the widget's data-api at the live Render URL instead of localhost).

6. Deploy: confirmed the live Vercel frontend correctly talks to the live Render backend (not localhost) end-to-end after deploying both.

7.Edge cases I specifically tested on the backend — Rejected request by admin will not be hard delete it will stay in db if needs to approve in future.

8. If I had 5 more hours
I likely duplicate/spam detection, pagination(returns limited requests), the P2 AI sentiment-tagging feature, Include the authentication part for security it's more important and authorization for roles.
