import React from 'react';
import WebAssetOffIcon from '@mui/icons-material/WebAssetOff';
import { Typography, Grid, Button } from '@mui/material';
import { Link } from 'react-router-dom';
export function NotFoundPage() {
  return (
    <Grid container spacing={4} sx={{ width: '80vw', height: '60vh' }} direction={'column'} justifyContent='center' alignItems='center'>
      <WebAssetOffIcon sx={{ width: '20vw', height: '20vw' }} />
      <Typography sx={{ textAlign: 'center', marginBottom: '20px' }} variant='h3'>
        Oops... Not Found 404
      </Typography>
      <Typography sx={{ textAlign: 'center' }} variant='h4'>
        <Link to={'/'}>
          <Button variant='outlined'>Return to home page</Button>
        </Link>
      </Typography>
    </Grid>
  );
}
