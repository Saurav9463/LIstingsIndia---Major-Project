import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { AuthProvider, useAuth } from './context/AuthContext';
import { FavoritesProvider } from './context/Favorite';
import Navbar from './components/layout/navbar';
import Footer from './components/layout/Footer';
import Listings from './pages/Listings';
import ListingDetail from './pages/listingdetail';
import ListingForm from './pages/ListingForm';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Favorites from './pages/Favorites';
import Bookings from './pages/booking';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <FavoritesProvider>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <Box sx={{ flex: 1 }}>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Navigate to="/listings" />} />
                <Route path="/listings" element={<Listings />} />
                <Route path="/listings/:id" element={<ListingDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Protected Routes */}
                <Route 
                  path="/favorites" 
                  element={
                    <ProtectedRoute>
                      <Favorites />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/bookings" 
                  element={
                    <ProtectedRoute>
                      <Bookings />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/listings/new" 
                  element={
                    <ProtectedRoute>
                      <ListingForm />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/listings/:id/edit" 
                  element={
                    <ProtectedRoute>
                      <ListingForm isEdit={true} />
                    </ProtectedRoute>
                  } 
                />

                {/* 404 */}
                <Route path="*" element={<Navigate to="/listings" />} />
              </Routes>
            </Box>
            <Footer />
          </Box>
        </FavoritesProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;