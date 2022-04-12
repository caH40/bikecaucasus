import pkg from 'mongoose';
const { Schema, model } = pkg;

const eventSchema = new Schema({
  eventId: { type: String, required: true },
  eventName: { type: String, required: true },
  eventDate: { type: String, required: true },
  eventCity: { type: String, required: true },
});

export default model('events', eventSchema);
