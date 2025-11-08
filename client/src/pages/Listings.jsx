import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Grid, Typography, CircularProgress, Box, Alert } from '@mui/material';
import ListingCard from '../components/listings/listingscard';
import FilterBar from '../components/listings/FilterBar';
import { listingsAPI } from '../services/api';

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState(null);
  const [showTax, setShowTax] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    fetchListings();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [listings, activeFilter, searchParams]);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const { data } = await listingsAPI.getAll();
      setListings(data);
      setError(null);
    } catch (err) {
      setError('Failed to load listings. Please try again.');
      console.error('Error fetching listings:', err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...listings];
    
    // Search filter
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(listing => 
        listing.title.toLowerCase().includes(query) ||
        listing.location.toLowerCase().includes(query) ||
        listing.country.toLowerCase().includes(query) ||
        listing.description?.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (activeFilter) {
      // You can add category field to your listings or filter by title/description
      // For now, we'll filter by keywords in title/description
      const filterKeywords = {
        trending: ['beach', 'popular', 'villa'],
        rooms: ['room', 'hotel', 'suite'],
        cities: ['city', 'downtown', 'urban'],
        mountains: ['mountain', 'cabin', 'retreat'],
        castles: ['castle', 'historic', 'villa'],
        pools: ['pool', 'swimming'],
        camping: ['camping', 'tent', 'outdoor'],
        farms: ['farm', 'rural', 'countryside'],
        arctic: ['arctic', 'snow', 'winter'],
        domes: ['dome', 'unique'],
        boats: ['boat', 'yacht', 'ship']
      };

      const keywords = filterKeywords[activeFilter];
      if (keywords) {
        filtered = filtered.filter(listing => 
          keywords.some(keyword => 
            listing.title.toLowerCase().includes(keyword) ||
            listing.description?.toLowerCase().includes(keyword)
          )
        );
      }
    }

    setFilteredListings(filtered);
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const handleTaxToggle = (show) => {
    setShowTax(show);
  };

  const calculatePrice = (price) => {
    if (!price) return '0';
    const total = showTax ? price * 1.18 : price;
    return total.toLocaleString('en-IN');
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress sx={{ color: '#fe424d' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  const searchQuery = searchParams.get('search');

  return (
    <>
      <FilterBar 
        onFilterChange={handleFilterChange}
        onTaxToggle={handleTaxToggle}
        activeFilter={activeFilter}
      />
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {searchQuery && (
          <Typography variant="h6" sx={{ mb: 2 }}>
            Search results for: <strong>"{searchQuery}"</strong> ({filteredListings.length} found)
          </Typography>
        )}
        
        {filteredListings.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h5" color="text.secondary">
              {searchQuery ? 'No listings found for your search' : 'No listings found'}
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
  {filteredListings.map((listing) => (
    <Box key={listing._id}>
      <ListingCard listing={listing} showTax={showTax} calculatePrice={calculatePrice} />
    </Box>
  ))}
</Box>
        )}
      </Container>
    </>
  );
};

export default Listings;