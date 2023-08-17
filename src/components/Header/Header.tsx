import React from 'react';
import { Link } from 'react-router-dom';
import LoginBtn from '../LoginBtn/LoginBtn';
import './Header.module.scss';
import { Grid } from '@mui/material';

export function Header() {
  return (
    <header>
      <Grid container justifyContent='center' spacing={2}>
        <Grid item xs='auto'>
          <Link to='/'>Home</Link>
        </Grid>
        <Grid item xs='auto'>
          <Link to='/about'>About</Link>
        </Grid>
        <Grid item xs='auto'>
          <Link to='/login'>Login</Link>
        </Grid>
        <Grid item xs='auto'>
          <Link to='/registration'>Registration</Link>
        </Grid>
        <Grid item xs='auto'>
          <Link to='/xcvsdfv'>404</Link>
        </Grid>
        <Grid item xs='auto'>
          <LoginBtn></LoginBtn>
        </Grid>
      </Grid>
    </header>
  );
}
