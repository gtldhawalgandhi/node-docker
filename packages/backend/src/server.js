import app from './app';
import db from './utils/dbConn';

const start = async () => {
  await db();
  const port = process.env.PORT || 9999;

  app.listen(port, '0.0.0.0', () => {
    console.log(`Starting node express server on port ${port}`);
  });
};

(async () => {
  await start();
})();
