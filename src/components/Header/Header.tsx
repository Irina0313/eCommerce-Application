import React from 'react';
import { Link } from 'react-router-dom';
import './Header.module.scss';

import { logIn } from '../../store/loginSlice';
import { RootState } from '../../store/store';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';

export function Header() {
  const isLogin = useAppSelector((state: RootState) => state.checkLogin.isLogged);
  const dispatch = useAppDispatch();

  function goDispatch() {
    dispatch(logIn());
    console.log(isLogin);
  }

  return (
    <header>
      <Link to='/'>Home</Link>
      <Link to='/about'>About</Link>
      <Link onClick={() => goDispatch()} to='/login'>
        Login
      </Link>
      <Link to='/registation'>Registration</Link>
      <Link to='/xcvsdfv'>404</Link>
    </header>
  );
}
