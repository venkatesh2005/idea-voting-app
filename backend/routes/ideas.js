const express = require("express");
const router = express.Router();
const Idea = require("../models/Idea");

// Create new idea
router.post("/", async (req, res) => {
  try {
    const { title, description, owner } = req.body;
    if (!title || title.trim().length < 3) return res.status(400).json({ error: "Title must be at least 3 characters" });
    const idea = new Idea({ title: title.trim(), description: description || "", owner: owner || "anonymous" });
    await idea.save();
    res.status(201).json(idea);
  } catch (err) {
    console.error("POST /api/ideas error:", err);
    res.status(500).json({ error: "Server error on create", detail: err.message });
  }
});

// Get all ideas
router.get("/", async (req, res) => {
  try {
    const ideas = await Idea.find().sort({ votes: -1, createdAt: -1 });
    res.json(ideas);
  } catch (err) {
    console.error("GET /api/ideas error:", err);
    res.status(500).json({ error: "Server error on list", detail: err.message });
  }
});

// Upvote idea
router.put("/:id/upvote", async (req, res) => {
  try {
    const voter = req.body.voter || "anonymous";
    const idea = await Idea.findById(req.params.id);
    if (!idea) return res.status(404).json({ error: "Idea not found" });
    
    // prevent duplicate voting
    if (idea.voters.includes(voter)) {
      return res.status(400).json({ error: "You have already voted for this idea" });
    }
    
    idea.votes += 1;
    idea.voters.push(voter);
    await idea.save();
    res.json(idea);
  } catch (err) {
    console.error("PUT /api/ideas/:id/upvote error:", err);
    res.status(500).json({ error: "Server error on upvote", detail: err.message });
  }
});

// Delete idea (only owner can delete)
router.delete("/:id", async (req, res) => {
  try {
    const ownerFromBody = (req.body && req.body.owner) ? req.body.owner : undefined;
    const owner = ownerFromBody || req.query.owner || "";

    const idea = await Idea.findById(req.params.id);
    if (!idea) {
      return res.status(404).json({ error: "Idea not found" });
    }

    // check if requester is the owner
    if ((idea.owner || "") !== owner) {
      return res.status(403).json({ error: "Not authorized to delete (owner mismatch)", ideaOwner: idea.owner });
    }

    await Idea.deleteOne({ _id: idea._id });
    res.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/ideas/:id error:", err);
    res.status(500).json({ error: "Server error on delete", detail: err.message });
  }
});

module.exports = router;
