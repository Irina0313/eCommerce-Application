import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { Link } from 'react-router-dom';
import PromoCodeListView from '../../components/PromoCodes/PromoCodesListView';

export function MainPage() {
  return (
    <>
      <Typography variant='h1' m={10}>
        Welcome to IKK SHOP!!!
      </Typography>
      <Typography variant='h3'>Hi there!</Typography>

      <Container
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2rem',
          margin: '2rem',
        }}
      >
        <Link to={'/about'}>
          <Button variant='outlined'>read about us</Button>
        </Link>

        <Link to={'/login'}>
          <Button variant='outlined'>go to Log in page</Button>
        </Link>

        <Link to={'/registration'}>
          <Button variant='outlined'>go to Registration page</Button>
        </Link>

        <Button variant='contained' startIcon={<SendIcon />} onClick={() => alert('Surprised!')}>
          receive a gift
        </Button>
      </Container>
      <PromoCodeListView />
    </>
  );
}
