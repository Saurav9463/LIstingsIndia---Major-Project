import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Listings API
export const listingsAPI = {
  getAll: () => api.get('/api/listings'),
  getById: (id) => api.get(`/api/listings/${id}`),
  create: (formData) => api.post('/api/listings', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  update: (id, formData) => api.put(`/api/listings/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  delete: (id) => api.delete(`/api/listings/${id}`),
};

// Reviews API
export const reviewsAPI = {
  create: (listingId, reviewData) => api.post(`/api/listings/${listingId}/reviews`, reviewData),
  delete: (listingId, reviewId) => api.delete(`/api/listings/${listingId}/reviews/${reviewId}`),
};
// Favorites API
export const favoritesAPI = {
  getAll: () => api.get('/api/favorites'),
  add: (listingId) => api.post(`/api/favorites/${listingId}`),
  remove: (listingId) => api.delete(`/api/favorites/${listingId}`),
  check: (listingId) => api.get(`/api/favorites/check/${listingId}`),
};
// Bookings API
export const bookingsAPI = {
  getAll: () => api.get('/api/bookings'),
  getById: (id) => api.get(`/api/bookings/${id}`),
  create: (bookingData) => api.post('/api/bookings', bookingData),
  cancel: (id) => api.delete(`/api/bookings/${id}`),
};

// Auth API
export const authAPI = {
  signup: (userData) => api.post('/api/signup', userData),
  login: (credentials) => api.post('/api/login', credentials),
  logout: () => api.get('/api/logout'),
  getCurrentUser: () => api.get('/api/current-user'),
};

export default api;