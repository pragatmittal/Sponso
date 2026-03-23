import mongoose from 'mongoose';
const proposalSchema = new mongoose.Schema({
  campaign: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign', required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  coverLetter: { type: String, required: true },
  bidAmount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected', 'negotiating'], default: 'pending' }
}, { timestamps: true });
export default mongoose.model('Proposal', proposalSchema);
