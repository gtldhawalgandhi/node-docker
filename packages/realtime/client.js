const io = require('socket.io-client');

const socket = io('http://localhost:10001');

socket.on('connect', () => {
  const timeout = 40000;
  console.log(`Client connected for ${timeout}`);

  socket.on('realtimeEvent', (payload) => {

    console.log(JSON.stringify(payload, null, 2));
  });

  setTimeout(() => {
    process.exit(0);
  }, timeout);
});