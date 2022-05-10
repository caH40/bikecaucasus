import prk from 'mongoose';
const { Schema, model } = prk;

//почему роли должны быть уникальными?
const roleSchema = new Schema({
  value: { type: String, unique: true, default: 'user' },
});

export default model('Role', roleSchema);
