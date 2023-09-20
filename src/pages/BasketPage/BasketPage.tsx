import React from 'react';
import { Box, CircularProgress, Typography, Button, TextField, Divider, Stack } from '@mui/material';
import { Container } from '@mui/system';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';
import { changeLineItemQuantity, clearCart, handlePromoCode, getPromoCode } from '../../api/Client';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import BasketListItem from '../../components/BasketListItem/BasketListItem';
import { CartUpdate } from '@commercetools/platform-sdk';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { cartFetchingSuccess } from '../../store/cartSlice';

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
      .catch(() => {
        // console.warn(e); // TODO
      })
      .finally(() => {
        setShowApiLoader(false);
      });
  };

  const [promoCode, setPromoCode] = React.useState('');
  const [promoCodeBtnText, setPromoCodeBtnText] = React.useState(promoCode ? 'delete' : 'apply');
  const [promoInputError, setPromoInputError] = React.useState(false);
  const [promoInputErrorText, setPromoInputErrorText] = React.useState('');

  React.useEffect(() => {
    if (cart?.discountCodes[0]) {
      getPromoCode(cart?.discountCodes[0].discountCode.id)
        .then((resp) => {
          setPromoCode(resp.body.code);
          setPromoCodeBtnText(resp.body.code ? 'delete' : 'apply');
        })
        .catch((e) => {
          console.error(e.body.message);
        });
    }
  }, [cart]);

  function handleSubmit() {
    if (cart) {
      const promoData: CartUpdate = {
        version: cart?.version,

        actions:
          promoCodeBtnText === 'delete'
            ? [
                {
                  action: 'removeDiscountCode',
                  discountCode: {
                    typeId: 'discount-code',
                    id: cart.discountCodes[0].discountCode.id,
                  },
                },
              ]
            : [
                {
                  action: 'addDiscountCode',
                  code: promoCode,
                },
              ],
      };
      handlePromoCode(cart.id, promoData)
        .then((resp) => {
          dispatch(cartFetchingSuccess(resp.body));
          if (promoCodeBtnText === 'delete') {
            setPromoCode('');
            setPromoCodeBtnText('apply');
          }
        })
        .catch(() => {
          setPromoInputError(true);
          setPromoInputErrorText('Invalid Promo Code');
        });
    }
  }

  const onQuantityChange = (lineItemId: string, quantity: number): void => {
    if (!cart) return;

    setShowApiLoader(true);
    changeLineItemQuantity(cart, lineItemId, quantity)
      .then((res) => {
        dispatch(cartFetchingSuccess(res.body));
      })
      .catch(() => {
        // console.warn(e); // TODO
      })
      .finally(() => {
        setShowApiLoader(false);
      });
  };

  const totalPrice = ((cart?.lineItems?.reduce((acc, item) => acc + item.totalPrice.centAmount, 0) ?? 0) / 100).toFixed(2);

  return (
    <Container
      maxWidth='xl'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '4rem 0 0',
        '@media (max-width: 1200px)': {
          maxWidth: '1000px',
        },
        '@media (max-width: 1030px)': {
          maxWidth: '700px',
        },
        '@media (max-width: 730px)': {
          marginTop: '2rem',
          maxWidth: '400px',
        },
        '@media (max-width: 500px)': {
          marginTop: '3rem',
          maxWidth: '350px',
        },
        '@media (max-width: 400px)': {
          marginTop: '3rem',
          maxWidth: '300px',
        },
      }}
    >
      <Typography variant='h1' mb={3}>
        Busket page
      </Typography>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress size={48} sx={{ color: 'grey' }} />
        </Box>
      )}

      {error && (
        <Typography color={'error'} textAlign={'center'}>
          {error}
        </Typography>
      )}

      {!loading && !error ? (
        /* Draw basket items */
        cart?.lineItems && cart.lineItems.length > 0 ? (
          <>
            <Stack>
              <Divider />
              {cart.lineItems.map((item) => (
                <BasketListItem item={item} onQuantityChange={onQuantityChange} key={item.id} />
              ))}

              <Divider />
              <Box
                sx={{
                  mt: 3,
                  mb: 2,
                  display: 'flex',
                  columnGap: '10px',
                  gap: '0.8rem',
                  '@media (max-width: 400px)': {
                    flexWrap: 'wrap',
                  },
                }}
              >
                <TextField
                  id={promoCode}
                  size='small'
                  label='Promo Code'
                  sx={{
                    flexShrink: '1',
                    '@media (max-width: 400px)': {
                      width: '100%',
                    },
                  }}
                  value={promoCode}
                  onChange={(e) => {
                    setPromoCode(e.target.value);
                    setPromoInputError(false);
                    setPromoInputErrorText('');
                  }}
                  error={promoInputError}
                  helperText={promoInputErrorText}
                />
                <Button fullWidth variant='contained' sx={{ flexShrink: '4', maxHeight: '40px' }} onClick={() => handleSubmit()}>
                  {promoCodeBtnText} promo code
                </Button>
              </Box>
              <Typography my={5} variant='h4'>
                Total price: {totalPrice}
              </Typography>
            </Stack>

            <Button variant='contained' size='large' onClick={() => setIsAlertOpen(true)}>
              Clear Basket
              <RemoveShoppingCartIcon sx={{ ml: 2 }} />
            </Button>

            {showApiLoader && <CircularProgress size={48} sx={{ color: 'red', alignSelf: 'center' }} />}
          </>
        ) : (
          /* Empty basket*/
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
          <DialogContentText>Remove all items form basket, really?</DialogContentText>
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
