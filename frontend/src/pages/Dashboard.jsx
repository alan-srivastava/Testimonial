// Dashboard.jsx
// Unprotected page: /dashboard — business owner reviews submissions here.
// No auth per the assignment spec (non-goal), so this route is just open.

import { useEffect, useState } from "react";
import TestimonialCard from "../components/TestimonialCard";
import { getTestimonials, updateTestimonialStatus, deleteTestimonial } from "../api";

const TABS = ["pending", "approved", "rejected"];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("pending");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const data = await getTestimonials(activeTab);
      setItems(data);
    } catch (err) {
      setError(err.message || "Failed to load testimonials.");
    } finally {
      setLoading(false);
    }
  }

  // Re-fetch whenever the active tab changes
  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  async function handleStatusChange(id, status) {
    // Optimistic update: remove it from the current list immediately,
    // since it no longer belongs in this tab once its status changes.
    setItems((prev) => prev.filter((t) => t.id !== id));
    try {
      await updateTestimonialStatus(id, status);
    } catch (err) {
      setError(err.message || "Failed to update status.");
      load(); // re-sync with server if it failed
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this testimonial permanently?")) return;
    setItems((prev) => prev.filter((t) => t.id !== id));
    try {
      await deleteTestimonial(id);
    } catch (err) {
      setError(err.message || "Failed to delete.");
      load();
    }
  }

  return (
    <div className="page">
      <div className="dashboard-header">
        <h1>Moderation Dashboard</h1>
        <div className="tabs">
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {error && <p className="error-text">{error}</p>}

      {loading ? (
        <p className="muted">Loading...</p>
      ) : items.length === 0 ? (
        <p className="muted">No {activeTab} testimonials.</p>
      ) : (
        <div className="grid">
          {items.map((t) => (
            <TestimonialCard key={t.id} testimonial={t}>
              <div className="card-actions">
                {activeTab !== "approved" && (
                  <button className="btn btn-approve" onClick={() => handleStatusChange(t.id, "approved")}>
                    Approve
                  </button>
                )}
                {activeTab !== "rejected" && (
                  <button className="btn btn-reject" onClick={() => handleStatusChange(t.id, "rejected")}>
                    Reject
                  </button>
                )}
                <button className="btn btn-delete" onClick={() => handleDelete(t.id)}>
                  Delete
                </button>
              </div>
            </TestimonialCard>
          ))}
        </div>
      )}
    </div>
  );
}
