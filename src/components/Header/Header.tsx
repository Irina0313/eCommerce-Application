import React from 'react';
import { Link } from 'react-router-dom';
import LoginBtn from '../LoginBtn/LoginBtn';
import AppBar from '@mui/material/AppBar';
import { Toolbar, Typography, IconButton, Badge } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export function Header() {
  const basketLength = 3;

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
                m: 2,
                fontFamily: 'monospace',
                fontWeight: 700,
                color: 'wheat',
              }}
            >
              IKK SHOP
            </Typography>
          </Link>

          <Link to={'/catalog'} style={{ textDecoration: 'none', flexGrow: 1, margin: '0 5rem' }}>
            <Typography variant='h6' aria-label='Catalog' sx={{ color: 'wheat' }}>
              Catalog
            </Typography>
          </Link>

          <Link to={'/about'} style={{ textDecoration: 'none' }}>
            <Typography variant='h6' aria-label='about us' sx={{ color: 'wheat' }}>
              About us
            </Typography>
          </Link>

          <Link to={'/basket'} style={{ textDecoration: 'none', color: 'white' }}>
            <IconButton color='inherit' sx={{ mr: 1, padding: '0 3rem' }}>
              <Badge badgeContent={basketLength} color='secondary'>
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Link>

          <Box sx={{ mt: 1 }}>
            <LoginBtn />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
