import React, { FC, useState } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store.ts";
import { logout } from "../redux/reducers/authSlice.ts";
import Cookies from 'js-cookie';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const NavBarComponent: FC = () =>  {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const user = useSelector((state: RootState) => state.auth.user);
  const [logoutSuccess, setLogoutSuccess] = useState(false);

  const handleLogout = async () => {
    // Dispatch the logout action
    dispatch(logout());
    const response = await axios.post('https://Viray.pythonanywhere.com/api/logout', {}, {
      withCredentials: true // This enables sending cookies along with the request
    });
    Cookies.remove('jwt');
    setLogoutSuccess(true);
    setTimeout(() => {
      setLogoutSuccess(false);
      navigate('/login');
    }, 1000);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className='navbar-container'>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <ShowChartIcon />
          </IconButton>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} onClick={()=>navigate("/")}>
            TradeGeek
          </Typography>

          {isLoggedIn ? (
            <Box display={'flex'}>
              <Avatar alt={user?.name || ''}>{user?.name?.charAt(0)}</Avatar>
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </Box>
          ) : (
            <Button className="button-container" color="inherit" onClick={() => navigate('/login')}>Login</Button>
          )}
        </Toolbar>
      </AppBar>
      <Snackbar open={logoutSuccess} autoHideDuration={6000}>
        <MuiAlert severity="success">
          Successfully logged out!
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default NavBarComponent;
