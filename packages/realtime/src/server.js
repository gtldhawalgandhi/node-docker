import app from './app';
import { web } from './socket';

const start = async () => {
  const port = process.env.SOCKET_PORT || 9998;

  const server = app.listen(port, '0.0.0.0');
  const io = web.init(server);

  console.log(`Server init started: ${port}`);

  io.on('connection', () => {
    console.log('Websocket connection created');
  });

};

(async () => {
  await start();
})();
