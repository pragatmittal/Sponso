import express from 'express';
import {
  createCampaign,
  getCampaigns,
  getCampaignById,
  updateCampaign,
  deleteCampaign
} from '../controllers/campaignController.js';
import passport from 'passport';
const router = express.Router();
router.get('/', getCampaigns);
router.get('/:id', getCampaignById);
router.post('/', passport.authenticate('jwt', { session: false }), createCampaign);
router.put('/:id', passport.authenticate('jwt', { session: false }), updateCampaign);
router.delete('/:id', passport.authenticate('jwt', { session: false }), deleteCampaign);
export default router;
