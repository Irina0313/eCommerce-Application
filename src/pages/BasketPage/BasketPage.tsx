import React from 'react';
import { Box, CircularProgress, Typography, Button } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Container } from '@mui/system';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';
import { siteLocale } from '../../api/BuildClient';
import { clearCart } from '../../api/Client';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { cartFetchingSuccess } from '../../store/cartSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export function BasketPage() {
  const [showApiLoader, setShowApiLoader] = React.useState(false);
  const [isAlertOpen, setIsAlertOpen] = React.useState(false);

  const { cart, error, loading } = useAppSelector((state) => state.cartReducer);
  const dispatch = useAppDispatch();

  const onCloseAlert = () => setIsAlertOpen(false);

  const onClearBasketClick = () => {
    onCloseAlert();
    if (!cart) return;

    setShowApiLoader(true);
    clearCart(cart)
      .then((res) => {
        dispatch(cartFetchingSuccess(res.body));
      })
      .catch((e) => {
        console.warn(e); // TODO
      })
      .finally(() => {
        setShowApiLoader(false);
      });
  };

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
          <>
            <List>
              {cart.lineItems.map((item) => (
                <ListItem key={item.id}>
                  <ListItemText primary={item.name[siteLocale] + ' -  ' + item.quantity} />
                </ListItem>
              ))}
            </List>

            <Button variant='contained' size='large' onClick={() => setIsAlertOpen(true)}>
              Clear Basket
              <RemoveShoppingCartIcon sx={{ ml: 2 }} />
            </Button>
            {showApiLoader && <CircularProgress size={24} sx={{ color: 'red', alignSelf: 'center' }} />}
          </>
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

      <Dialog open={isAlertOpen} onClose={onCloseAlert}>
        <DialogTitle>{'Are you sure?'}</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>Delete all items form basket, really?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseAlert}>Cancel</Button>
          <Button onClick={onClearBasketClick} autoFocus>
            Clear all
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
