import React from 'react';
import { Link } from 'react-router-dom';
import LoginBtn from '../LoginBtn/LoginBtn';
import AppBar from '@mui/material/AppBar';
import { Toolbar, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';

export function Header() {
  return (
    <AppBar position='static' data-testid={'header'}>
      <Container maxWidth='md'>
        <Toolbar disableGutters>
          <EmojiEmotionsOutlinedIcon fontSize='large' sx={{ color: 'wheat' }} />
          <Link to={'/'} style={{ textDecoration: 'none', flexGrow: 1 }}>
            <Typography
              variant='h4'
              noWrap
              aria-label='Logotype'
              sx={{
                ml: 2,
                fontFamily: 'monospace',
                fontWeight: 700,
                color: 'wheat',
              }}
            >
              IKK SHOP
            </Typography>
          </Link>

          <Link to={'/catalog'} style={{ textDecoration: 'none', flexGrow: 1 }}>
            <Typography variant='h6' aria-label='Catalog' sx={{ color: 'wheat' }}>
              Catalog
            </Typography>
          </Link>

          <Box sx={{ mt: 1 }}>
            <LoginBtn />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
