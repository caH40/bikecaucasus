import prk from 'mongoose';
const { Schema, model } = prk;

const userConfirmSchema = new Schema({
  userId: { type: String, unique: true, required: true },
  dateRegistration: { type: Number, required: true },
  token: { type: String, required: true },
  email: { type: String, required: true },
});

export default model('UserConfirm', userConfirmSchema);
