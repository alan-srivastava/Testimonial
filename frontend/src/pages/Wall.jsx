// Wall.jsx
// Public page: /wall — shows only approved testimonials.

import { useEffect, useState } from "react";
import TestimonialCard from "../components/TestimonialCard";
import { getTestimonials } from "../api";

export default function Wall() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getTestimonials("approved")
      .then(setItems)
      .catch((err) => setError(err.message || "Failed to load testimonials."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page">
      <div className="wall-header">
        <h1>What our customers say</h1>
        <p className="subtitle">Real feedback from real people.</p>
      </div>

      {loading ? (
        <p className="muted">Loading testimonials...</p>
      ) : error ? (
        <p className="error-text">{error}</p>
      ) : items.length === 0 ? (
        <p className="muted">No testimonials yet. Be the first to share yours!</p>
      ) : (
        <div className="grid">
          {items.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>
      )}
    </div>
  );
}
