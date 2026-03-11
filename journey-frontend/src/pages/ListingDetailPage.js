import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getListing, deleteListing } from '../api';
import { useAuth } from '../context/AuthContext';
import '../styles/ListingDetailPage.css';

export default function ListingDetailPage() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getListing(id).then(res => setListing(res.data));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this listing?')) return;
    try {
      await deleteListing(id);
      navigate('/');
    } catch (err) {
      alert('Failed to delete listing');
    }
  };

  if (!listing) return <p className="detail-loading">Loading...</p>;

  const isOwner = user && user.id === listing.createdBy?._id;

  return (
    <div className="detail-page">
      <button className="detail-back" onClick={() => navigate('/')}>← Back to Feed</button>
      <img
        src={listing.imageUrl}
        alt={listing.title}
        className="detail-img"
        onError={e => e.target.src='https://placehold.co/800x380/1e3a5f/white?text=No+Image'}
      />
      <div className="detail-header">
        <div>
          <h1 className="detail-title">{listing.title}</h1>
          <p className="detail-location">📍 {listing.location}</p>
        </div>
        {isOwner && (
          <div className="detail-actions">
            <button className="btn-edit" onClick={() => navigate(`/edit/${listing._id}`)}>Edit</button>
            <button className="btn-delete" onClick={handleDelete}>Delete</button>
          </div>
        )}
      </div>
      {listing.price && <p className="detail-price">💰 {listing.price}</p>}
      <p className="detail-desc">{listing.description}</p>
      <div className="detail-meta">
        <span>👤 Posted by {listing.createdBy?.username}</span>
        <span>🕒 {new Date(listing.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
}