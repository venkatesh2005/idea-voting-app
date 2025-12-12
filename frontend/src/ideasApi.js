const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

export const fetchIdeas = async () => {
  const res = await fetch(`${API_BASE}/ideas`);
  if (!res.ok) throw new Error("Failed to fetch ideas");
  return res.json();
};

export const createIdea = async (payload) => {
  const res = await fetch(`${API_BASE}/ideas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Failed to create idea");
  }
  return res.json();
};

export const upvoteIdea = async (id, voter) => {
  const res = await fetch(`${API_BASE}/ideas/${id}/upvote`, { 
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ voter })
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Failed to upvote idea");
  }
  return res.json();
};

export const deleteIdea = async (id, owner) => {
  const res = await fetch(`${API_BASE}/ideas/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ owner })
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Failed to delete idea");
  }
  return res.json();
};
