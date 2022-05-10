import mongoose from 'mongoose';
import prk from 'mongoose';
const { Schema, model } = prk;

const commentSchema = new Schema({
  cardId: { type: mongoose.Schema.Types.ObjectId, ref: 'Card', required: true },
  text: { type: String },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: Number },
  usersIdLike: [{ type: String }],
  usersIdDisLike: [{ type: String }],
});

export default model('Comment', commentSchema);
