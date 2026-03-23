import User from '../models/User.js';
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
export const updateProfile = async (req, res) => {
  try {
    const { password, role, email, ...updateData } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('-password');
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
export const getCreators = async (req, res) => {
  try {
    const creators = await User.find({ role: 'creator' }).select('-password -email');
    res.status(200).json(creators);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
