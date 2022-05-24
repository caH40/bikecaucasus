import prk from 'mongoose';
const { Schema, model } = prk;

const passwordResetSchema = new Schema({
  dateRequest: { type: Number, required: true },
  token: { type: String, required: true },
  email: { type: String, required: true },
});

export default model('PasswordReset', passwordResetSchema);
