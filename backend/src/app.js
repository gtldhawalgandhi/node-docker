
import Express from 'express';
import fileupload from 'express-fileupload';
import userRouter from '@app/routes/user';
import postRouter from '@app/routes/post';
import { registerUser, loginUser } from '@app/controllers/user';
import { tokenMiddleware } from '@app/middlewares/auth';
import { cors } from '@app/middlewares/cors';

const app = new Express();
app.use(Express.json());
app.use(cors);
app.use(Express.urlencoded({ extended: true }));
app.use('/users', tokenMiddleware, fileupload(), userRouter);
app.post('/login', loginUser);
app.post('/register', registerUser);
app.use('/posts',  tokenMiddleware, fileupload(), postRouter);

// Make sure this is the last middleware
app.use((err, req, res, next) => {
  if (err instanceof Error) {
    res.status(500).json({err: 'Something went wrong'});

  }
  else {
    next();
  }
});

export default app;
