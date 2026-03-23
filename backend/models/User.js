import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['creator', 'brand', 'admin'], required: true },
  profilePicture: { type: String, default: '' },
  niche: { type: String },
  platforms: [{ name: String, url: String, followers: Number }],
  portfolio: [{ title: String, url: String, imageUrl: String }],
  companyName: { type: String },
  industry: { type: String },
  website: { type: String },
  isVerified: { type: Boolean, default: false }
}, { timestamps: true });
export default mongoose.model('User', userSchema);
