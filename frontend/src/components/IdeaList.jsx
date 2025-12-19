import React from "react";
import IdeaCard from "./IdeaCard";
import "./IdeaList.css";

export default function IdeaList({ ideas, onUpvote, onDelete, currentUser }) {
  const maxVotes = ideas.length ? Math.max(...ideas.map(i => i.votes)) : 0;

  if (ideas.length === 0) {
    return (
      <div className="card empty-state">
        <div className="empty-state-icon">💡</div>
        <h3 className="empty-state-title">No ideas yet</h3>
        <p className="empty-state-text">Be the first to share an innovative idea</p>
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
