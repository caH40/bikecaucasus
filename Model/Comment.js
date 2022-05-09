import prk from 'mongoose';
const { Schema, model } = prk;

const commentSchema = new Schema({
  cardId: { type: String, unique: true, required: true },
  text: { type: String },
  userId: { type: String },
  date: { type: String },
  usersIdLike: [{ type: String }],
  usersIdDisLike: [{ type: String }],
});

export default model('Comment', commentSchema);
