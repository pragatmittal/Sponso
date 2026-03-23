import mongoose from 'mongoose';
const analyticsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ['profile_view', 'campaign_view', 'proposal_submitted'], required: true },
  metadata: { type: mongoose.Schema.Types.Mixed },
}, { timestamps: true });
export default mongoose.model('Analytics', analyticsSchema);
