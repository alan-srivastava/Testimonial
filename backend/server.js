// server.js
// Entry point for the backend. Run with: npm run dev (from the backend folder)

import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import testimonialsRouter from "./routes/testimonials.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors()); // allows the React app (different port) and the widget demo page to call this API
app.use(express.json()); // parses JSON request bodies into req.body

// Serve widget.js so any third-party site can load it with:
// <script src="http://localhost:4000/widget.js"></script>
app.use(express.static(path.join(__dirname, "..", "widget")));

// Health check - useful to confirm the server is alive
app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

// All testimonial routes live under /api/testimonials
app.use("/api/testimonials", testimonialsRouter);

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
