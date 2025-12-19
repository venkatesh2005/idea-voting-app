import React, { useEffect, useState } from "react";
import { fetchIdeas, createIdea, upvoteIdea, deleteIdea } from "./ideasApi";
import IdeaForm from "./components/IdeaForm";
import IdeaList from "./components/IdeaList";
import "./App.css";

export default function App() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState("");

  const loadIdeas = async () => {
    setLoading(true);
    try {
      const data = await fetchIdeas();
      setIdeas(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadIdeas(); }, []);

  const handleCreate = async (payload) => {
    try {
      const newIdea = await createIdea(payload);
      setIdeas(prev => [newIdea, ...prev]);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleUpvote = async (id) => {
    const voter = currentUser || "anonymous";
    setIdeas(prev => prev.map(i => i._id === id ? { ...i, votes: i.votes + 1, voters: [...(i.voters || []), voter] } : i));
    try {
      const updated = await upvoteIdea(id, voter);
      setIdeas(prev => prev.map(i => i._id === id ? updated : i));
    } catch (err) {
      alert(err.message);
      loadIdeas();
    }
  };

  const handleDelete = async (id, owner) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await deleteIdea(id, owner);
      setIdeas(prev => prev.filter(i => i._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <header className="app-header">
        <div className="header-content">
          <div className="header-logo">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z" fill="#FBBC04"/>
              <path d="M11.5 9.5h1v3h-1v-3z" fill="#F9AB00"/>
            </svg>
            <h1 className="app-title">IdeaDrop</h1>
          </div>
          <div className="user-badge">
            <span style={{ color: '#5f6368' }}>Signed in as</span>
            <strong style={{ color: '#202124' }}>{currentUser || 'Guest'}</strong>
          </div>
        </div>
      </header>

      <main className="container" style={{ paddingTop: '32px', paddingBottom: '48px' }}>
        {error && (
          <div className="error-banner">
            <span style={{ fontSize: '20px' }}>⚠️</span>
            {error}
          </div>
        )}

        <div className="card" style={{ padding: '24px', marginBottom: '24px' }}>
          <div className="idea-form-header">
            <div>
              <h2 className="form-title">Create new idea</h2>
              <p className="form-subtitle">Share your innovative ideas with the community</p>
            </div>
            {ideas.length > 0 && (
              <div className="idea-counter">
                <div className="counter-number">{ideas.length}</div>
                <div className="counter-label">Total Ideas</div>
              </div>
            )}
          </div>
          <IdeaForm onCreate={handleCreate} currentUser={currentUser} setCurrentUser={setCurrentUser} />
        </div>

        <div style={{ marginTop: '32px' }}>
          <div className="section-header">
            <h2 className="section-title">All ideas</h2>
            {ideas.length > 0 && (
              <span style={{ fontSize: '13px', color: '#5f6368' }}>Sorted by popularity</span>
            )}
          </div>

          {loading ? (
            <div className="loading-state">
              <div style={{ fontSize: '40px', marginBottom: '16px' }}>🔄</div>
              <div style={{ fontSize: '14px' }}>Loading ideas...</div>
            </div>
          ) : (
            <IdeaList ideas={ideas} onUpvote={handleUpvote} onDelete={handleDelete} currentUser={currentUser} />
          )}
        </div>
      </main>
    </div>
  );
}
