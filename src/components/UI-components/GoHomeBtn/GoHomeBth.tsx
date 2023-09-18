import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

export default function GoHomeBth() {
  return (
    <Link to={'/'}>
      <Button variant='outlined'>Return to home page</Button>
    </Link>
  );
}
