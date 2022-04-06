import pkg from 'mongoose';
const { Schema, model } = pkg;

const photoSchema = new Schema({
  id: { type: Number },
  descPhoto: { type: Array },
});

export default model('photos', photoSchema);
