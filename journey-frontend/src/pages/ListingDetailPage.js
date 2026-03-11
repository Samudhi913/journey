import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getListing } from '../api';
import '../styles/ListingDetailPage.css';

export default function ListingDetailPage() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getListing(id).then(res => setListing(res.data));
  }, [id]);

  if (!listing) return <p className="detail-loading">Loading...</p>;

  return (
    <div className="detail-page">
      <button className="detail-back" onClick={() => navigate('/')}>← Back to Feed</button>
      <img
        src={listing.imageUrl}
        alt={listing.title}
        className="detail-img"
        onError={e => e.target.src='https://placehold.co/800x380/1e3a5f/white?text=No+Image'}
      />
      <h1 className="detail-title">{listing.title}</h1>
      <p className="detail-location">📍 {listing.location}</p>
      {listing.price && <p className="detail-price">💰 {listing.price}</p>}
      <p className="detail-desc">{listing.description}</p>
      <div className="detail-meta">
        <span>Posted by {listing.createdBy?.username}</span>
        <span>{new Date(listing.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
}