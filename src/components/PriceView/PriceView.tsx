import React from 'react';
import { PriceDraft } from '@commercetools/platform-sdk';
import { Box, Container, Typography } from '@mui/material';

interface IPriceViewProps {
  prices?: PriceDraft[];
}

export default function PriceView({ prices }: IPriceViewProps) {
  if (!prices || !prices.length) return null;

  const price = prices[0].value?.centAmount ? prices[0].value?.centAmount / 100 : 99.99;
  const discount = prices[0].discounted?.value.centAmount ? prices[0].discounted?.value.centAmount / 100 : 0;

  return (
    <Container sx={{ display: 'flex', flexDirection: 'row' }}>
      {discount === 0 ? (
        <Typography variant='h5'>${price}</Typography>
      ) : (
        <Box component='span'>
          <Typography component='span' variant='h4' sx={{ color: 'green', paddingRight: '1.5rem' }}>
            ${discount}
          </Typography>
          <Typography component='span' variant='h6' sx={{ textDecoration: 'line-through', color: 'gray' }}>
            ${price}
          </Typography>
        </Box>
      )}
    </Container>
  );
}
