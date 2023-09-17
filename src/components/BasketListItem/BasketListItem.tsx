import { LineItem } from '@commercetools/platform-sdk';
import { Avatar, ListItemAvatar, TextField, Typography, Box } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import React, { useRef } from 'react';
import { siteLocale } from '../../api/BuildClient';

interface IBasketListItemProps {
  item: LineItem;
  onQuantityChange(lineItemId: string, quantity: number): void;
}

export default function BasketListItem({ item, onQuantityChange }: IBasketListItemProps) {
  const quantityRef = useRef<HTMLInputElement>();

  const onQuantityChangeLocal = () => {
    if (!quantityRef.current) return;

    if (+quantityRef.current.value < 1) quantityRef.current.value = '1';
    else if (+quantityRef.current.value > 999) quantityRef.current.value = '999';

    if (+quantityRef.current.value === item.quantity) return;

    console.log(quantityRef.current.value);
    onQuantityChange(item.id, +quantityRef.current.value);
  };

  // console.log(item);
  return (
    <ListItem>
      {item.variant.images?.length && (
        <ListItemAvatar>
          <Avatar alt={item.name[siteLocale]} src={item.variant.images[0].url} sx={{ width: 80, height: 80, mr: 7 }} />
        </ListItemAvatar>
      )}

      <Box sx={{ width: '150px' }}>
        {item.price.discounted ? (
          <>
            <Typography sx={{ color: 'green' }} variant='h4' component={'p'}>
              {`$${item.price.discounted.value.centAmount / 100}`}
            </Typography>
            <Typography sx={{ color: 'grey', textDecoration: 'line-through' }} variant='h6' component={'span'}>
              {`$${item.price.value.centAmount / 100}`}
            </Typography>
          </>
        ) : (
          <Typography variant='h4' component={'span'}>
            {`$${item.price.value.centAmount / 100}`}
          </Typography>
        )}
      </Box>

      <TextField
        sx={{ mr: 7 }}
        type='number'
        label='Quantity'
        inputRef={quantityRef}
        defaultValue={item.quantity}
        onChange={() => onQuantityChangeLocal()}
        variant='standard'
        InputProps={{ inputProps: { min: 1, max: 999 } }}
        InputLabelProps={{
          shrink: true,
        }}
      />

      <Typography variant='h4' component={'span'} sx={{ width: '150px' }}>
        {`$${item.totalPrice.centAmount / 100}`}
      </Typography>

      <ListItemText primary={item.name[siteLocale]} />
    </ListItem>
  );
}
