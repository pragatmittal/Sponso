import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import passport from 'passport';
import './utils/passport.js';
import authRoutes from './routes/authRoutes.js';
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
const PORT = process.env.PORT || 5001;
app.get('/', (req, res) => {
  res.send('Brand Deal Marketplace API is running...');
});
import campaignRoutes from './routes/campaignRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import userRoutes from './routes/userRoutes.js';
import proposalRoutes from './routes/proposalRoutes.js';
app.use('/api/auth', authRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/users', userRoutes);
app.use('/api/proposals', proposalRoutes);
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
    console.warn('Please update your MONGO_URI in the .env file!');
  });
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
