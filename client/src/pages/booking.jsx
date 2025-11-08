import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Container, Typography, Box, Card, CardContent, CardMedia,
  CircularProgress, Alert, Button, Chip, Grid 
} from '@mui/material';
import { CalendarMonth, CheckCircle } from '@mui/icons-material';
import { bookingsAPI } from '../services/api';
import dayjs from 'dayjs';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const successMessage = location.state?.success;

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const { data } = await bookingsAPI.getAll();
      setBookings(data);
    } catch (err) {
      setError('Failed to load bookings');
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await bookingsAPI.cancel(bookingId);
        fetchBookings();
      } catch (err) {
        alert('Failed to cancel booking');
      }
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress sx={{ color: '#fe424d' }} />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
          <CalendarMonth sx={{ fontSize: 32, color: '#fe424d' }} />
          My Bookings
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {bookings.length} {bookings.length === 1 ? 'booking' : 'bookings'}
        </Typography>
      </Box>

      {/* Success Message */}
      {successMessage && (
        <Alert 
          severity="success" 
          icon={<CheckCircle />}
          sx={{ mb: 3 }}
          onClose={() => navigate('/bookings', { replace: true })}
        >
          Booking confirmed successfully! Your reservation has been made.
        </Alert>
      )}

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      {/* Bookings List */}
      {bookings.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <CalendarMonth sx={{ fontSize: 80, color: '#ddd', mb: 2 }} />
          <Typography variant="h5" color="text.secondary" sx={{ mb: 1 }}>
            No bookings yet
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Start exploring and book your dream stay!
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => navigate('/listings')}
            sx={{ bgcolor: '#fe424d', '&:hover': { bgcolor: '#e03941' } }}
          >
            Explore Listings
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {bookings.map((booking) => (
            <Grid item xs={12} key={booking._id}>
              <Card sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
                <CardMedia
                  component="img"
                  sx={{ width: { xs: '100%', sm: 200 }, height: { xs: 200, sm: 'auto' } }}
                  image={booking.listing?.image?.url || 'https://via.placeholder.com/200'}
                  alt={booking.listing?.title}
                />
                
                <CardContent sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                        {booking.listing?.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {booking.listing?.location}, {booking.listing?.country}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Chip 
                    label={booking.status}
                    color={booking.status === 'confirmed' ? 'success' : 'default'}
                    size="small"
                    sx={{ mt: 1, mb: 2 }}
                  />

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      <strong>Check-in:</strong> {dayjs(booking.checkIn).format('MMM DD, YYYY')}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      <strong>Check-out:</strong> {dayjs(booking.checkOut).format('MMM DD, YYYY')}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      <strong>Guests:</strong> {booking.guests} {booking.guests === 1 ? 'guest' : 'guests'}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Duration:</strong> {booking.nights} {booking.nights === 1 ? 'night' : 'nights'}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#fe424d' }}>
                      ₹{booking.totalPrice?.toLocaleString('en-IN')}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => navigate(`/listings/${booking.listing._id}`)}
                        sx={{ 
                          borderColor: '#fe424d', 
                          color: '#fe424d',
                          '&:hover': {
                            borderColor: '#e03941',
                            bgcolor: 'rgba(254, 66, 77, 0.04)'
                          }
                        }}
                      >
                        View Listing
                      </Button>
                      {booking.status === 'confirmed' && (
                        <Button 
                          size="small"
                          variant="outlined"
                          color="error"
                          onClick={() => handleCancel(booking._id)}
                          sx={{
                            '&:hover': {
                              bgcolor: 'rgba(211, 47, 47, 0.04)'
                            }
                          }}
                        >
                          Cancel
                        </Button>
                      )}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Bookings;