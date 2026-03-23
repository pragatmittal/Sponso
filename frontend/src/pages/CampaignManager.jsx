import React, { useState, useEffect } from 'react';
import axios from 'axios';
const CampaignManager = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', budget: '', requirements: '' });
  const [viewingProposalsFor, setViewingProposalsFor] = useState(null);
  const [proposals, setProposals] = useState([]);
  const fetchMyCampaigns = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http:
      setCampaigns(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMyCampaigns();
  }, []);
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL || 'http:
      setIsCreating(false);
      setFormData({ title: '', description: '', budget: '', requirements: '' });
      fetchMyCampaigns();
      alert('Campaign created successfully!');
    } catch(err) {
      alert('Creation failed.');
    }
  };
  const viewProposals = async (campaign) => {
    setViewingProposalsFor(campaign);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http:
      setProposals(res.data);
    } catch(err) {
      alert('Failed to load proposals');
    }
  };
  const updateProposalStatus = async (proposalId, status) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL || 'http:
      viewProposals(viewingProposalsFor);
    } catch(err) {
      alert('Failed to update status');
    }
  };
  return (
    <div style={{ marginTop: '3rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
        <h2>Manage Campaigns</h2>
        <button onClick={() => setIsCreating(!isCreating)} style={{ width: 'auto', margin: 0, padding: '0.6rem 1.2rem' }}>
          {isCreating ? 'Cancel' : 'Post New Campaign'}
        </button>
      </div>
      {isCreating && (
        <div className="auth-wrapper" style={{ marginTop: '1.5rem', maxWidth: '100%', animation: 'slideUp 0.3s ease-out' }}>
          <h3>Create Campaign</h3>
          <form onSubmit={handleCreate} style={{ marginTop: '1rem' }}>
            <div className="form-group">
              <input type="text" placeholder="Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
            </div>
            <div className="form-group">
              <input type="text" placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required />
            </div>
            <div className="form-group">
              <input type="number" placeholder="Budget ($)" value={formData.budget} onChange={e => setFormData({...formData, budget: e.target.value})} required />
            </div>
            <button type="submit">Publish Campaign</button>
          </form>
        </div>
      )}
      {viewingProposalsFor && (
        <div className="auth-wrapper" style={{ marginTop: '1.5rem', maxWidth: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>Bids for: {viewingProposalsFor.title}</h3>
            <button onClick={() => setViewingProposalsFor(null)} style={{ width: 'auto', background: '
          </div>
          <div style={{ marginTop: '1.5rem' }}>
            {proposals.length === 0 ? <p>No proposals yet.</p> : proposals.map(prop => (
              <div key={prop._id} style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', marginBottom: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <h4>{prop.creator?.name}</h4>
                  <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>Bid: ${prop.bidAmount}</span>
                </div>
                <p style={{ margin: '0.8rem 0', color: 'var(--text-muted)', fontSize: '0.9rem', whiteSpace: 'pre-wrap' }}>{prop.coverLetter}</p>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '1rem' }}>
                  <span style={{ fontSize: '0.85rem', padding: '0.3rem 0.6rem', borderRadius: '4px', background: prop.status === 'accepted' ? '
                    {prop.status.toUpperCase()}
                  </span>
                  {prop.status === 'pending' && (
                    <>
                      <button onClick={() => updateProposalStatus(prop._id, 'accepted')} style={{ width: 'auto', padding: '0.4rem 1rem', background: '
                      <button onClick={() => updateProposalStatus(prop._id, 'rejected')} style={{ width: 'auto', padding: '0.4rem 1rem', background: '
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {loading ? <p style={{ marginTop: '1rem' }}>Loading...</p> : (
        <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {campaigns.map(camp => (
            <div key={camp._id} className="auth-wrapper" style={{ padding: '1.5rem', animation: 'none', maxWidth: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.3rem' }}>{camp.title}</h4>
                <p style={{ color: 'var(--text-muted)' }}>{camp.status.toUpperCase()}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <span style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '1.2rem' }}>${camp.budget}</span>
                <button onClick={() => viewProposals(camp)} style={{ width: 'auto', margin: 0, padding: '0.6rem 1.2rem' }}>View Bids</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default CampaignManager;
