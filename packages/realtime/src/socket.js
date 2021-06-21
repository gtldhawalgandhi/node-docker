import { Server } from 'socket.io';

let io;

export const web = {
  init: (server) => {
    io = new Server(server);

    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error('Websocket instance not found');
    }

    return io;
  }
};