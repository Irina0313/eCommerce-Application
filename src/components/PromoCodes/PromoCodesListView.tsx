import React from 'react';
import { CircularProgress, Typography, Box } from '@mui/material';
import { getPromoCodes } from '../../api/Client';
import { DiscountCode } from '@commercetools/platform-sdk';

export default function PromoCodeListView() {
  const [loading, setLoading] = React.useState(true);
  const [promoCodes, setPromoCodes] = React.useState<DiscountCode[]>([]);

  React.useEffect(() => {
    getPromoCodes()
      .then((resp) => {
        const results: DiscountCode[] = resp.body.results;
        setPromoCodes(results);
        setLoading(false);
      })
      .catch(() => {
        // console.error(e);
        setLoading(false);
      });
  }, []);

  return (
    <Box>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }} data-testid='loading'>
          <CircularProgress size={24} sx={{ color: 'grey' }} />
        </Box>
      ) : (
        promoCodes.map((promoCode, index) =>
          promoCode.isActive ? (
            <Box key={index} sx={{ display: 'flex', columnGap: '10px', alignItems: 'center', margin: '15px 0' }}>
              <Typography variant='h4' sx={{ color: '#FF4242', margin: '0 20px 0 0' }}>
                {promoCode.code}
              </Typography>
              <Typography>{promoCode.description?.['en-US']}</Typography>
            </Box>
          ) : null
        )
      )}
    </Box>
  );
}
