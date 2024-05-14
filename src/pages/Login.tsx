import React, { FC, useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Cookies from 'js-cookie';
import { login } from "../redux/reducers/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

interface UserData {
  jwt: string;
}

const SignInSide: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post<UserData>('https://Viray.pythonanywhere.com/api/login', { email, password });
      const { jwt } = response.data;
      Cookies.set('jwt', jwt, { expires: 1 }); // Expires in 1 day
      setSuccess(true);
      setError('');
      setTimeout(() => {
        navigate('/home');
      }, 1000);
    } catch (error) {
      setError(error.response?.data?.detail || 'An error occurred');
      setSuccess(false);
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleClose = () => {
    setSuccess(false);
    setError('');
  };
  
  return (
    <Grid container component="main" sx={{ minHeight: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://img.freepik.com/free-photo/beautiful-cryptocurrwncy-concept_23-2149250205.jpg?w=900&t=st=1715633944~exp=1715634544~hmac=d553298b6eaa1cc1148cc21c55d5f147cf9a4ad429171f94040b5ddedf323b56)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate onSubmit={handleLogin} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={handleEmailChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={handlePasswordChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
      <Snackbar open={success || !!error} autoHideDuration={6000} onClose={handleClose}>
        <MuiAlert onClose={handleClose} severity={success ? 'success' : 'error'} sx={{ width: '100%' }}>
          {success ? 'Login successful!' : error}
        </MuiAlert>
      </Snackbar>
    </Grid>
  );
}

export default SignInSide;
