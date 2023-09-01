import React from 'react';
import WebAssetOffIcon from '@mui/icons-material/WebAssetOff';
import { Typography, Grid } from '@mui/material';
import './style.css';
import GoHomeBth from '../../components/GoHomeBtn/GoHomeBth';

export function NotFoundPage() {
  return (
    <Grid container spacing={4} sx={{ width: '100%', height: '100%', margin: 'auto' }} direction={'column'} justifyContent='center' alignItems='center'>
      <WebAssetOffIcon sx={{ width: '20rem', height: '20rem', marginBottom: '4rem', marginTop: '-4rem' }} />

      <Grid container justifyContent='center' alignItems='center'>
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

      <Typography sx={{ textAlign: 'center', marginTop: '1rem' }} variant='h4'>
        <GoHomeBth />
      </Typography>
    </Grid>
  );
}
