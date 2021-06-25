import app from './app';
import { web } from './socket';

const start = async () => {
  const port = process.env.PORT;

  const server = app.listen(port, '0.0.0.0');
  const io = web.init(server);

  console.log(`Starting Realtime server on port ${port}`);

  io.on('connection', () => {
    console.log('Websocket connection created');
  });

};

(async () => {
  await start();
})();
