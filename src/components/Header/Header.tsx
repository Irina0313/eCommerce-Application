import React from 'react';
import { Link } from 'react-router-dom';
import LoginBtn from '../LoginBtn/LoginBtn';
import { useAppSelector } from '../../hooks/useAppSelector';
import './Header.module.scss';

export function Header() {
  const isLogin = useAppSelector((state) => state.userReducer.id);
  return (
    <header>
      <Link to='/'>Home</Link>
      <Link to='/about'>About</Link>
      <Link to={isLogin ? '/' : '/login'}>Login</Link>
      <Link to={isLogin ? '/' : '/registration'}>Registration</Link>
      <Link to='/xcvsdfv'>404</Link>
      <LoginBtn></LoginBtn>
    </header>
  );
}
