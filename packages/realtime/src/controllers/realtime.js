

import Logger from '@app/lib/logger';

import { web } from '@app/realtime/src/socket';

// const logger = new Logger('Realtime', 'realtime.js');

const realtimeHandler = async (req, res) => {
  web.getIO().emit('realtimeEvent', { message: 'Sent from socket io'});

  res.end('Event Sent successfully');
};

export {
  realtimeHandler
};