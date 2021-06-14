import express from 'express';
import { createUser, getUser, storeUserImage, findUserById, deleteUserById } from '@app/controllers/user';

const router = new express.Router();

router.get('/', getUser);

router.post('/', createUser);

router.route('/:id/image').post(storeUserImage);

router
  .route('/:id')
  .get(findUserById)
  .delete(deleteUserById);


export default router;