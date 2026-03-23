import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('creator');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password, role);
      navigate('/');
    } catch (err) {
      alert('Signup failed. Please try again.');
    }
  };
  return (
    <div className="auth-wrapper">
      <h2>Create Account</h2>
      <p className="subtitle">Join Sponso and connect with brands</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="form-group">
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="creator">Creator</option>
            <option value="brand">Brand</option>
          </select>
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <div className="auth-footer">
        Already have an account? <Link to="/login">Log in</Link>
      </div>
    </div>
  );
};
export default Signup;
