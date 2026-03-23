import Proposal from '../models/Proposal.js';
import Campaign from '../models/Campaign.js';
export const createProposal = async (req, res) => {
  try {
    if (req.user.role !== 'creator') {
      return res.status(403).json({ message: 'Only creators can submit proposals' });
    }
    const { campaignId, coverLetter, bidAmount } = req.body;
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) return res.status(404).json({ message: 'Campaign not found' });
    const proposal = new Proposal({
      campaign: campaignId,
      creator: req.user.id,
      coverLetter,
      bidAmount
    });
    await proposal.save();
    res.status(201).json(proposal);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
export const getProposalsByCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.campaignId);
    if (!campaign) return res.status(404).json({ message: 'Campaign not found' });
    if (campaign.brand.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view these proposals' });
    }
    const proposals = await Proposal.find({ campaign: req.params.campaignId }).populate('creator', 'name niche profilePicture');
    res.status(200).json(proposals);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
export const updateProposalStatus = async (req, res) => {
  try {
    const proposal = await Proposal.findById(req.params.id).populate('campaign');
    if (!proposal) return res.status(404).json({ message: 'Proposal not found' });
    if (proposal.campaign.brand.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    const { status } = req.body;
    if (!['pending', 'accepted', 'rejected', 'negotiating'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    proposal.status = status;
    await proposal.save();
    res.status(200).json(proposal);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
