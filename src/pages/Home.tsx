import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Button, TextField, Grid, Card, CardContent } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/reducers/authSlice.ts';
import { RootState } from '../redux/store.ts';
import StockChart from '../components/StockChart.tsx';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

interface User {
  id: number;
  name: string;
  email: string;
  watchlists: Array<string>;
}

const Home: React.FC = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [error, setError] = useState<string>('');
  const [newWatchlistItem, setNewWatchlistItem] = useState<string>('');
  const [selectedSymbol, setSelectedSymbol] = useState<string>('');
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get<User>('https://Viray.pythonanywhere.com/api/user', {
          withCredentials: true,
          params: {
            jwt:Cookies.get('jwt')
        }
        });
        setUserData(response.data);
        setSelectedSymbol(response.data.watchlists[0] || '');  // Set first item or empty string
        dispatch(login(response.data));
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.log(error.response)
          setError('Unauthenticated. Please log in.');
        } else {
          setError(error.response?.data?.detail || 'An error occurred');
        }
      }
    };

    fetchUserData();
  }, [dispatch]);

  const addWatchlistItem = async () => {
    if (newWatchlistItem.trim() === '') return;

    try {
      const response = await axios.put(
        'https://Viray.pythonanywhere.com/api/update-watchlist',
        { watchlist_items: [newWatchlistItem] },
        { withCredentials: true,params: {
          jwt:Cookies.get('jwt')
      } }
        
      );
      // Update local state
      if (userData) {
        setUserData({
          ...userData,
          watchlists: [...userData.watchlists, newWatchlistItem],
        });
        setSelectedSymbol(newWatchlistItem)
      }
      setNewWatchlistItem(''); // Clear input field
    } catch (error) {
      setError(error.response?.data?.detail || 'An error occurred while updating the watchlist');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', padding: '2vh'}}>
      {error && (
        <Box>
          <Typography variant="h5" color="error" fontWeight="bold" mb={2}>
            {error}
          </Typography>
          {error === 'Unauthenticated. Please log in.' && (
            <Button component={Link} to="/login" variant="contained" color="primary">
              Log In
            </Button>
          )}
        </Box>
      )}
      {!error && userData && (
        <div>
          <Typography variant="h5" fontWeight={'bold'}>
            Welcome, {userData.name}!
          </Typography>
          <Box marginY={5}>
            <Typography variant='h5'>
              Your Watchlists
            </Typography>
            <Grid container spacing={2} padding={5}>
              {userData.watchlists.map((item, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <Card
                    sx={{
                      backgroundColor: selectedSymbol === item ? 'primary.main' : 'white' ,
                      color: selectedSymbol === item ? 'white' : 'black' ,
                      boxShadow: 3,
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: 'primary.dark',
                      },
                    }}
                    onClick={() => setSelectedSymbol(item)}
                  >
                    <CardContent>
                      <Typography variant='h6' component='span'>
                        {item}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            {userData.watchlists.length === 0 && <Typography variant='h5'> Please start by adding items</Typography>}
          </Box>
          <Box mt={2} display={'flex'}>
            <TextField
              label="Add Watchlist Item"
              value={newWatchlistItem}
              onChange={(e) => setNewWatchlistItem(e.target.value)}
              style={{width: '100%'}}
            />
            <Button variant="contained" color="primary" onClick={addWatchlistItem}>
              Add
            </Button>
          </Box>
          <Box mt={2}>
            {selectedSymbol && (
              <StockChart symbol={selectedSymbol} />
            )}
          </Box>
        </div>
      )}
    </Box>
  );
};

export default Home;
