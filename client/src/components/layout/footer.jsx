import { Box, Container, Typography, Link, IconButton } from '@mui/material';
import { Facebook, Instagram, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#ebebeb',
        py: 3,
        mt: 'auto',
        borderTop: '1px solid #ddd'
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          {/* Social Icons */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <IconButton color="primary" aria-label="Facebook">
              <Facebook />
            </IconButton>
            <IconButton color="primary" aria-label="Instagram">
              <Instagram />
            </IconButton>
            <IconButton color="primary" aria-label="LinkedIn">
              <LinkedIn />
            </IconButton>
          </Box>

          {/* Copyright */}
          <Typography variant="body2" color="text.secondary">
            © ListingsIndia Private Limited
          </Typography>

          {/* Links */}
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link href="/privacy" color="inherit" underline="hover">
              Privacy
            </Link>
            <Link href="/terms" color="inherit" underline="hover">
              Terms
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;