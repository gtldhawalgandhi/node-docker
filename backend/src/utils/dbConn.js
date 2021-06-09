import mongoose from 'mongoose';
import { config } from '../config';

export default async (db) => {
  try {
    const conn = await mongoose.connect(config.db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    return conn;
  } catch (err) {
    throw new Error('MongoDB connection err: ' + err);
  }
};
