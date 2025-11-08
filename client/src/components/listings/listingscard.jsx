import { Card, CardMedia, CardContent, Typography, Box, IconButton } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../../context/Favorite';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';

const ListingCard = ({ listing, showTax, calculatePrice }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const [isHovered, setIsHovered] = useState(false);
  
  const isFav = isFavorite(listing._id);
  const displayPrice = calculatePrice ? calculatePrice(listing.price) : listing.price?.toLocaleString('en-IN') || '0';

  const handleCardClick = () => {
    navigate(`/listings/${listing._id}`);
  };

  const handleFavoriteClick = async (e) => {
    e.stopPropagation();
    
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (isFav) {
      await removeFromFavorites(listing._id);
    } else {
      await addToFavorites(listing._id);
    }
  };

  return (
    <Card
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        cursor: 'pointer',
        border: 'none',
        boxShadow: 'none',
        position: 'relative',
        '&:hover .listing-image': {
          transform: 'scale(1.05)',
        }
      }}
    >
      {/* Heart Icon Button */}
      <IconButton
        onClick={handleFavoriteClick}
        sx={{
          position: 'absolute',
          top: 12,
          right: 12,
          zIndex: 2,
          bgcolor: 'rgba(255, 255, 255, 0.9)',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          width: 32,
          height: 32,
          '&:hover': {
            bgcolor: 'white',
            transform: 'scale(1.1)',
          },
          transition: 'all 0.2s'
        }}
      >
        {isFav ? (
          <Favorite sx={{ color: '#fe424d', fontSize: 20 }} />
        ) : (
          <FavoriteBorder sx={{ color: '#222', fontSize: 20 }} />
        )}
      </IconButton>

      {/* Image */}
      <Box sx={{ position: 'relative', width: '100%', paddingTop: '100%', overflow: 'hidden', borderRadius: 2 }}>
        <CardMedia
          component="img"
          image={listing.image?.url || 'https://via.placeholder.com/400'}
          alt={listing.title}
          className="listing-image"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease'
          }}
        />
      </Box>
      
      {/* Card Content */}
      <CardContent sx={{ p: '12px 0', '&:last-child': { pb: '12px' } }}>
        <Typography 
          variant="subtitle1" 
          sx={{ 
            fontWeight: 600,
            fontSize: '15px',
            lineHeight: 1.3,
            mb: '4px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {listing.title}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '14px', mb: '4px' }}>
          {listing.location}, {listing.country}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
          <Typography variant="body1" sx={{ fontWeight: 600, fontSize: '15px' }}>
            ₹{displayPrice}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '14px' }}>
            / night
          </Typography>
        </Box>
        
        {showTax && (
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '12px', display: 'block', mt: '2px' }}>
            +18% GST
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default ListingCard;