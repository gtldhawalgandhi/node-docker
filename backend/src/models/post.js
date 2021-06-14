import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    imageURL: {
      type: String
    },
    content: {
      type: String,
      required: true
    },
    author: {
      type: mongoose?.Schema?.Types?.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
);

const Post = new mongoose.model('Post', postSchema);

export default Post;