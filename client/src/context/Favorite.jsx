import { createContext, useState, useContext, useEffect } from 'react';
import { favoritesAPI } from '../services/api';
import { useAuth } from './AuthContext';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchFavorites();
    } else {
      setFavorites([]);
    }
  }, [isAuthenticated]);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const { data } = await favoritesAPI.getAll();
      setFavorites(data);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = async (listingId) => {
    try {
      await favoritesAPI.add(listingId);
      await fetchFavorites();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Failed to add to favorites' };
    }
  };

  const removeFromFavorites = async (listingId) => {
    try {
      await favoritesAPI.remove(listingId);
      await fetchFavorites();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Failed to remove from favorites' };
    }
  };

  const isFavorite = (listingId) => {
    return favorites.some(fav => fav.listing._id === listingId);
  };

  const value = {
    favorites,
    loading,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    fetchFavorites
  };

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};