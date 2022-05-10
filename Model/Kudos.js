import mongoose from 'mongoose';
import prk from 'mongoose';

const { Schema, model } = prk;

const kudosSchema = new Schema({
  cardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Card',
    unique: true,
    required: true,
  },
  usersIdLike: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  usersIdDisLike: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  views: { type: Number, default: 0 },
});

export default model('Kudos', kudosSchema);
