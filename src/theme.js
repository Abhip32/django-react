// theme.js

import { createTheme } from '@mui/material/styles';


const theme = createTheme({
    palette: {
        primary: {
            main: '#6A1B9A', // Choose your primary color
        },
        secondary: {
            main: '#dc004e', // Choose your secondary color
        },
    },
    typography: {
        fontFamily: 'Montserrat, sans-serif', // Define your preferred font family
    },
});

export default theme;
