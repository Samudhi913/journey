import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getListings } from '../api';
import '../styles/FeedPage.css';


function timeAgo(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function FeedPage() {
  const [listings, setListings] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getListings().then(res => setListings(res.data));
  }, []);

   const filtered = listings.filter(l =>
    l.title.toLowerCase().includes(search.toLowerCase()) ||
    l.location.toLowerCase().includes(search.toLowerCase()) ||
    l.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="feed-page">
      <div className="feed-header">
        
        <h1> Discover Worldwide Experiences</h1>
        <p>Find unique travel experiences from around the world</p>
      </div>

      <input
        className="search-input"
        placeholder="🔍 Search by title, location or description..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {listings.length === 0 ? (
        <p className="feed-empty">No listings yet. Be the first to share an experience!</p>
      ) : (
        <div className="feed-grid">
          {filtered.map(l => (
            <div key={l._id} className="card" onClick={() => navigate(`/listing/${l._id}`)}>
              <img
                src={l.imageUrl}
                alt={l.title}
                className="card-img"
                onError={e => e.target.src='https://placehold.co/400x200/1e3a5f/white?text=No+Image'}
              />
              <div className="card-body">
                <p className="card-title">{l.title}</p>
                <p className="card-location">📍 {l.location}</p>
                <p className="card-desc">{l.description.slice(0, 100)}{l.description.length > 100 ? '...' : ''}</p>
                <div className="card-footer">
                  <span>👤 {l.createdBy?.username}</span>
                  <span>{timeAgo(l.createdAt)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}