# IdeaDrop

A simple idea sharing platform where you can submit ideas, vote on them, and see what's trending. Built with React and Node.js.

## Features

- Submit ideas with a title and description
- Upvote ideas you like (one vote per person)
- Delete your own ideas
- See which ideas are trending (marked with a "Hot" badge)

## Tech Stack

**Frontend:** React, Vite  
**Backend:** Node.js, Express  
**Database:** MongoDB

## Getting Started

### What You Need

- Node.js (v16+)
- MongoDB (running locally or MongoDB Atlas account)

### Backend Setup

1. Go to the backend folder:
   ```bash
   cd backend
   ```

2. Install packages:
   ```bash
   npm install
   ```

3. Create a `.env` file with:
   ```
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/ideadrop
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Go to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install packages:
   ```bash
   npm install
   ```

3. Start the dev server:
   ```bash
   npm run dev
   ```

Open `http://localhost:5173` and you're good to go!

## API Endpoints

```
GET    /api/ideas              - Get all ideas
POST   /api/ideas              - Create new idea
PUT    /api/ideas/:id/upvote   - Upvote an idea
DELETE /api/ideas/:id          - Delete an idea
```

## Notes

- Make sure MongoDB is running before starting the backend
- The frontend will proxy API requests to the backend automatically
- Ideas are sorted by vote count (highest first)
- You can only vote once per idea and only delete your own ideas

