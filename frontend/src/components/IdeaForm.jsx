import React, { useState } from "react";

export default function IdeaForm({ onCreate, currentUser, setCurrentUser }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (title.trim().length < 3) return alert("Title must be at least 3 characters");
    onCreate({ title: title.trim(), description, owner: currentUser || "anonymous" });
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={submit} className="form-field">
      <div>
        <label htmlFor="owner">Your Name</label>
        <input 
          id="owner"
          type="text"
          placeholder="Enter your name" 
          value={currentUser} 
          onChange={e => setCurrentUser(e.target.value)} 
        />
      </div>
      <div>
        <label htmlFor="title">Idea Title</label>
        <input 
          id="title"
          type="text"
          placeholder="What's your idea?" 
          value={title} 
          onChange={e => setTitle(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea 
          id="description"
          placeholder="Describe your idea in detail..." 
          value={description} 
          onChange={e => setDescription(e.target.value)} 
        />
      </div>
      <button type="submit" className="btn-primary">
        Submit Idea
      </button>
    </form>
  );
}
