import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { Container } from '@mui/system';

export function BasketPage() {
  const [list, setList] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    new Promise<string[]>((resolve) => {
      //   throw Error('test error');
      setTimeout(() => resolve(['1', '2', '3']), 1000);
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
    <Container maxWidth='xl' sx={{ display: 'flex' }}>
      <Typography>comming soon</Typography>

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

      {!loading && !error && list.length > 0 && <Typography> : {list.join()}</Typography>}
    </Container>
  );
}
