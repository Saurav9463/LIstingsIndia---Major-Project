import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Box, TextField, InputAdornment, Badge } from '@mui/material';
import { Explore, Search, Add, Favorite, CalendarMonth } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { useFavorites } from '../../context/Favorite';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { favorites } = useFavorites();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/listings?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: 'white', color: 'black', boxShadow: 1 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
          <Explore sx={{ fontSize: 32, color: '#fe424d', mr: 1 }} />
          <Typography variant="h6" sx={{ fontWeight: 600, display: { xs: 'none', sm: 'block' } }}>
            ListingsIndia
          </Typography>
        </Link>

        {/* Search Bar */}
        <Box component="form" onSubmit={handleSearch} sx={{ flex: 1, maxWidth: 500, mx: 3 }}>
          <TextField
            size="small"
            fullWidth
            placeholder="Search destinations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
              sx: { borderRadius: 25 }
            }}
          />
        </Box>

        {/* Navigation Links */}
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Button component={Link} to="/listings" sx={{ color: 'black' }}>
            Explore
          </Button>

          {isAuthenticated ? (
            <>
              {/* Favorites Icon with Badge */}
              <IconButton 
                component={Link} 
                to="/favorites"
                sx={{ color: 'black' }}
                title="Favorites"
              >
                <Badge badgeContent={favorites.length} color="error">
                  <Favorite />
                </Badge>
              </IconButton>

              {/* My Trips Button */}
              <Button 
                component={Link} 
                to="/bookings"
                startIcon={<CalendarMonth />}
                sx={{ color: 'black', fontWeight: 600 }}
              >
                My Trips
              </Button>

              {/* Create Listing Button */}
              <Button 
                component={Link} 
                to="/listings/new" 
                startIcon={<Add />}
                sx={{ color: 'black', fontWeight: 600 }}
              >
                Create Listing
              </Button>

              {/* User Info */}
              <Typography sx={{ mx: 1, display: { xs: 'none', md: 'block' } }}>
                Hi, {user?.username}
              </Typography>

              {/* Logout Button */}
              <Button onClick={handleLogout} variant="outlined" sx={{ borderColor: '#fe424d', color: '#fe424d' }}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button component={Link} to="/signup" sx={{ color: 'black', fontWeight: 600 }}>
                Sign Up
              </Button>
              <Button component={Link} to="/login" variant="contained" sx={{ bgcolor: '#fe424d', '&:hover': { bgcolor: '#e03941' } }}>
                Login
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;