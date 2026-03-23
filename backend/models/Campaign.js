import mongoose from 'mongoose';
const campaignSchema = new mongoose.Schema({
  brand: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  requirements: { type: String },
  budget: { type: Number },
  status: { type: String, enum: ['open', 'closed', 'in-progress'], default: 'open' },
  platforms: [{ type: String }],
  media: [{ type: String }]
}, { timestamps: true });
export default mongoose.model('Campaign', campaignSchema);
