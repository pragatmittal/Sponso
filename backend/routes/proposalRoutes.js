import express from 'express';
import {
  createProposal,
  getProposalsByCampaign,
  updateProposalStatus
} from '../controllers/proposalController.js';
import passport from 'passport';
const router = express.Router();
router.post('/', passport.authenticate('jwt', { session: false }), createProposal);
router.get('/campaign/:campaignId', passport.authenticate('jwt', { session: false }), getProposalsByCampaign);
router.put('/:id/status', passport.authenticate('jwt', { session: false }), updateProposalStatus);
export default router;
