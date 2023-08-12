import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header, Footer } from '..';
import style from './Layout.module.scss';

export function Layout() {
  return (
    <>
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
