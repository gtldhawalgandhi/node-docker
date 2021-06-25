import app from './app';

const start = async () => {
  const port = process.env.PORT;

  app.listen(port, '0.0.0.0', () => {
    console.log(`Starting Graph server on port ${port}`);
  });

};

(async () => {
  await start();
})();
