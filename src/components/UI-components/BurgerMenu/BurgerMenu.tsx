import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Modal } from '@mui/material';
import { styled } from '@mui/material/styles';

export default function BurgerMenu({ children, open, setOpen }: { children: React.ReactNode; open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const Burger = styled('div')(({ theme }) => ({
    padding: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      padding: 0,
    },
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  }));
  return (
    <Burger>
      <MenuIcon onClick={handleOpen} style={{ width: '48px', height: '48px' }}>
        Open modal
      </MenuIcon>
      <Modal open={open} onClose={handleClose} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', paddingTop: '3rem', width: '50vw', height: '100vh', bgcolor: '#1976d2', left: '50vw', position: 'fixed' }}>{children}</Box>
      </Modal>
    </Burger>
  );
}
