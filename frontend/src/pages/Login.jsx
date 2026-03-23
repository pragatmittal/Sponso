import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      alert('Login failed. Please check your credentials.');
    }
  };
  return (
    <div className="auth-wrapper">
      <h2>Welcome Back</h2>
      <p className="subtitle">Login to Sponso to continue</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Sign In</button>
      </form>
      <div className="auth-footer">
        Don't have an account? <Link to="/signup">Create one</Link>
      </div>
    </div>
  );
};
export default Login;
