import prk from 'mongoose';
const { Schema, model } = prk;

const User = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  firstName: { type: String },
  lastName: { type: String },
  age: { type: Number },
  city: { type: String },
  team: { type: String },
  roles: [{ type: String, Ref: 'Role' }],
});

export default model('User', User);
