import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

export function MainPage() {
  return (
    <>
      <Typography variant='h1' m={10}>
        This is our Main Page
      </Typography>
      <Typography variant='h3'>Hi there!</Typography>

      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2rem',
          margin: '2rem',
        }}
      >
        {/* так похоже href использовать нельзя, не тру спа получается */}
        <Button variant='outlined' href='/about'>
          read about us
        </Button>
        <Button variant='contained' startIcon={<SendIcon />} onClick={() => alert('Surprised!')}>
          receive a gift
        </Button>
      </Container>
    </>
  );
}
