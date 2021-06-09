import dotenv from 'dotenv';
import path from 'path';

const envPath = path.join(__dirname, '.env');
dotenv.config({ path: envPath });

console.log(`envPath: ${envPath}`);

export const config = {
  env: process.env.NODE_ENV,
  db: process.env.DB,
};
