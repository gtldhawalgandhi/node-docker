import  { scryptSync }  from 'crypto';
import { config } from './config';

const getHash = (password) => scryptSync(password, config.salt, 32).toString('hex');

export {
  getHash
};