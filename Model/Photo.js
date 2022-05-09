import pkg from 'mongoose';
const { Schema, model } = pkg;

const photoSchema = new Schema({
  cardId: { type: String },
  nameRoute: { type: String, required: true },
  state: { type: String },
  descPhoto: { type: Array },
  authorPhoto: { type: String },
});

export default model('photos', photoSchema);
