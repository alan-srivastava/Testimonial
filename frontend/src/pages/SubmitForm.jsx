// SubmitForm.jsx
// Public page: /  — customers land here to leave a testimonial.

import { useState } from "react";
import StarRating from "../components/StarRating";
import { submitTestimonial } from "../api";

const initialForm = {
  name: "",
  email: "",
  company: "",
  message: "",
  rating: 0,
  photo_url: "",
};

export default function SubmitForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState("");

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (form.rating === 0) {
      setErrorMsg("Please choose a star rating.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMsg("");

    try {
      await submitTestimonial(form);
      setStatus("success");
      setForm(initialForm);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="page centered">
        <div className="success-box">
          <h2>Thank you! 🎉</h2>
          <p>Your testimonial was submitted and is awaiting review.</p>
          <button className="btn" onClick={() => setStatus("idle")}>
            Submit another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page centered">
      <form className="form-card" onSubmit={handleSubmit}>
        <h1>Share your experience</h1>
        <p className="subtitle">We'd love to hear what you think.</p>

        <label>
          Name *
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
          />
        </label>

        <label>
          Email *
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
          />
        </label>

        <label>
          Company
          <input
            type="text"
            value={form.company}
            onChange={(e) => updateField("company", e.target.value)}
          />
        </label>

        <label>
          Photo URL (optional)
          <input
            type="url"
            placeholder="https://..."
            value={form.photo_url}
            onChange={(e) => updateField("photo_url", e.target.value)}
          />
        </label>

        <label>
          Your testimonial *
          <textarea
            required
            rows={4}
            value={form.message}
            onChange={(e) => updateField("message", e.target.value)}
          />
        </label>

        <label>
          Rating *
          <StarRating value={form.rating} onChange={(r) => updateField("rating", r)} />
        </label>

        {status === "error" && <p className="error-text">{errorMsg}</p>}

        <button className="btn btn-primary" type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Submitting..." : "Submit testimonial"}
        </button>
      </form>
    </div>
  );
}
