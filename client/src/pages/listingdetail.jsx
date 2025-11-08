import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, Card, CardMedia, CardContent, Typography, Button, 
  Box, CircularProgress, Alert, Divider, Grid 
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { listingsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import ReviewSection from '../components/reviews/ReviewSection';
import BookingForm from '../components/bookings/bookingform';

const ListingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchListing();
  }, [id]);

  const fetchListing = async () => {
    try {
      setLoading(true);
      const { data } = await listingsAPI.getById(id);
      console.log('Fetched listing:', data);
      console.log('Reviews:', data.review);
      setListing(data);
      setError(null);
    } catch (err) {
      setError('Failed to load listing details');
      console.error('Error fetching listing:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      try {
        await listingsAPI.delete(id);
        navigate('/listings');
      } catch (err) {
        alert('Failed to delete listing');
      }
    }
  };

  const isOwner = isAuthenticated && user && listing?.owner?._id === user._id;

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress sx={{ color: '#fe424d' }} />
      </Box>
    );
  }

  if (error || !listing) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">{error || 'Listing not found'}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Left Column - Listing Details */}
        <Grid item xs={12} md={7}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
            {listing.title}
          </Typography>

          <Card sx={{ mb: 3 }}>
            <CardMedia
              component="img"
              height="400"
              image={listing.image?.url || 'https://via.placeholder.com/800x400'}
              alt={listing.title}
              sx={{ objectFit: 'cover' }}
            />
            
            <CardContent>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                Owned by: <strong>{listing.owner?.username || 'Unknown'}</strong>
              </Typography>
              
              <Typography variant="body1" paragraph sx={{ my: 2 }}>
                {listing.description}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                📍 {listing.location}, {listing.country}
              </Typography>
            </CardContent>
          </Card>

          {isOwner && (
            <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
              <Button
                variant="contained"
                startIcon={<Edit />}
                onClick={() => navigate(`/listings/${id}/edit`)}
                sx={{ bgcolor: '#fe424d', '&:hover': { bgcolor: '#e03941' } }}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                startIcon={<Delete />}
                onClick={handleDelete}
                color="error"
              >
                Delete
              </Button>
            </Box>
          )}

          <Divider sx={{ my: 4 }} />

          <ReviewSection listingId={id} reviews={listing.review || []} onReviewAdded={fetchListing} />
        </Grid>

        {/* Right Column - Booking Form */}
        <Grid item xs={12} md={5}>
          <BookingForm listing={listing} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ListingDetail;