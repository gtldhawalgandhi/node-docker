
import Express from 'express';
import { realtimeHandler } from '@app/realtime/src/controllers/realtime';
import { cors } from '@app/lib/src/middlewares/cors';

const app = new Express();
app.use(Express.json());
app.use(cors);
app.use(Express.urlencoded({ extended: true }));
app.post('/realtime', realtimeHandler );

// Make sure this is the last middleware
app.use((err, req, res, next) => {
  if (err instanceof Error) {
    res.status(500).json({ err: 'Something went wrong' });

  }
  else {
    next();
  }
});

export default app;
