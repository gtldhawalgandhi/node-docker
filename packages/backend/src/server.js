import app from './app';
import db from '@app/lib/src/dbConn';

const start = async () => {
  await db();
  const port = process.env.PORT;

  app.listen(port, '0.0.0.0', () => {
    console.log(`Starting Backend server on port ${port}`);
  });
};

(async () => {
  await start();
})();
