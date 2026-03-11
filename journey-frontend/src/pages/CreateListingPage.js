import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createListing } from '../api';
import { useAuth } from '../context/AuthContext';
import '../styles/CreateListingPage.css';

export default function CreateListingPage() {
  const [form, setForm] = useState({ title: '', location: '', imageUrl: '', description: '', price: '' });
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) return <p className="create-not-auth">Please log in to create a listing.</p>;

  const handleSubmit = async () => {
    if (!form.title || !form.location || !form.imageUrl || !form.description) {
      setError('Please fill in all required fields.');
      return;
    }
    try {
      await createListing(form);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  return (
    <div className="create-page">
      <h2 className="create-title">Create a Listing</h2>
      <p className="create-sub">Share a unique travel experience with the world</p>
      {error && <p className="create-error">{error}</p>}
      <div className="form-group">
        <label>Experience Title *</label>
        <input placeholder="e.g. Sunset Boat Tour" value={form.title} onChange={update('title')} />
      </div>
      <div className="form-group">
        <label>Location *</label>
        <input placeholder="e.g. Bali, Indonesia" value={form.location} onChange={update('location')} />
      </div>
      <div className="form-group">
        <label>Image URL *</label>
        <input placeholder="https://..." value={form.imageUrl} onChange={update('imageUrl')} />
      </div>
      <div className="form-group">
        <label>Description *</label>
        <textarea rows="4" placeholder="Describe the experience..." value={form.description} onChange={update('description')} />
      </div>
      <div className="form-group">
        <label>Price (optional)</label>
        <input placeholder="e.g. $45" value={form.price} onChange={update('price')} />
      </div>
      <button className="create-btn" onClick={handleSubmit}>Publish Listing</button>
    </div>
  );
}