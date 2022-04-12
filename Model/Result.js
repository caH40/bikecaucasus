import pkg from 'mongoose';
const { Schema, model } = pkg;

const resultSchema = new Schema({
  eventId: { type: String },
  place: { type: Number },
  number: { type: Number },
  athlete: { type: String },
  athleteCity: { type: String, default: 'nope' },
  athleteTeam: { type: String, default: 'nope' },
  distance: { type: Number },
  timeTotal: { type: String },
  birthday: { type: String, default: 'nope' },
});

export default model('results', resultSchema);
