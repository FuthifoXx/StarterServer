const mongoose = require('mongoose');

const BlogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A blog must have a title'],
      trim: true,
    },
    subtitle: {
      type: String,
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'A blog must have content'],
    },
    imageUrl: {
      type: String,
      default: '',
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'A blog must have an author'],
    },
  },
  {
    timestamps: true,
  },
);

const Blog = mongoose.model('Blog', BlogPostSchema);
module.exports = Blog;
