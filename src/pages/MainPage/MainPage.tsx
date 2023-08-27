import React from 'react';
import { Button, Container, Grid, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { Link, useParams } from 'react-router-dom';
import CategoriesView from '../../components/CategoriesView/CategoriesView';
import { useAppSelector } from '../../hooks/useAppSelector';

export function MainPage() {
  const { categories, error, loading } = useAppSelector((state) => state.categoriesReducer);
  const params = useParams<'id'>();

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} md={1} mr={2} pb={4} border={'2px solid #000'} borderRadius={'30px'}>
          <CategoriesView categories={categories} parentCategory={undefined} error={error} loading={loading} />
        </Grid>

        <Grid item border={'2px solid #000'} borderRadius={'30px'}>
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
        </Grid>
      </Grid>
    </>
  );
}
