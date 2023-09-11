import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography, Button } from '@mui/material';
import { Container } from '@mui/system';
import { Link } from 'react-router-dom';
import { getCart, getCustomerInfo, getOrders, createCart } from '../../api/Client';
import { Customer } from '@commercetools/platform-sdk';
import { store } from '../../store/store';

export function BasketPage() {
  const [list, setList] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [customerInfo, setCustomerInfo] = useState<Customer>();
  const [cartId, setCartId] = useState('');

  async function createNewCart() {
    try {
      createCart().then((resp) => {
        console.log(resp.body.id);
      });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    //setloading(true);
    const storeState = store.getState();
    const userId = storeState.userReducer.id;

    async function fetchCustomerInfo() {
      try {
        const apiResponse = await getCustomerInfo(userId);
        const responce = apiResponse.body;
        responce.id ? setCustomerInfo(responce) : createNewCart();
        //setloading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchCustomerInfo();
  }, []);

  const storeState = store.getState();
  const userId = storeState.userReducer.id;
  //const userId = 'LVGRElUkuiKZNWoY7K0Nqo8q';
  /* getCart(userId).then((resp) => {
    console.log(resp.body);
  });
  getOrders(userId).then((resp) => {
    console.log(resp.body);
  }); */
  useEffect(() => {
    setLoading(true);
    new Promise<string[]>((resolve) => {
      //   throw Error('test error');
      // setTimeout(() => resolve(['1', '2', '3']), 1000);
      setTimeout(() => resolve([]), 1000);
    })
      .then((body: string[]) => {
        setLoading(false);
        setError('');
        setList(body);
      })
      .catch((e) => {
        setLoading(false);
        setError(e.message);
        setList([]);
      });
  }, []);

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
        list.length > 0 ? (
          <Typography> : {list.join()}</Typography>
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
