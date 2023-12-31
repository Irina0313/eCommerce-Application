import React from 'react';
import { Link } from 'react-router-dom';
import LoginBtn from '../LoginBtn/LoginBtn';
import AppBar from '@mui/material/AppBar';
import { Toolbar, Typography, IconButton, Badge, Box } from '@mui/material';
import Container from '@mui/material/Container';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAppSelector } from '../../hooks/useAppSelector';
import BurgerMenu from '../UI-components/BurgerMenu/BurgerMenu';
import { styled } from '@mui/material/styles';

export function Header() {
  const { cart } = useAppSelector((state) => state.cartReducer);
  const [open, setOpen] = React.useState(false);

  const Nav = styled('div')(({ theme }) => ({
    padding: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  }));

  return (
    <>
      <AppBar sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <AppBar component='div' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', /* maxWidth: '100%',  */ height: '44px', backgroundColor: '#1E212C' }}>
          <Container
            sx={{
              boxSizing: 'border-box',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              maxWidth: '900px',
              '@media (max-width: 1200px)': {
                maxWidth: '700px',
              },
              '@media (max-width: 800px)': {
                maxWidth: '600px',
              },
              '@media (max-width: 630px)': {
                maxWidth: '400px',
              },
              '@media (max-width: 430px)': {
                maxWidth: '250px',
              },
            }}
          >
            <Link to={'tel:+555555555'} style={{ textDecoration: 'none' }}>
              <Typography
                variant='h6'
                sx={{
                  color: '#FFFFFF',
                  '&:hover': {
                    color: '#FF4242',
                  },
                }}
              >
                +555 555-555
              </Typography>
            </Link>
            <Nav>
              <Link to={'/catalog'} style={{ textDecoration: 'none', flexGrow: 1, margin: '0 5rem' }}>
                <Typography
                  sx={{
                    color: '#FFFFFF',
                    '&:hover': {
                      color: '#FF4242',
                    },
                  }}
                >
                  Catalog
                </Typography>
              </Link>

              <Link to={'/about'} style={{ textDecoration: 'none' }}>
                <Typography
                  variant='h6'
                  aria-label='about us'
                  sx={{
                    color: '#FFFFFF',
                    '&:hover': {
                      color: '#FF4242',
                    },
                  }}
                >
                  About us
                </Typography>
              </Link>
            </Nav>
            <LoginBtn />

            <BurgerMenu open={open} setOpen={setOpen}>
              <Link to={'/catalog'} onClick={() => setOpen(false)} style={{ textDecoration: 'none', margin: '0 5rem' }}>
                <Typography
                  variant='h6'
                  aria-label='Catalog'
                  sx={{
                    color: '#424551',
                    height: 'max-content',
                    '&:hover': {
                      color: '#FF4242',
                    },
                  }}
                >
                  Catalog
                </Typography>
              </Link>

              <Link to={'/about'} onClick={() => setOpen(false)} style={{ textDecoration: 'none' }}>
                <Typography
                  variant='h6'
                  aria-label='about us'
                  sx={{
                    color: '#424551',
                    '&:hover': {
                      color: '  ',
                    },
                  }}
                >
                  About us
                </Typography>
              </Link>
            </BurgerMenu>
          </Container>
        </AppBar>
        <AppBar component='div' position='fixed' data-testid={'header'} sx={{ marginTop: '44px', backgroundColor: '#FFFFFF', display: 'flex', justifyContent: 'center' }}>
          <Container
            sx={{
              width: '100%',
              margin: '0 auto',
              maxWidth: '900px',
              '@media (max-width: 1200px)': {
                maxWidth: '700px',
              },
              '@media (max-width: 800px)': {
                maxWidth: '600px',
              },
              '@media (max-width: 630px)': {
                maxWidth: '400px',
              },
              '@media (max-width: 430px)': {
                maxWidth: '250px',
              },
            }}
          >
            <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <EmojiEmotionsOutlinedIcon
                  fontSize='large'
                  sx={{
                    color: '#17696A',
                  }}
                />
                <Link to={'/'} style={{ textDecoration: 'none' }}>
                  <Typography
                    variant='h4'
                    noWrap
                    aria-label='Logotype'
                    sx={{
                      marginLeft: '1rem',
                      fontFamily: 'monospace',
                      fontWeight: 700,
                      color: '#424551',
                      '&:hover': {
                        color: '#FF4242',
                      },
                    }}
                  >
                    IKK SHOP
                  </Typography>
                </Link>
              </Box>
              <Container sx={{ display: 'flex', justifyContent: 'space-around', columnGap: '0.5rem' }}>
                <Link to={'/catalog/men'} style={{ textDecoration: 'none' }}>
                  <Typography
                    variant='h6'
                    sx={{
                      fontWeight: '700',
                      textDecoration: 'none',
                      color: '#424551',
                      '&:hover': {
                        color: '#FF4242',
                      },
                    }}
                  >
                    Men
                  </Typography>
                </Link>

                <Link to={'/catalog/women'} style={{ textDecoration: 'none' }}>
                  <Typography
                    variant='h6'
                    sx={{
                      fontWeight: '700',
                      textDecoration: 'none',
                      color: '#424551',
                      '&:hover': {
                        color: '#FF4242',
                      },
                    }}
                  >
                    Women
                  </Typography>
                </Link>

                <Link to={'/catalog/kids'} style={{ textDecoration: 'none' }}>
                  <Typography
                    variant='h6'
                    sx={{
                      fontWeight: '700',
                      textDecoration: 'none',
                      color: '#424551',
                      '&:hover': {
                        color: '#FF4242',
                      },
                    }}
                  >
                    Kids
                  </Typography>
                </Link>
              </Container>

              <Link to={'/basket'} style={{ textDecoration: 'none', color: 'white' }}>
                <IconButton color='inherit' sx={{ mr: 1 }}>
                  <Badge badgeContent={cart?.lineItems.length || 0} color='success'>
                    <ShoppingCartIcon
                      sx={{
                        color: '#424551',
                        '&:hover': {
                          color: '#FF4242',
                        },
                      }}
                    />
                  </Badge>
                </IconButton>
              </Link>
            </Toolbar>
          </Container>
        </AppBar>
        <AppBar
          sx={{
            backgroundColor: '#17696A',
            height: '34px',
            marginTop: '108px',
            '@media (max-width: 1200px)': {
              marginTop: '100px',
            },
            '@media (max-width: 600px)': {
              marginTop: '90px',
            },
          }}
        />
      </AppBar>
    </>
  );
}
