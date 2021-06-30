import dotenv from 'dotenv';
import path from 'path';

const envPath = path.join(__dirname, '.env');
dotenv.config({ path: envPath });

const config = {
  env: process.env.NODE_ENV,
  db: process.env.MONGODB_URL,
  salt: process.env.SALT,
  realtimeAppHost: process.env.REALTIME_APP_HOST,
};

if (config.env !== 'production') {
  console.log(`App Config: ${JSON.stringify(config, null, 2)}`);
}

export {
  config
};