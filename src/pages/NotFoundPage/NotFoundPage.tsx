import React from 'react';
import WebAssetOffIcon from '@mui/icons-material/WebAssetOff';
import { Typography, Grid, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import './style.css';

export function NotFoundPage() {
  return (
    <Grid container spacing={4} sx={{ width: '80vw', height: '60vh' }} direction={'column'} justifyContent='center' alignItems='center'>
      <WebAssetOffIcon sx={{ width: '20vw', height: '20vw', marginBottom: '40px' }} />
      <Typography sx={{ textAlign: 'center', marginBottom: '20px' }} variant='h3'>
        <Grid container spacing={4} justifyContent='center' alignItems='center'>
          <div className='error-page--words'>O </div>
          <div className='error-page--words'>o </div>
          <div className='error-page--words'>p</div>
          <div className='error-page--words'>s </div>
          <div className='error-page--words'>. </div>
          <div className='error-page--words'>. </div>
          <div className='error-page--words'>. </div>
          <div className='error-page--words space'></div>
          <div className='error-page--words'>N</div>
          <div className='error-page--words'>o</div>
          <div className='error-page--words'>t </div>
          <div className='error-page--words space'></div>
          <div className='error-page--words'>f</div>
          <div className='error-page--words'>o</div>
          <div className='error-page--words'>u</div>
          <div className='error-page--words'>n</div>
          <div className='error-page--words'>d</div>
          <div className='error-page--words space'></div>
          <div className='error-page--words'>4</div>
          <div className='error-page--words'>0</div>
          <div className='error-page--words'>4</div>
        </Grid>
      </Typography>

      <Typography sx={{ textAlign: 'center' }} variant='h4'>
        <Link to={'/'}>
          <Button variant='outlined'>Return to home page</Button>
        </Link>
      </Typography>
    </Grid>
  );
}
