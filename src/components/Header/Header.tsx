import React from 'react';
import { Link } from 'react-router-dom';
import LoginBtn from '../LoginBtn/LoginBtn';
import AppBar from '@mui/material/AppBar';
import { Toolbar, Typography, IconButton, Badge } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BurgerMenu from '../UI-components/BurgerMenu/BurgerMenu';
import { styled } from '@mui/material/styles';

export function Header() {
  const [open, setOpen] = React.useState(false);
  const basketLength = 3;

  const Nav = styled('div')(({ theme }) => ({
    padding: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  }));

  const Basket = styled('div')(({ theme }) => ({
    padding: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      pading: 0,
    },
    [theme.breakpoints.up('sm')]: {
      pading: '3rem',
    },
  }));

  return (
    <AppBar position='fixed' data-testid={'header'}>
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
          <Nav>
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
          </Nav>

          <Link to={'/basket'} style={{ textDecoration: 'none', color: 'white' }}>
            <Basket>
              <IconButton color='inherit'>
                <Badge badgeContent={basketLength} color='secondary'>
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Basket>
          </Link>
          <LoginBtn />
          <Box>
            <BurgerMenu open={open} setOpen={setOpen}>
              <Link to={'/catalog'} onClick={() => setOpen(false)} style={{ textDecoration: 'none', margin: '0 5rem' }}>
                <Typography variant='h6' aria-label='Catalog' sx={{ color: 'wheat', height: 'max-content' }}>
                  Catalog
                </Typography>
              </Link>

              <Link to={'/about'} onClick={() => setOpen(false)} style={{ textDecoration: 'none' }}>
                <Typography variant='h6' aria-label='about us' sx={{ color: 'wheat' }}>
                  About us
                </Typography>
              </Link>
            </BurgerMenu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
