import React from 'react';
import { Container, Typography, Button, Box, Grid } from '@mui/material';

const HeroSection: React.FC = () => {
  return (
    <Box sx={{ backgroundColor: '#f5f5f5', py: 8 }}>
      <Container maxWidth="md">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
              Welcome to TradeGeek
            </Typography>
            <Typography variant="h5" paragraph sx={{ color: '#666' }}>
              Real-time stock data and market analysis at your fingertips.
            </Typography>
            <Box>
              <Button variant="contained" color="primary" size="large" sx={{ mr: 2, px: 4 }}>
                Get Started
              </Button>
              <Button variant="outlined" color="primary" size="large" sx={{ px: 4 }}>
                Learn More
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="https://upstox.com/app/themes/upstox/dist/img/pro/promobile/analyse-markets.png"
              alt="Stock market illustration"
              sx={{ width: '100%', borderRadius: 2 }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;
