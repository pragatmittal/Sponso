import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import CampaignBrowser from './CampaignBrowser';
const CreatorDashboard = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ niche: '', platforms: [], portfolio: [] });
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http:
        setProfile(res.data);
        setFormData({ niche: res.data.niche || '', platforms: res.data.platforms || [], portfolio: res.data.portfolio || [] });
      } catch (err) {
        console.error('Failed to load profile');
      }
    };
    fetchProfile();
  }, []);
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${import.meta.env.VITE_API_URL || 'http:
      setProfile(res.data);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (err) {
      alert('Update failed');
    }
  };
  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '2rem' }}>
      <h1>Creator Dashboard</h1>
      <div className="auth-wrapper" style={{ maxWidth: '100%', marginTop: '2rem' }}>
        <h2>Profile Details</h2>
        {!isEditing ? (
          <div>
            <p style={{ margin: '0.5rem 0' }}><strong>Niche:</strong> {profile.niche || 'Not set'}</p>
            <p style={{ margin: '0.5rem 0' }}><strong>Platforms:</strong> {profile.platforms?.length ? profile.platforms.map(p => p.name).join(', ') : 'None'}</p>
            <button onClick={() => setIsEditing(true)} style={{ marginTop: '1rem', width: 'auto' }}>Edit Profile</button>
          </div>
        ) : (
          <form onSubmit={handleUpdate}>
            <div className="form-group">
              <label>Niche</label>
              <input type="text" value={formData.niche} onChange={e => setFormData({...formData, niche: e.target.value})} placeholder="e.g. Gaming, Tech, Beauty" />
            </div>
            <div className="form-group">
              <p style={{ fontSize: '0.8rem', color: 'gray' }}>Platform & Portfolio editing is available via API. Full UI coming soon.</p>
            </div>
            <button type="submit">Save Changes</button>
            <button type="button" onClick={() => setIsEditing(false)} style={{ background: '
          </form>
        )}
      </div>
      <CampaignBrowser />
    </div>
  );
};
export default CreatorDashboard;
