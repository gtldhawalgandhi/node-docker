import express from 'express';

import { createPost, deletePost, getPost, getPosts, updatePost } from '@app/controllers/post';

const postRouter = express.Router();

postRouter.get('/', getPosts);

postRouter.route('/').post(createPost);

postRouter.get('/:postId', getPost);

postRouter.put('/:postId', updatePost);

postRouter.delete('/:postId', deletePost);

export default postRouter;
