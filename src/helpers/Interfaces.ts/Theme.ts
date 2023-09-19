import { createTheme } from '@mui/material/styles';

export const Theme = createTheme({
  palette: {
    primary: {
      main: '#17696A',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#17696A',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#FF4242',
    },
    warning: {
      main: '#F89828',
    },
    info: {
      main: '#5A87FC',
    },
    success: {
      main: '#03CEA4',
    },
  },
  typography: {
    fontFamily: ['Lato', 'sans-serif'].join(','),
    h1: { fontSize: '2.8rem' },
    h2: { fontSize: '2rem' },
    h3: { fontSize: '1.75rem' },
    h4: { fontSize: '1.5rem' },
    h5: { fontSize: '1.25rem' },
    h6: { fontSize: '1rem' },
  },
});
