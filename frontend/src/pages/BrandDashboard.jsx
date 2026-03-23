import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import CampaignManager from './CampaignManager';
const BrandDashboard = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ companyName: '', industry: '', website: '' });
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http:
        setProfile(res.data);
        setFormData({
          companyName: res.data.companyName || '',
          industry: res.data.industry || '',
          website: res.data.website || ''
        });
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
      alert('Company details updated!');
    } catch (err) {
      alert('Update failed');
    }
  };
  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '2rem' }}>
      <h1>Brand Dashboard</h1>
      <div className="auth-wrapper" style={{ maxWidth: '100%', marginTop: '2rem' }}>
        <h2>Company Details</h2>
        {!isEditing ? (
          <div>
            <p style={{ margin: '0.5rem 0' }}><strong>Company Name:</strong> {profile.companyName || 'Not set'}</p>
            <p style={{ margin: '0.5rem 0' }}><strong>Industry:</strong> {profile.industry || 'Not set'}</p>
            <p style={{ margin: '0.5rem 0' }}><strong>Website:</strong> {profile.website || 'Not set'}</p>
            <button onClick={() => setIsEditing(true)} style={{ marginTop: '1rem', width: 'auto' }}>Edit Details</button>
          </div>
        ) : (
          <form onSubmit={handleUpdate}>
            <div className="form-group">
              <label>Company Name</label>
              <input type="text" value={formData.companyName} onChange={e => setFormData({...formData, companyName: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Industry</label>
              <input type="text" value={formData.industry} onChange={e => setFormData({...formData, industry: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Website</label>
              <input type="text" value={formData.website} onChange={e => setFormData({...formData, website: e.target.value})} />
            </div>
            <button type="submit">Save Changes</button>
            <button type="button" onClick={() => setIsEditing(false)} style={{ background: '
          </form>
        )}
      </div>
      <CampaignManager />
    </div>
  );
};
export default BrandDashboard;
