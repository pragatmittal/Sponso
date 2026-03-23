import mongoose from 'mongoose';
const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  proposal: { type: mongoose.Schema.Types.ObjectId, ref: 'Proposal' },
  content: { type: String, required: true },
  isRead: { type: Boolean, default: false }
}, { timestamps: true });
export default mongoose.model('Message', messageSchema);
