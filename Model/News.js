import mongoose from 'mongoose';
import pkg from 'mongoose';
const { Schema, model } = pkg;

const newsSchema = new Schema({
  title: { type: String, required: true },
  descriptionArea: { type: String },
  newsPhoto: { type: String },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  kudoses: { type: mongoose.Schema.Types.ObjectId, ref: 'KudosNews' },
  date: { type: Number },
  kudosQuantity: { type: Number },
  commentsQuantity: { type: Number },
  likeUser: { type: Boolean },
  dislikeUser: { type: Boolean },
});

export default model('News', newsSchema);
