import React from 'react';
import { Route, Routes } from 'react-router-dom';
import * as pages from './pages';
import { Layout } from './components';
/* merge import { useAppSelector } from './hooks/useAppSelector'; */

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<pages.MainPage />} />
          <Route path='about' element={<pages.AboutPage />} />
          {/* merge <Route path='login' element={isLogin ? <pages.MainPage /> : <pages.LoginPage />} />
          <Route path='profile' element={<pages.ProfilePage />} />
          <Route path='prod/:id' element={<pages.ProductPage />} /> */}
          <Route path='*' element={<pages.NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
