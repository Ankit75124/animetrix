import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter anime title"],
    minLength: [4, "Title must be at least 4 characters long"],
    maxLength: [80, "Title must be at most 80 characters long"],
  },
  description: {
    type: String,
    required: [true, "Please enter anime description"],
    minLength: [20, "Title must be at least 20 characters long"],
  },
  episodes: [
    {
      title: {
        type: String,
        required: [true, "Please enter episode title"],
      },
      description: {
        type: String,
        required: [true, "Please enter episode description"],
      },
      video: {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    },
  ],
  poster: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  views: {
    type: Number,
    default: 0,
  },
  noOfVideos: {
    type: Number,
    default: 0,
  },
  category: {
    type: Number,
    required: [true, "Please select anime category"],
  },
  createdBy: {
    type: Number,
    required: [true, "Enter Anime Creator Name"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Anime = mongoose.model("Anime", schema);
