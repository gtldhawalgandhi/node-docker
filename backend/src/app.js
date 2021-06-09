import jwt from 'jsonwebtoken';
import Express from 'express';
import fileupload from 'express-fileupload';
import userRouter from './routes/user';
import { register, login } from './controllers/user';

const app = new Express();

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

const tokenMiddleware = (req, res, next) => {
  const token = req.headers && req.headers.authorization;
  if (token) {
    const decodedJWTData = jwt.verify(token, 'randomTokenSecretKey123');
    req.user = decodedJWTData;
    next();
  } else {
    res.status(401).json({
      err: 'unauthorized access',
    });
  }
};

app.use('/user', tokenMiddleware, fileupload(), userRouter);

app.post('/login', async (req, res) => {
  if (!req.body.email && !req.body.password) {
    res.status(401).json({
      err: 'Email and Password are required',
    });
  }
  const token = await login(req.body);
  if (token) {
    res.header('authorization', token).json({
      status: 'ok',
    });
    return;
  }
  res.status(401).json({
    err: 'Login failed!',
  });
});

app.post('/register', async (req, res) => {
  try {
    if (!req.body.email && !req.body.password) {
      res.status(401).json({
        err: 'Email and Password are required',
      });
      return;
    }
    await register(req.body);
    res.json({ status: 'ok' });
  } catch (err) {
    res.end(JSON.stringify({err: err.message}));
  }
});

export default app;
