import { Container, Typography, Box, CircularProgress } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import ListingCard from '../components/listings/listingscard';
import { useFavorites } from '../context/Favorite';

const Favorites = () => {
  const { favorites, loading } = useFavorites();

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress sx={{ color: '#fe424d' }} />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Favorite sx={{ color: '#fe424d', fontSize: 32 }} />
          My Favorites
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {favorites.length} {favorites.length === 1 ? 'listing' : 'listings'} saved
        </Typography>
      </Box>

      {favorites.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Favorite sx={{ fontSize: 80, color: '#ddd', mb: 2 }} />
          <Typography variant="h5" color="text.secondary" sx={{ mb: 1 }}>
            No favorites yet
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Click the heart icon on listings to save your favorites
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)',
            },
            gap: 3,
            width: '100%'
          }}
        >
          {favorites.map((fav) => (
            <Box key={fav._id}>
              <ListingCard listing={fav.listing} />
            </Box>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default Favorites;