import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, CardContent, Typography, Button, Box, TextField, 
  Divider, Alert, CircularProgress 
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { bookingsAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const BookingForm = ({ listing }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    return checkOut.diff(checkIn, 'day');
  };

  const calculateTotal = () => {
    const nights = calculateNights();
    if (nights <= 0) return 0;
    return listing.price * nights;
  };

  const nights = calculateNights();
  const totalPrice = calculateTotal();
  const serviceFee = totalPrice * 0.1; // 10% service fee
  const taxes = totalPrice * 0.18; // 18% GST
  const grandTotal = totalPrice + serviceFee + taxes;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!checkIn || !checkOut) {
      setError('Please select check-in and check-out dates');
      return;
    }

    if (nights <= 0) {
      setError('Check-out must be after check-in');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const bookingData = {
        listingId: listing._id,
        checkIn: checkIn.toISOString(),
        checkOut: checkOut.toISOString(),
        guests: parseInt(guests),
        totalPrice: grandTotal,
        nights
      };

      const { data } = await bookingsAPI.create(bookingData);
      
      // Navigate to bookings page with success message
      navigate('/bookings', { 
        state: { 
          success: true, 
          booking: data.booking 
        } 
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ position: 'sticky', top: 90, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        {/* Price Header */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            ₹{listing.price?.toLocaleString('en-IN')} 
            <Typography component="span" variant="body1" color="text.secondary">
              {' '}/ night
            </Typography>
          </Typography>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Box component="form" onSubmit={handleSubmit}>
          {/* Date Pickers */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ mb: 2 }}>
              <DatePicker
                label="Check-in"
                value={checkIn}
                onChange={setCheckIn}
                minDate={dayjs()}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    required: true
                  }
                }}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <DatePicker
                label="Check-out"
                value={checkOut}
                onChange={setCheckOut}
                minDate={checkIn ? checkIn.add(1, 'day') : dayjs().add(1, 'day')}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    required: true
                  }
                }}
              />
            </Box>
          </LocalizationProvider>

          {/* Guests */}
          <TextField
            fullWidth
            type="number"
            label="Guests"
            value={guests}
            onChange={(e) => setGuests(Math.max(1, parseInt(e.target.value) || 1))}
            inputProps={{ min: 1, max: 10 }}
            sx={{ mb: 2 }}
          />

          {/* Price Breakdown */}
          {nights > 0 && (
            <Box sx={{ mb: 2 }}>
              <Divider sx={{ mb: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">
                  ₹{listing.price?.toLocaleString('en-IN')} x {nights} nights
                </Typography>
                <Typography variant="body2">
                  ₹{totalPrice.toLocaleString('en-IN')}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Service fee (10%)</Typography>
                <Typography variant="body2">
                  ₹{serviceFee.toLocaleString('en-IN')}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body2">GST (18%)</Typography>
                <Typography variant="body2">
                  ₹{taxes.toLocaleString('en-IN')}
                </Typography>
              </Box>

              <Divider sx={{ mb: 2 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Total
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  ₹{grandTotal.toLocaleString('en-IN')}
                </Typography>
              </Box>
            </Box>
          )}

          {/* Reserve Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading || !checkIn || !checkOut || nights <= 0}
            sx={{
              bgcolor: '#fe424d',
              '&:hover': { bgcolor: '#e03941' },
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 600
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: 'white' }} />
            ) : (
              'Reserve'
            )}
          </Button>

          {!isAuthenticated && (
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', mt: 1 }}>
              You'll be redirected to login
            </Typography>
          )}

          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', mt: 2 }}>
            You won't be charged yet
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default BookingForm;