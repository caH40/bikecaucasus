import pkg from 'mongoose';
const { Schema, model } = pkg;

const photoSchema = new Schema({
  id: { type: String },
  nameRoute: { type: String },
  state: { type: String },
  descPhoto: { type: Array },
});

export default model('photos', photoSchema);
