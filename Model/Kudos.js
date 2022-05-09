import prk from 'mongoose';
const { Schema, model } = prk;

const kudosSchema = new Schema({
  cardId: { type: String, unique: true, required: true },
  usersIdLike: [{ type: String }],
  usersIdDisLike: [{ type: String }],
  views: { type: Number, default: 0 },
});

export default model('Kudos', kudosSchema);
