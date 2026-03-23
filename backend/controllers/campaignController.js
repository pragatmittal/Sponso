import Campaign from '../models/Campaign.js';
export const createCampaign = async (req, res) => {
  try {
    if (req.user.role !== 'brand') {
      return res.status(403).json({ message: 'Only brands can create campaigns' });
    }
    const newCampaign = new Campaign({
      ...req.body,
      brand: req.user.id
    });
    await newCampaign.save();
    res.status(201).json(newCampaign);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
export const getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find({ status: 'open' }).populate('brand', 'name companyName profilePicture');
    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
export const getCampaignById = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id).populate('brand', 'name companyName profilePicture');
    if (!campaign) return res.status(404).json({ message: 'Campaign not found' });
    res.status(200).json(campaign);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
export const updateCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).json({ message: 'Campaign not found' });
    if (campaign.brand.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this campaign' });
    }
    const updated = await Campaign.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
export const deleteCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).json({ message: 'Campaign not found' });
    if (campaign.brand.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this campaign' });
    }
    await Campaign.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Campaign deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
