import React from 'react';
import { Box, CircularProgress, Typography, Button } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Container } from '@mui/system';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';
import { siteLocale } from '../../api/BuildClient';

export function BasketPage() {
  const { cart, error, loading } = useAppSelector((state) => state.cartReducer);

  return (
    <Container maxWidth='xl' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant='h1'>Busket page</Typography>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <CircularProgress size={48} sx={{ color: 'grey' }} />
        </Box>
      )}

      {error && (
        <Typography color={'error'} mt={3} textAlign={'center'}>
          {error}
        </Typography>
      )}

      {!loading && !error ? (
        cart?.lineItems && cart.lineItems.length > 0 ? (
          <List>
            {cart.lineItems.map((item) => (
              <ListItem key={item.id}>
                <ListItemText primary={item.name[siteLocale]} />
              </ListItem>
            ))}
          </List>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3 }}>
            <Typography variant='h3' sx={{ margin: '3rem 0 0 0' }}>
              Sorry freind:(
            </Typography>
            <Typography variant='h5' component='p' sx={{ margin: '3rem 0 2rem' }}>
              It looks your basket is empty, but you can still choose something delightful....
            </Typography>
            <Link to={'/catalog'}>
              <Button variant='contained'>see our catalog</Button>
            </Link>
          </Box>
        )
      ) : null}
    </Container>
  );
}
