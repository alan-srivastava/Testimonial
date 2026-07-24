// api.js
// Every fetch() call to the backend goes through here.
// Keeping them in one file means if the backend URL ever changes,
// you only update it in one place (the .env file).

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";

async function handleResponse(res) {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed with status ${res.status}`);
  }
  // 204 No Content has no body to parse
  if (res.status === 204) return null;
  return res.json();
}

export function submitTestimonial(data) {
  return fetch(`${API_BASE}/api/testimonials`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(handleResponse);
}

export function getTestimonials(status) {
  const url = status
    ? `${API_BASE}/api/testimonials?status=${status}`
    : `${API_BASE}/api/testimonials`;
  return fetch(url).then(handleResponse);
}

export function updateTestimonialStatus(id, status) {
  return fetch(`${API_BASE}/api/testimonials/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  }).then(handleResponse);
}

export function deleteTestimonial(id) {
  return fetch(`${API_BASE}/api/testimonials/${id}`, {
    method: "DELETE",
  }).then(handleResponse);
}
