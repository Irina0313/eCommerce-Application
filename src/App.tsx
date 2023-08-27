import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import * as pages from './pages';
import { Layout } from './components';
import { useAppDispatch } from './hooks/useAppDispatch';
import { fetchCategories } from './api/Client';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<pages.MainPage />} />
          <Route path='about' element={<pages.AboutPage />} />
          <Route path='login' element={<pages.LoginPage />} />
          <Route path='registration' element={<pages.RegistrationPage />} />
          <Route path='profile' element={<pages.ProfilePage />} />
          <Route path='prod/:id' element={<pages.ProductPage />} />
          <Route path='category/:id' element={<pages.CategoryPage />} />
          <Route path='*' element={<pages.NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
