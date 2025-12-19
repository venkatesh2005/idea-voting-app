import React, { useState } from "react";
import "./IdeaCard.css";

export default function IdeaCard({ idea, onUpvote, onDelete, currentUser, isTrending }) {
  const voter = currentUser || "anonymous";
  const hasVoted = idea.voters && idea.voters.includes(voter);
  const isOwner = (idea.owner || "anonymous") === voter;
  
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 150;
  const needsTruncation = idea.description && idea.description.length > maxLength;
  
  const truncateOwner = (name) => {
    return name.length > 15 ? `${name.substring(0, 10)}...` : name;
  };
  
  return (
    <div className="card idea-card">
      <div className="idea-card-header">
        <div className="idea-card-title-row">
          <h3 className="idea-card-title">{idea.title}</h3>
          {isTrending && <span className="trending-badge">🔥 Hot</span>}
        </div>
      </div>

      {idea.description && (
        <div className="idea-card-description">
          <p className="description-text">
            {needsTruncation && !isExpanded 
              ? `${idea.description.substring(0, maxLength)}...` 
              : idea.description}
          </p>
          {needsTruncation && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="read-more-btn"
            >
              {isExpanded ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>
      )}

      <div className="idea-card-footer">
        <div className="idea-meta">
          <div className="owner-badge" title={idea.owner || 'anonymous'}>
            <span>👤</span>
            <span className="owner-name">
              {truncateOwner(idea.owner || 'anonymous')}
            </span>
          </div>
          <span className="idea-timestamp">
            {new Date(idea.createdAt).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric'
            })} • {new Date(idea.createdAt).toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit'
            })}
          </span>
        </div>

        <div className="idea-actions">
          <button 
            onClick={() => onUpvote(idea._id)} 
            disabled={hasVoted}
            className={`vote-btn ${hasVoted ? 'active' : 'inactive'}`}
          >
            <span className="vote-count">{idea.votes}</span>
            <span>{hasVoted ? '✓' : '↑'}</span>
          </button>
          {isOwner && (
            <button 
              className="delete-btn"
              onClick={() => onDelete(idea._id, currentUser)}
            >
              🗑️
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
