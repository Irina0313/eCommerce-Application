import { LineItem } from '@commercetools/platform-sdk';
import DeleteIcon from '@mui/icons-material/Delete';
import { Avatar, Box, Button, Divider, IconButton, TextField, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useEffect, useState } from 'react';
import { siteLocale } from '../../api/BuildClient';
import { useDebounce } from '../../hooks/useDebounce';

interface IBasketListItemProps {
  item: LineItem;
  onQuantityChange(lineItemId: string, quantity: number): void;
}

export default function BasketListItem({ item, onQuantityChange }: IBasketListItemProps) {
  const [quantity, setQuantity] = useState(item.quantity);
  const debouncedQuantity = useDebounce(quantity, 500);
  const [isAlertOpen, setIsAlertOpen] = React.useState(false);
  const onCloseAlert = () => setIsAlertOpen(false);

  useEffect(() => {
    //console.log('debouncedValue  changes : ', debouncedValue);
    if (debouncedQuantity !== item.quantity) onQuantityChange(item.id, debouncedQuantity);
  }, [debouncedQuantity]);

  const onQuantityChangeLocal = (event: React.ChangeEvent<HTMLInputElement>) => {
    let q = +event.target.value;
    if (q < 1) {
      q = 1;
      setQuantity(q);
    } else if (q > 999) {
      q = 999;
      setQuantity(q);
    } else setQuantity(q);
  };

  const onDeleteItemClick = () => {
    onCloseAlert();
    onQuantityChange(item.id, 0);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'center' }, my: 3 }}>
      {item.variant.images?.length && <Avatar alt={item.name[siteLocale]} src={item.variant.images[0].url} sx={{ display: 'block', width: 80, height: 80, mr: 7 }} />}

      <Box>
        <Typography variant='h4' component={'p'} sx={{ mb: 3 }}>
          {item.name[siteLocale]}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: '150px', display: 'inline-block' }}>
            {item.price.discounted ? (
              <>
                <Typography sx={{ color: 'green' }} variant='h5' component={'p'}>
                  {`$${item.price.discounted.value.centAmount / 100}`}
                </Typography>
                <Typography sx={{ color: 'grey', textDecoration: 'line-through' }} variant='h6' component={'span'}>
                  {`$${item.price.value.centAmount / 100}`}
                </Typography>
              </>
            ) : item.discountedPricePerQuantity[0] && item.discountedPricePerQuantity[0].discountedPrice.value.centAmount < item.price.value.centAmount ? (
              <>
                <Typography sx={{ color: 'orange' }} variant='h5' component={'p'}>
                  {`$${item.discountedPricePerQuantity[0].discountedPrice.value.centAmount / 100}`}
                </Typography>
                <Typography sx={{ color: 'grey', textDecoration: 'line-through' }} variant='h6' component={'span'}>
                  {`$${item.price.value.centAmount / 100}`}
                </Typography>
              </>
            ) : (
              <Typography variant='h5' component={'span'}>
                {`$${item.price.value.centAmount / 100}`}
              </Typography>
            )}
          </Box>
          <TextField
            sx={{ mr: 7 }}
            type='number'
            label='Quantity'
            value={quantity}
            onChange={onQuantityChangeLocal}
            variant='standard'
            InputProps={{ inputProps: { min: 1, max: 999 } }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Typography variant='h5' component={'p'} sx={{ display: 'inline-block', width: '120px' }}>
            {`$${item.totalPrice.centAmount / 100}`}
          </Typography>

          <IconButton aria-label='delete' sx={{ mr: 2 }} onClick={() => setIsAlertOpen(true)}>
            <DeleteIcon fontSize='large' />
          </IconButton>
        </Box>
        <Divider />
      </Box>
      <Dialog open={isAlertOpen} onClose={onCloseAlert}>
        <DialogTitle>{'Are you sure?'}</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>Remove item form basket, really?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseAlert}>Cancel</Button>
          <Button onClick={onDeleteItemClick} autoFocus>
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
