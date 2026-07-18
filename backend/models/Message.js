import mongoose from 'mongoose';
export default mongoose.model('Message', new mongoose.Schema({ roomId: { type: String, required: true, index: true }, sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, text: String, attachments: [String] }, { timestamps: true }));
