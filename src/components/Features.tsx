import React from 'react';
import { Container, Grid, Typography, Box, Card, CardContent } from '@mui/material';
import { Assessment, TrendingUp, Insights } from '@mui/icons-material';

interface Feature {
  icon: JSX.Element;
  title: string;
}

const features: Feature[] = [
  { icon: <Assessment fontSize="large" />, title: "Real-time Stock Data" },
  { icon: <TrendingUp fontSize="large" />, title: "Market Analysis" },
  { icon: <Insights fontSize="large" />, title: "Investment Tools" },
];

const Features: React.FC = () => {
  return (
    <Box>
      <Box sx={{ p: 8 }} minHeight={'40vh'}>
        <Container maxWidth="lg">
          <Typography variant="h4" align="center" gutterBottom>
            Features
          </Typography>
          <br/>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Card className='card1' sx={{ textAlign: 'center', boxShadow: 3, py: 4 }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" gutterBottom>
                      {feature.title}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box sx={{ py: 8, backgroundColor: '#f5f5f5' }}>
        <Container maxWidth="lg">
          <Typography variant="h4" align="center" gutterBottom>
            Market Overview
          </Typography>
          <Typography variant="body1" align="center">
            [Graphs or charts showing stock performance will be here]
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Features;
