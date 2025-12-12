import React from "react";
import IdeaCard from "./IdeaCard";

export default function IdeaList({ ideas, onUpvote, onDelete, currentUser }) {
  const maxVotes = ideas.length ? Math.max(...ideas.map(i => i.votes)) : 0;

  if (ideas.length === 0) {
    return (
      <div className="card" style={{ 
        textAlign: 'center', 
        padding: '60px 24px',
        background: '#fff',
        border: '2px dashed #dadce0'
      }}>
        <div style={{ fontSize: '64px', marginBottom: '16px', opacity: 0.3 }}>💡</div>
        <h3 style={{ fontSize: '16px', fontWeight: '400', color: '#202124', marginBottom: '8px' }}>No ideas yet</h3>
        <p style={{ fontSize: '14px', color: '#5f6368', margin: 0 }}>Be the first to share an innovative idea</p>
      </div>
    );
  }

  return (
    <div className="masonry-grid">
      {ideas.map(idea => (
        <IdeaCard
          key={idea._id}
          idea={idea}
          onUpvote={onUpvote}
          onDelete={onDelete}
          currentUser={currentUser}
          isTrending={idea.votes === maxVotes && maxVotes > 0}
        />
      ))}
    </div>
  );
}
