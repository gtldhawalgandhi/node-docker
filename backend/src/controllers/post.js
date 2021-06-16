import fs from 'fs';
import path from 'path';

import { validationResult } from 'express-validator/check';

import Post from '@app/models/post';
import User from '@app/models/user';

const clearImage = filePath => {
  let fP = filePath;
  fP = path.join(__dirname, '..', filePath);
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  fs.unlink(fP, err => console.log(err));
};

const getPosts = async (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 2;
  try {
    const totalItems = await Post.find().countDocuments();
    const posts = await Post.find()
      .populate('author')
      .sort({ createdAt: -1 })
      .skip((currentPage - 1) * perPage)
      .limit(perPage);

    res.status(200).json({
      message: `${posts.length} posts fetched`,
      posts: posts,
      totalItems: totalItems
    });
  }
  catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const createPost = async (req, res, next) => {
  try {

    const { title, content } = req?.body;
    const post = new Post({
      title,
      content,
      author: req.userId
    });
    await post.save();
    const user = await User.findById(req.userId);
    user.posts.push(post);
    await user.save();

    res.status(201).json({
      message: 'Post created successfully!',
      post,
      author: { _id: user._id, name: user.name }
    });
  }
  catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const getPost = async (req, res, next) => {
  const postId = req.params.postId;
  const post = await Post.findById(postId);
  try {
    if (!post) {
      const error = new Error('Could not find post.');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ message: 'Post fetched.', post });
  }
  catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const updatePost = async (req, res, next) => {
  const postId = req.params.postId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }

  const { title, content } = req?.body;

  try {
    const post = await Post.findById(postId).populate('author');
    if (!post) {
      const error = new Error('Could not find post.');
      error.statusCode = 404;
      throw error;
    }
    if (post.author._id.toString() !== req.userId) {
      const error = new Error('Not authorized!');
      error.statusCode = 403;
      throw error;
    }

    post.title = title;
    post.content = content;
    const result = await post.save();
    res.status(200).json({ message: 'Post updated!', post: result });
  }
  catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const deletePost = async (req, res, next) => {
  const postId = req.params.postId;
  try {
    const post = await Post.findById(postId);

    if (!post) {
      const error = new Error('Could not find post.');
      error.statusCode = 404;
      throw error;
    }
    if (post.author.toString() !== req.userId) {
      const error = new Error('Not authorized!');
      error.statusCode = 403;
      throw error;
    }
    await Post.findByIdAndRemove(postId);

    const user = await User.findById(req.userId);
    user.posts.pull(postId);
    await user.save();
    res.status(200).json({ message: 'Deleted post.' });
  }
  catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};


export {
  getPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
};