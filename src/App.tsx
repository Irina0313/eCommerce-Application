import React from 'react';
import { Route, Routes } from 'react-router-dom';
import * as pages from './pages';
import { Layout } from './components';
import { useAppSelector } from './hooks/useAppSelector';

function App() {
  const isLogin = useAppSelector((state) => state.userReducer.id);
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<pages.MainPage />} />
          <Route path='about' element={<pages.AboutPage />} />
          <Route path='login' element={isLogin ? <pages.MainPage /> : <pages.LoginPage />} />
          <Route path='registration' element={isLogin ? <pages.MainPage /> : <pages.RegistrationPage />} />
          <Route path='profile' element={isLogin ? <pages.ProfilePage /> : <pages.MainPage />} />
          <Route path='prod/:id' element={<pages.ProductPage />} />
          <Route path='*' element={<pages.NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
