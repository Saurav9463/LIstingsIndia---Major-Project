import { useState } from 'react';
import { 
  Box, Typography, TextField, Button, Card, CardContent, 
  Rating, Alert, IconButton 
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { reviewsAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const ReviewSection = ({ listingId, reviews, onReviewAdded }) => {
  const { user, isAuthenticated } = useAuth();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating || !comment.trim()) {
      setError('Please provide both rating and comment');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await reviewsAPI.create(listingId, { review: { rating, comment } });
      setRating(0);
      setComment('');
      onReviewAdded();
    } catch (err) {
      setError('Failed to submit review');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (reviewId) => {
    if (window.confirm('Delete this review?')) {
      try {
        await reviewsAPI.delete(listingId, reviewId);
        onReviewAdded();
      } catch (err) {
        alert('Failed to delete review');
      }
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
        Reviews
      </Typography>

      {isAuthenticated && (
        <Card sx={{ mb: 4, bgcolor: '#f9f9f9' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Leave a Review
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <Box component="form" onSubmit={handleSubmit}>
              <Box sx={{ mb: 2 }}>
                <Typography component="legend" sx={{ mb: 1 }}>Rating</Typography>
                <Rating
                  value={rating}
                  onChange={(e, newValue) => setRating(newValue)}
                  size="large"
                />
              </Box>

              <TextField
                fullWidth
                multiline
                rows={4}
                label="Comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                sx={{ mb: 2 }}
              />

              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{ bgcolor: '#fe424d', '&:hover': { bgcolor: '#e03941' } }}
              >
                {loading ? 'Submitting...' : 'Submit Review'}
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}

      {!isAuthenticated && (
        <Alert severity="info" sx={{ mb: 4 }}>
          Please log in to leave a review
        </Alert>
      )}

      <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
        All Reviews ({reviews.length})
      </Typography>

      {reviews.length === 0 ? (
        <Typography color="text.secondary">No reviews yet. Be the first to review!</Typography>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {reviews.map((review) => (
            <Card key={review._id} variant="outlined">
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      @{review.author?.username || 'Anonymous'}
                    </Typography>
                    <Rating value={review.rating} readOnly size="small" />
                  </Box>
                  
                  {user && review.author?._id === user._id && (
                    <IconButton 
                      size="small" 
                      color="error"
                      onClick={() => handleDelete(review._id)}
                    >
                      <Delete />
                    </IconButton>
                  )}
                </Box>
                
                <Typography variant="body2" color="text.secondary">
                  {review.comment}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ReviewSection;