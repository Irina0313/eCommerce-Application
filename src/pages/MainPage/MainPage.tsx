import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { Link } from 'react-router-dom';

export function MainPage() {
  return (
    <>
      <Typography variant="h1" m={10}>
        This is our Main Page
      </Typography>
      <Typography variant="h3">Hi there!</Typography>

      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2rem',
          margin: '2rem',
        }}
      >
        <Link to={'/about'}>
          <Button variant="outlined">read about us</Button>
        </Link>

        <Button variant="contained" startIcon={<SendIcon />} onClick={() => alert('Surprised!')}>
          receive a gift
        </Button>
      </Container>
    </>
  );
}
