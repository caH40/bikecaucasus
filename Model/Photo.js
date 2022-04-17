import pkg from 'mongoose';
const { Schema, model } = pkg;

const photoSchema = new Schema({
  id: { type: Number },
  nameRoute: { type: String, required: true },
  state: { type: String },
  descPhoto: { type: Array },
});

export default model('photos', photoSchema);
