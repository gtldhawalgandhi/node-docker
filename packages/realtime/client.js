const io = require('socket.io-client');

const socket = io('http://localhost:9998');

socket.on('connect', () => {
  console.log('Client connected');

  socket.on('realtimeEvent', (payload) => {

    console.log(JSON.stringify(payload, null, 2));
  });

  setTimeout(() => {
    process.exit(0);
  }, 30000);
});