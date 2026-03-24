import User from '../models/User.js';
import Campaign from '../models/Campaign.js';
import Proposal from '../models/Proposal.js';

export const getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalCampaigns = await Campaign.countDocuments();
    const totalProposals = await Proposal.countDocuments();
    const acceptedDeals = await Proposal.countDocuments({ status: 'accepted' });

    res.status(200).json({ totalUsers, totalCampaigns, totalProposals, acceptedDeals });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const verifyUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, { isVerified: true }, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User verified', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteCampaignAdmin = async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndDelete(req.params.campaignId);
    if (!campaign) return res.status(404).json({ message: 'Campaign not found' });
    res.status(200).json({ message: 'Campaign removed by admin' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find().populate('brand', 'name');
    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
