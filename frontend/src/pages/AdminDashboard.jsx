import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({ totalUsers: 0, totalCampaigns: 0, totalProposals: 0, acceptedDeals: 0 });
  const [users, setUsers] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAdminData = async () => {
    try {
      const authHeaders = axios.defaults.headers.common['Authorization'];
      const [statsRes, usersRes, campaignsRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/admin/stats`),
        axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/admin/users`),
        axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/admin/campaigns`)
      ]);
      setStats(statsRes.data);
      setUsers(usersRes.data);
      setCampaigns(campaignsRes.data);
    } catch (err) {
      console.error('Admin fetch error', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchAdminData();
    }
  }, [user]);

  const handleVerify = async (userId) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/admin/users/${userId}/verify`);
      fetchAdminData();
    } catch (err) {
      alert('Failed to verify user');
    }
  };

  const handleDeleteCampaign = async (campaignId) => {
    if (!window.confirm('Delete this campaign completely?')) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/admin/campaigns/${campaignId}`);
      fetchAdminData();
    } catch (err) {
      alert('Failed to delete campaign');
    }
  };

  if (!user || user.role !== 'admin') {
    return <div style={{ padding: '2rem', textAlign: 'center' }}><h2>Access Denied</h2><p>Admin privileges required.</p></div>;
  }

  if (loading) return <p style={{ padding: '2rem' }}>Loading Admin Panel...</p>;

  return (
    <div style={{ maxWidth: '1200px', margin: 'auto', padding: '2rem' }}>
      <h1>Admin Dashboard</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
        <div className="auth-wrapper" style={{ minHeight: '120px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', animation: 'fadeIn 0.5s ease-out' }}>
          <h3>Total Users</h3>
          <p style={{ fontSize: '2.5rem', margin: '0.5rem 0', fontWeight: 'bold', color: 'var(--primary)' }}>{stats.totalUsers}</p>
        </div>
        <div className="auth-wrapper" style={{ minHeight: '120px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', animation: 'fadeIn 0.6s ease-out' }}>
          <h3>Total Campaigns</h3>
          <p style={{ fontSize: '2.5rem', margin: '0.5rem 0', fontWeight: 'bold', color: 'var(--primary)' }}>{stats.totalCampaigns}</p>
        </div>
        <div className="auth-wrapper" style={{ minHeight: '120px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', animation: 'fadeIn 0.7s ease-out' }}>
          <h3>Total Proposals</h3>
          <p style={{ fontSize: '2.5rem', margin: '0.5rem 0', fontWeight: 'bold', color: 'var(--primary)' }}>{stats.totalProposals}</p>
        </div>
        <div className="auth-wrapper" style={{ minHeight: '120px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', animation: 'fadeIn 0.8s ease-out' }}>
          <h3>Deals Closed</h3>
          <p style={{ fontSize: '2.5rem', margin: '0.5rem 0', fontWeight: 'bold', color: '#22c55e' }}>{stats.acceptedDeals}</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '3rem' }}>
        <div className="auth-wrapper" style={{ maxWidth: '100%' }}>
          <h2>User Governance</h2>
          <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {users.map(u => (
              <div key={u._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
                <div>
                  <h4 style={{ margin: 0 }}>{u.name} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>({u.role})</span></h4>
                  <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.9rem' }}>{u.email}</p>
                </div>
                <div>
                  {u.isVerified ? (
                    <span style={{ color: '#22c55e', fontSize: '0.9rem', fontWeight: 'bold' }}>Verified Profile</span>
                  ) : (
                    <button onClick={() => handleVerify(u._id)} style={{ width: 'auto', padding: '0.4rem 0.8rem', margin: 0 }}>Verify</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="auth-wrapper" style={{ maxWidth: '100%' }}>
          <h2>Campaign Moderation</h2>
          <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {campaigns.map(c => (
              <div key={c._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
                <div>
                  <h4 style={{ margin: 0 }}>{c.title}</h4>
                  <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>By: {c.brand?.name || 'Unknown'}</p>
                </div>
                <button onClick={() => handleDeleteCampaign(c._id)} style={{ width: 'auto', padding: '0.4rem 0.8rem', margin: 0, background: '#ef4444' }}>Remove</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
