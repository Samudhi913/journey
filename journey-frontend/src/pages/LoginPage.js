import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../api';
import { useAuth } from '../context/AuthContext';
import '../styles/RegisterPage.css';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await loginUser(form);
      login(res.data.user, res.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-sub">Log in to share your travel experiences</p>
        {error && <p className="auth-error">{error}</p>}
        <div className="form-group">
          <label>Email</label>
          <input placeholder="you@email.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" placeholder="••••••••" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
        </div>
        <button className="auth-btn" onClick={handleSubmit}>Login</button>
        <p className="auth-bottom">Don't have an account? <Link to="/register">Sign Up</Link></p>
      </div>
    </div>
  );
}