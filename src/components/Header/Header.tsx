import React from 'react';
import { Link } from 'react-router-dom';
import './Header.module.scss';

export function Header() {
  return (
    <header>
      <Link to='/'>Home</Link> ::
      <Link to='/about'>About</Link> ::
      <Link to='/login'>Login</Link> ::
      <Link to='/registation'>Registration</Link> ::
      <Link to='/xcvsdfv'>404</Link>
    </header>
  );
}
