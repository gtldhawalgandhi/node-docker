import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String },
  age: { type: Number },
  email: { type: String, unique: true, required: true },
  password: { type: String },
  img: { type: String },
});

const User = new mongoose.model('User', userSchema);

export default User;
