import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css'
import planeIcon from '../assets/plane.png';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo"><img src={planeIcon} alt="plane" className="plane-icon" />Journey </Link>
      <div className="navbar-links">
        {user ? (
          <>
            <span className="navbar-greeting">Hi, {user.username}</span>
            <Link to="/create"><button className="btn-primary">+ New Listing</button></Link>
            <button className="btn-ghost" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login"><button className="btn-ghost">Login</button></Link>
            <Link to="/register"><button className="btn-primary">Sign Up</button></Link>
          </>
        )}
      </div>
    </nav>
  );
}