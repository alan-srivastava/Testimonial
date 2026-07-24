/**
 * widget.js
 * Embeddable testimonial widget.
 *
 * Usage on any third-party HTML page:
 *   <div id="testimonial-widget" data-api="http://localhost:4000" data-accent="#4f46e5"></div>
 *   <script src="http://localhost:4000/widget.js"></script>
 *
 * This is plain vanilla JS (no React) on purpose: a third-party site
 * shouldn't be forced to load your framework just to show a widget.
 */

(function () {
  const container = document.getElementById("testimonial-widget");
  if (!container) {
    console.error("[testimonial-widget] No element with id='testimonial-widget' found on page.");
    return;
  }

  const apiBase = container.dataset.api || "http://localhost:4000";
  const accent = container.dataset.accent || "#4f46e5";

  // Inject minimal scoped styles so we don't leak into or get clobbered by the host page's CSS.
  const style = document.createElement("style");
  style.textContent = `
    .tw-wrap { display: flex; gap: 16px; overflow-x: auto; padding: 8px 4px; font-family: -apple-system, sans-serif; }
    .tw-card { min-width: 240px; max-width: 280px; background: #fff; border: 1px solid #e5e7eb;
      border-radius: 12px; padding: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.06); flex-shrink: 0; }
    .tw-stars { color: ${accent}; margin-bottom: 8px; font-size: 1rem; }
    .tw-message { font-style: italic; font-size: 0.9rem; color: #1f2430; line-height: 1.4; margin: 0 0 12px; }
    .tw-name { font-weight: 600; font-size: 0.85rem; }
    .tw-company { font-size: 0.75rem; color: #6b7280; }
    .tw-loading, .tw-empty { color: #6b7280; font-size: 0.9rem; font-family: -apple-system, sans-serif; }
  `;
  document.head.appendChild(style);

  container.innerHTML = `<div class="tw-loading">Loading testimonials...</div>`;

  fetch(`${apiBase}/api/testimonials?status=approved`)
    .then((res) => {
      if (!res.ok) throw new Error("Failed to load testimonials");
      return res.json();
    })
    .then((items) => {
      if (!items.length) {
        container.innerHTML = `<div class="tw-empty">No testimonials yet.</div>`;
        return;
      }

      const cardsHtml = items
        .map(
          (t) => `
        <div class="tw-card">
          <div class="tw-stars">${"★".repeat(t.rating)}${"☆".repeat(5 - t.rating)}</div>
          <p class="tw-message">"${escapeHtml(t.message)}"</p>
          <div class="tw-name">${escapeHtml(t.name)}</div>
          ${t.company ? `<div class="tw-company">${escapeHtml(t.company)}</div>` : ""}
        </div>
      `
        )
        .join("");

      container.innerHTML = `<div class="tw-wrap">${cardsHtml}</div>`;
    })
    .catch((err) => {
      container.innerHTML = `<div class="tw-empty">Couldn't load testimonials.</div>`;
      console.error("[testimonial-widget]", err);
    });

  // Basic escaping so a testimonial containing HTML can't inject markup into the host page.
  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }
})();
