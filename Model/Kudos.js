import prk from 'mongoose';
const { Schema, model } = prk;

const kudosShema = new Schema({
  cardId: { type: String, unique: true, required: true },
  usersId: [{ type: String }],
  views: { type: Number, default: 0 },
});

export default model('Kudos', kudosShema);
