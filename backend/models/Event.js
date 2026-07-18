import mongoose from 'mongoose';
export default mongoose.model('Event', new mongoose.Schema({ title: { type: String, required: true }, description: String, date: { type: Date, required: true }, location: String, organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] }, { timestamps: true }));
