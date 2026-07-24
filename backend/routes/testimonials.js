import { Router } from "express";
import db from "../db/db.js";

const router = Router();

router.post("/", (req, res) => {
  const { name, email, company, message, rating, photo_url } = req.body;

  // Basic validation - never trust client input.
  if (!name || !email || !message || !rating) {
    return res.status(400).json({ error: "name, email, message, and rating are required" });
  }
  const ratingNum = Number(rating);
  if (!Number.isInteger(ratingNum) || ratingNum < 1 || ratingNum > 5) {
    return res.status(400).json({ error: "rating must be an integer between 1 and 5" });
  }

  const stmt = db.prepare(`
    INSERT INTO testimonials (name, email, company, message, rating, photo_url, status)
    VALUES (@name, @email, @company, @message, @rating, @photo_url, 'pending')
  `);

  const result = stmt.run({
    name,
    email,
    company: company || null,
    message,
    rating: ratingNum,
    photo_url: photo_url || null,
  });

  const created = db.prepare("SELECT * FROM testimonials WHERE id = ?").get(result.lastInsertRowid);
  res.status(201).json(created);
});

router.get("/", (req, res) => {
  const { status } = req.query;

  let rows;
  if (status) {
    rows = db.prepare("SELECT * FROM testimonials WHERE status = ? ORDER BY created_at DESC").all(status);
  } else {
    rows = db.prepare("SELECT * FROM testimonials ORDER BY created_at DESC").all();
  }

  res.json(rows);
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["pending", "approved", "rejected"].includes(status)) {
    return res.status(400).json({ error: "status must be pending, approved, or rejected" });
  }

  const existing = db.prepare("SELECT * FROM testimonials WHERE id = ?").get(id);
  if (!existing) {
    return res.status(404).json({ error: "testimonial not found" });
  }

  db.prepare("UPDATE testimonials SET status = ? WHERE id = ?").run(status, id);
  const updated = db.prepare("SELECT * FROM testimonials WHERE id = ?").get(id);
  res.json(updated);
});


router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const existing = db.prepare("SELECT * FROM testimonials WHERE id = ?").get(id);
  if (!existing) {
    return res.status(404).json({ error: "testimonial not found" });
  }
  db.prepare("DELETE FROM testimonials WHERE id = ?").run(id);
  res.status(204).send();
});

export default router;
