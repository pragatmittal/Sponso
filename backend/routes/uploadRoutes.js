import express from 'express';
import multer from 'multer';
import cloudinary from '../utils/cloudinary.js';
import passport from 'passport';
import fs from 'fs';
const router = express.Router();
const upload = multer({ dest: 'uploads/' });
router.post('/', passport.authenticate('jwt', { session: false }), upload.single('media'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'sponso_uploads'
    });
    fs.unlinkSync(req.file.path);
    res.status(200).json({ url: result.secure_url, public_id: result.public_id });
  } catch (err) {
    res.status(500).json({ message: 'Image upload failed', error: err.message });
  }
});
export default router;
