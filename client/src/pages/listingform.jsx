import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Container, Paper, TextField, Button, Typography, Box, 
  Alert, CircularProgress 
} from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import { listingsAPI } from '../services/api';

const ListingForm = ({ isEdit = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    country: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (isEdit && id) {
      fetchListing();
    }
  }, [isEdit, id]);

  const fetchListing = async () => {
    try {
      const { data } = await listingsAPI.getById(id);
      setFormData({
        title: data.title,
        description: data.description,
        price: data.price,
        location: data.location,
        country: data.country,
      });
      setImagePreview(data.image?.url || '');
    } catch (err) {
      setError('Failed to load listing');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = new FormData();
      data.append('listing[title]', formData.title);
      data.append('listing[description]', formData.description);
      data.append('listing[price]', formData.price);
      data.append('listing[location]', formData.location);
      data.append('listing[country]', formData.country);
      
      if (imageFile) {
        data.append('listing[image]', imageFile);
      }

      if (isEdit) {
        await listingsAPI.update(id, data);
      } else {
        await listingsAPI.create(data);
      }

      navigate(isEdit ? `/listings/${id}` : '/listings');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save listing');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
          {isEdit ? 'Edit Listing' : 'Create New Listing'}
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={4}
            required
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Price (per night)"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />

          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              fullWidth
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />

            <TextField
              fullWidth
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </Box>

          {imagePreview && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {isEdit ? 'Current Image:' : 'Image Preview:'}
              </Typography>
              <img 
                src={imagePreview} 
                alt="Preview" 
                style={{ maxWidth: '100%', maxHeight: 300, borderRadius: 8 }} 
              />
            </Box>
          )}

          <Button
            variant="outlined"
            component="label"
            startIcon={<CloudUpload />}
            sx={{ mb: 3 }}
          >
            {isEdit ? 'Change Image' : 'Upload Image'}
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageChange}
              required={!isEdit}
            />
          </Button>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ bgcolor: '#fe424d', '&:hover': { bgcolor: '#e03941' } }}
            >
              {loading ? <CircularProgress size={24} /> : isEdit ? 'Update' : 'Create'}
            </Button>

            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ListingForm;