// db.js
// This file creates (or opens) a SQLite database file called data.sqlite
// and makes sure the "testimonials" table exists.
// better-sqlite3 is synchronous, which keeps the code simple for a small app like this.

import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new Database(path.join(__dirname, "data.sqlite"));

// Create the table if it doesn't already exist.
// status can be: "pending" | "approved" | "rejected"
db.exec(`
  CREATE TABLE IF NOT EXISTS testimonials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    message TEXT NOT NULL,
    rating INTEGER NOT NULL,
    photo_url TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )
`);

export default db;
