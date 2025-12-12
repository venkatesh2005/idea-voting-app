require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const ideasRoutes = require("./routes/ideas");

// Initialize Express application
const app = express();

// Middleware
app.use(cors()); 
app.use(express.json()); 

// Routes
app.get("/", (req, res) => res.json({ ok: true, msg: "IdeaDrop API" }));
app.use("/api/ideas", ideasRoutes);

// Configuration
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ideadrop";


mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });
