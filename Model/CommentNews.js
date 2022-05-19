import mongoose from 'mongoose';
import prk from 'mongoose';

const { Schema, model } = prk;

const commentNewsSchema = new Schema({
  newsId: { type: mongoose.Schema.Types.ObjectId, ref: 'News', required: true },
  text: { type: String },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: Number },
  dateChange: { type: Number },
  usersIdLike: [{ type: String }],
  usersIdDisLike: [{ type: String }],
});

export default model('CommentNews', commentNewsSchema);
//кудосы для комментариев может и не нужны
