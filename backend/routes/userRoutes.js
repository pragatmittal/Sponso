import express from 'express';
import { getProfile, updateProfile, getCreators } from '../controllers/userController.js';
import passport from 'passport';
const router = express.Router();
router.get('/profile', passport.authenticate('jwt', { session: false }), getProfile);
router.put('/profile', passport.authenticate('jwt', { session: false }), updateProfile);
router.get('/creators', getCreators);
export default router;
