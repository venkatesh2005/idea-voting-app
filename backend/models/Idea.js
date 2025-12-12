const mongoose = require('mongoose');

const IdeaSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true, 
    trim: true,
    minlength: [3, 'Title must be at least 3 characters']
  },
  description: { 
    type: String, 
    default: '',
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  votes: { 
    type: Number, 
    default: 0,
    min: [0, 'Votes cannot be negative']
  },
  voters: { 
    type: [String], 
    default: [] 
  },
  owner: { 
    type: String, 
    default: 'anonymous',
    trim: true
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

IdeaSchema.index({ votes: -1, createdAt: -1 });

module.exports = mongoose.model('Idea', IdeaSchema);