import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getListing, updateListing } from '../api';
import { useAuth } from '../context/AuthContext';
import '../styles/CreateListingPage.css';

export default function EditListingPage() {
  const { id } = useParams();
  const [form, setForm] = useState({ title: '', location: '', imageUrl: '', description: '', price: '' });
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getListing(id).then(res => {
      const { title, location, imageUrl, description, price } = res.data;
      setForm({ title, location, imageUrl, description, price: price || '' });
    });
  }, [id]);

  if (!user) return <p className="create-not-auth">Please log in to edit a listing.</p>;

  const handleSubmit = async () => {
    if (!form.title || !form.location || !form.imageUrl || !form.description) {
      setError('Please fill in all required fields.');
      return;
    }
    try {
      await updateListing(id, form);
      navigate(`/listing/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  return (
    <div className="create-page">
      <h2 className="create-title">Edit Listing</h2>
      <p className="create-sub">Update your travel experience details</p>
      {error && <p className="create-error">{error}</p>}
      <div className="form-group">
        <label>Experience Title *</label>
        <input value={form.title} onChange={update('title')} />
      </div>
      <div className="form-group">
        <label>Location *</label>
        <input value={form.location} onChange={update('location')} />
      </div>
      <div className="form-group">
        <label>Image URL *</label>
        <input value={form.imageUrl} onChange={update('imageUrl')} />
      </div>
      <div className="form-group">
        <label>Description *</label>
        <textarea rows="4" value={form.description} onChange={update('description')} />
      </div>
      <div className="form-group">
        <label>Price (optional)</label>
        <input value={form.price} onChange={update('price')} />
      </div>
      <button className="create-btn" onClick={handleSubmit}>Save Changes</button>
    </div>
  );
}