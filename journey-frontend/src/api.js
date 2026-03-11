import axios from 'axios';

const API = axios.create({ baseURL: 'https://journey-backend-fnop.onrender.com' });

// Automatically attach token to every request if logged in
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const registerUser  = (data) => API.post('/auth/register', data);
export const loginUser     = (data) => API.post('/auth/login', data);
export const getListings   = ()     => API.get('/listings');
export const getListing    = (id)   => API.get(`/listings/${id}`);
export const createListing = (data) => API.post('/listings', data);
export const deleteListing = (id) => API.delete(`/listings/${id}`);
export const updateListing = (id, data) => API.put(`/listings/${id}`, data);