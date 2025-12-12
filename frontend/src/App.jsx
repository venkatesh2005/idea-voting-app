import React, { useEffect, useState } from "react";
import { fetchIdeas, createIdea, upvoteIdea, deleteIdea } from "./ideasApi";
import IdeaForm from "./components/IdeaForm";
import IdeaList from "./components/IdeaList";

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
      {/* Top App Bar */}
      <header style={{
        background: '#fff',
        borderBottom: '1px solid #dadce0',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 1px 2px 0 rgba(60,64,67,0.3), 0 2px 6px 2px rgba(60,64,67,0.15)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z" fill="#FBBC04"/>
              <path d="M11.5 9.5h1v3h-1v-3z" fill="#F9AB00"/>
            </svg>
            <h1 style={{
              margin: 0,
              fontSize: '24px',
              fontWeight: '600',
              background: 'linear-gradient(135deg, #1a73e8 0%, #4285f4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.5px'
            }}>IdeaDrop</h1>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: '#f1f3f4',
            padding: '8px 16px',
            borderRadius: '24px'
          }}>
            <span style={{ fontSize: '14px', color: '#5f6368' }}>Signed in as</span>
            <strong style={{ fontSize: '14px', color: '#202124' }}>{currentUser || 'Guest'}</strong>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container" style={{ paddingTop: '32px', paddingBottom: '48px' }}>
        {error && (
          <div style={{
            background: '#fce8e6',
            color: '#d93025',
            padding: '12px 16px',
            borderRadius: '4px',
            marginBottom: '24px',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <span style={{ fontSize: '20px' }}>⚠️</span>
            {error}
          </div>
        )}

        {/* Create Idea Card */}
        <div className="card" style={{ padding: '24px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h2 style={{ 
                margin: '0 0 4px 0', 
                fontSize: '16px', 
                fontWeight: '500', 
                color: '#202124' 
              }}>Create new idea</h2>
              <p style={{ 
                margin: 0, 
                fontSize: '13px', 
                color: '#5f6368' 
              }}>Share your innovative ideas with the community</p>
            </div>
            {ideas.length > 0 && (
              <div style={{ 
                paddingLeft: '24px',
                borderLeft: '1px solid #dadce0',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '24px', fontWeight: '500', color: '#1a73e8', lineHeight: '1' }}>
                  {ideas.length}
                </div>
                <div style={{ fontSize: '11px', color: '#5f6368', marginTop: '4px' }}>Total Ideas</div>
              </div>
            )}
          </div>
          <IdeaForm onCreate={handleCreate} currentUser={currentUser} setCurrentUser={setCurrentUser} />
        </div>

        {/* Ideas Section */}
        <div style={{ marginTop: '32px' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            marginBottom: '20px'
          }}>
            <h2 style={{ 
              margin: 0, 
              fontSize: '20px', 
              fontWeight: '400', 
              color: '#202124' 
            }}>All ideas</h2>
            {ideas.length > 0 && (
              <span style={{ fontSize: '13px', color: '#5f6368' }}>Sorted by popularity</span>
            )}
          </div>

          {loading ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '80px 20px',
              color: '#5f6368'
            }}>
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
