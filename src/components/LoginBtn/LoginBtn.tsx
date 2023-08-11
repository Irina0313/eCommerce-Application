import React from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useNavigate } from 'react-router-dom';
import { setId } from '../../store/userSlice';
import { Avatar, Divider, ListItemIcon, Menu, MenuItem, Tooltip, IconButton } from '@mui/material';
import Logout from '@mui/icons-material/Logout';

export default function LoginBtn() {
  const isLogin = useAppSelector((state) => state.userReducer.id);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  function handleClick(btnName: string): void {
    switch (btnName) {
      case 'profile':
        navigate('/user-page');
        break;
      case 'logout':
        navigate('/');
        dispatch(setId(null));
        break;
      case 'login':
        dispatch(setId(1));
        navigate('/login');
        break;
      case 'register':
        navigate('/registration');
        break;

      default:
        setAnchorEl(null);
        break;
    }
  }

  return (
    <React.Fragment>
      <IconButton onClick={(event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)} size='small' sx={{ ml: 2 }} aria-controls={open ? 'account-menu' : undefined} aria-haspopup='true' aria-expanded={open ? 'true' : undefined}>
        <Avatar sx={{ width: 32, height: 32, marginTop: '-6px', bgcolor: 'wheat' }}>P</Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={() => setAnchorEl(null)}
        onClick={() => setAnchorEl(null)}
        sx={{
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {isLogin ? (
          <div>
            <MenuItem onClick={() => handleClick('profile')}>
              <Avatar /> Profile
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => handleClick('logout')}>
              <ListItemIcon>
                <Logout fontSize='small' />
              </ListItemIcon>
              Logout
            </MenuItem>
          </div>
        ) : (
          <div>
            <MenuItem onClick={() => handleClick('login')}>Log in</MenuItem>
            <MenuItem onClick={() => handleClick('register')}>Register</MenuItem>
          </div>
        )}
      </Menu>
    </React.Fragment>
  );
}
