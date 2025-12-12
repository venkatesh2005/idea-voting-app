import React, { useState } from "react";

export default function IdeaCard({ idea, onUpvote, onDelete, currentUser, isTrending }) {
  const voter = currentUser || "anonymous";
  const hasVoted = idea.voters && idea.voters.includes(voter);
  const isOwner = (idea.owner || "anonymous") === voter;
  
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 150;
  const needsTruncation = idea.description && idea.description.length > maxLength;
  
  return (
    <div className="card" style={{ 
      display: 'flex',
      flexDirection: 'column',
      padding: '20px',
      position: 'relative',
      breakInside: 'avoid',
      marginBottom: '16px'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
          <h3 style={{
            margin: 0,
            fontSize: '16px',
            fontWeight: '500',
            color: '#202124',
            lineHeight: '1.4',
            flex: 1
          }}>{idea.title}</h3>
          {isTrending && (
            <span style={{
              fontSize: '10px',
              padding: '4px 8px',
              background: '#ea4335',
              color: '#fff',
              borderRadius: '12px',
              fontWeight: '500',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              whiteSpace: 'nowrap'
            }}>🔥 Hot</span>
          )}
        </div>
      </div>

      {/* Description */}
      {idea.description && (
        <div style={{ marginBottom: '16px' }}>
          <p style={{
            margin: 0,
            fontSize: '14px',
            lineHeight: '1.6',
            color: '#5f6368'
          }}>
            {needsTruncation && !isExpanded 
              ? `${idea.description.substring(0, maxLength)}...` 
              : idea.description}
          </p>
          {needsTruncation && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              style={{
                background: 'none',
                color: '#1a73e8',
                border: 'none',
                padding: '4px 0',
                marginTop: '8px',
                fontSize: '13px',
                fontWeight: '500',
                cursor: 'pointer',
                textDecoration: 'none'
              }}
              onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
              onMouseOut={(e) => e.target.style.textDecoration = 'none'}
            >
              {isExpanded ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>
      )}

      {/* Footer */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        paddingTop: '12px',
        borderTop: '1px solid #dadce0',
        gap: '8px'
      }}>
        {/* User and Date */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: 0 }}>
          <div 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '3px 8px',
              background: '#e8f0fe',
              borderRadius: '12px',
              fontSize: '11px',
              color: '#1a73e8',
              fontWeight: '500',
              maxWidth: '120px'
            }}
            title={idea.owner || 'anonymous'}
          >
            <span style={{ flexShrink: 0 }}>👤</span>
            <span style={{ 
              overflow: 'hidden', 
              textOverflow: 'ellipsis', 
              whiteSpace: 'nowrap'
            }}>
              {(idea.owner || 'anonymous').length > 15 
                ? `${(idea.owner || 'anonymous').substring(0, 10)}...` 
                : (idea.owner || 'anonymous')}
            </span>
          </div>
          <span style={{ fontSize: '11px', color: '#80868b', whiteSpace: 'nowrap' }}>
            {new Date(idea.createdAt).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric'
            })} • {new Date(idea.createdAt).toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit'
            })}
          </span>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
          <button 
            onClick={() => onUpvote(idea._id)} 
            disabled={hasVoted}
            style={{
              background: hasVoted ? '#f8f9fa' : '#fff',
              color: hasVoted ? '#5f6368' : '#1a73e8',
              padding: '6px 12px',
              borderRadius: '16px',
              fontSize: '12px',
              fontWeight: '500',
              border: hasVoted ? '1px solid #dadce0' : '1px solid #1a73e8',
              cursor: hasVoted ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
            onMouseOver={(e) => !hasVoted && (e.target.style.background = '#e8f0fe')}
            onMouseOut={(e) => !hasVoted && (e.target.style.background = '#fff')}
          >
            <span style={{ fontSize: '14px', fontWeight: '700' }}>{idea.votes}</span>
            <span>{hasVoted ? '✓' : '↑'}</span>
          </button>
          {isOwner && (
            <button 
              style={{
                background: '#fff',
                color: '#5f6368',
                border: '1px solid #dadce0',
                padding: '6px 10px',
                borderRadius: '16px',
                fontSize: '16px',
                cursor: 'pointer'
              }} 
              onClick={() => onDelete(idea._id, currentUser)}
              onMouseOver={(e) => {
                e.target.style.background = '#fce8e6';
                e.target.style.color = '#d93025';
                e.target.style.borderColor = '#d93025';
              }}
              onMouseOut={(e) => {
                e.target.style.background = '#fff';
                e.target.style.color = '#5f6368';
                e.target.style.borderColor = '#dadce0';
              }}
            >
              🗑️
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
