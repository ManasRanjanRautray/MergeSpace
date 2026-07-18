import mongoose from 'mongoose';
export default mongoose.model('Note', new mongoose.Schema({ title: { type: String, required: true }, description: String, subject: String, fileUrl: { type: String, required: true }, uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, downloads: { type: Number, default: 0 } }, { timestamps: true }));
