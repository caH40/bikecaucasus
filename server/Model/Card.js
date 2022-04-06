import pkg from 'mongoose';
const { Schema, model } = pkg;

const cardSchema = new Schema({
  id: { type: Number },
  nameRoute: { type: String },
  state: { type: String },
  bikeType: { type: String },
  start: { type: String },
  turn: { type: String },
  finish: { type: String },
  distance: { type: String },
  ascent: { type: String },
  descriptionArea: { type: String },
  cardPhoto: { type: String },
  fileTrek: { type: String },
});

export default model('cards', cardSchema);
