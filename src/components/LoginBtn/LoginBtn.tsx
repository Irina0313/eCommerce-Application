import React from 'react';
import { Button } from '@mui/material';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { logInOut } from '../../store/loginSlice';
import { useNavigate } from 'react-router-dom';

export default function LoginBtn() {
  const isLogin = useAppSelector((state) => state.checkLogin.isLogged);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleClick = () => {
    isLogin ? navigate('/login') : navigate('/');
    dispatch(logInOut());
    console.log(isLogin);
  };
  return (
    <Button
      sx={{
        width: '80px',
      }}
      onClick={() => handleClick()}
      variant={isLogin ? 'contained' : 'outlined'}
      color={isLogin ? 'success' : 'error'}
    >
      {isLogin ? 'Login' : 'Logout'}
    </Button>
  );
}
