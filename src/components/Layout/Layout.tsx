import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header, Footer } from '..';
import CssBaseline from '@mui/material/CssBaseline';
import style from './Layout.module.scss'; // TODO

export function Layout() {
  return (
    <>
      <CssBaseline />
      <div className={style.pagelayout}>
        <Header />

        <main className={style.container}>
          <Outlet />
        </main>

        <Footer />
      </div>
    </>
  );
}
