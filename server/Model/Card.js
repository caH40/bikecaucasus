import pkg from 'mongoose';
const { Schema, model } = pkg;

const testSchema = new Schema({
  nameRoute: { type: String },
  state: { type: String },
  bikeType: { type: String },
  start: { type: String },
  turn: { type: String },
  finish: { type: String },
  distance: { type: String },
  ascent: { type: String },
  descriptionArea: { type: String },
  descPhoto: { type: String },
  descPhoto: { type: Array },
  cardPhoto: { type: String },
  fileTrek: { type: String },
});

export default model('tests', testSchema);
