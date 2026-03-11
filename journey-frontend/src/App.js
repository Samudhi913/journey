import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import FeedPage from './pages/FeedPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreateListingPage from './pages/CreateListingPage';
import ListingDetailPage from './pages/ListingDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"        element={<FeedPage />} />
        <Route path="/login"   element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/create"  element={<CreateListingPage />} />
        <Route path="/listing/:id" element={<ListingDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;