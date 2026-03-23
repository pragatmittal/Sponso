import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
const CampaignBrowser = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const [proposingTo, setProposingTo] = useState(null);
  const [bidData, setBidData] = useState({ coverLetter: '', bidAmount: '' });
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http:
        setCampaigns(res.data);
      } catch (err) {
        console.error('Failed to load campaigns:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCampaigns();
  }, []);
  const submitProposal = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL || 'http:
        campaignId: proposingTo._id,
        ...bidData
      });
      alert('Proposal submitted successfully!');
      setProposingTo(null);
      setBidData({ coverLetter: '', bidAmount: '' });
    } catch(err) {
      alert('Failed to submit proposal: ' + (err.response?.data?.message || err.message));
    }
  };
  return (
    <div style={{ marginTop: '3rem' }}>
      <h2 style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>Available Campaigns</h2>
      {proposingTo && (
        <div className="auth-wrapper" style={{ marginTop: '1.5rem', maxWidth: '100%', animation: 'slideUp 0.3s ease-out' }}>
          <h3>Submit Proposal to: {proposingTo.title}</h3>
          <form onSubmit={submitProposal} style={{ marginTop: '1rem' }}>
            <div className="form-group">
              <label>Cover Letter</label>
              <textarea placeholder="Why are you a good fit for this deal?" value={bidData.coverLetter} onChange={e => setBidData({...bidData, coverLetter: e.target.value})} required style={{ width: '100%', minHeight: '120px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '0.8rem', borderRadius: '8px', fontSize: '0.95rem' }} />
            </div>
            <div className="form-group">
              <label>Bid Amount ($)</label>
              <input type="number" placeholder={`Campaign Budget: $${proposingTo.budget}`} value={bidData.bidAmount} onChange={e => setBidData({...bidData, bidAmount: e.target.value})} required />
            </div>
            <button type="submit">Submit Proposal</button>
            <button type="button" onClick={() => setProposingTo(null)} style={{ background: '
          </form>
        </div>
      )}
      {loading ? <p style={{ marginTop: '1rem' }}>Loading campaigns...</p> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
          {campaigns.length === 0 ? <p>No open campaigns right now.</p> : campaigns.map(camp => (
            <div key={camp._id} className="auth-wrapper" style={{ padding: '1.5rem', animation: 'none', maxWidth: '100%', display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ marginBottom: '0.5rem', fontSize: '1.3rem' }}>{camp.title}</h3>
              <p style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '1.1rem' }}>Budget: ${camp.budget}</p>
              <p style={{ margin: '1rem 0', fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>{camp.description}</p>
              <button onClick={() => setProposingTo(camp)} style={{ padding: '0.8rem', marginTop: 'auto' }}>Submit Proposal</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default CampaignBrowser;
