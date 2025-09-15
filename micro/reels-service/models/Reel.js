const mongoose = require("mongoose");

const reelSchema = new mongoose.Schema({
  title: { type: String, required: true },
  videoUrl: { type: String, required: true }, 
  userId: { type: String, required: true },    
  likes: [{ type: String }],                   
  comments: [
    {
      userId: String,
      text: String,
      createdAt: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Reel", reelSchema);
