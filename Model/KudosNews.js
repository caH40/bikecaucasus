import mongoose from 'mongoose';
import prk from 'mongoose';

const { Schema, model } = prk;

const kudosNewsSchema = new Schema({
  newsId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'News',
    unique: true,
    required: true,
  },
  usersIdLike: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  usersIdDislike: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  views: { type: Number, default: 0 },
});

export default model('KudosNews', kudosNewsSchema);
