import prk from 'mongoose';
const { Schema, model } = prk;

//почему роли должны быть уникальными?
const Role = new Schema({
  value: { type: String, unique: true, default: 'user' },
});

export default model('Role', Role);
