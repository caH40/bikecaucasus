import prk from 'mongoose';
const { Schema, model } = prk;

const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  emailConfirm: { type: Boolean, default: false },
  phone: { type: String },
  firstName: { type: String },
  patronymic: { type: String },
  lastName: { type: String },
  gender: { type: String },
  birthday: { type: Number },
  city: { type: String },
  team: { type: String },
  roles: [{ type: String, Ref: 'Role' }],
  photoProfile: { type: String },
});

export default model('User', userSchema);
