import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import * as pages from './pages';
import { Layout } from './components';
import { useAppDispatch } from './hooks/useAppDispatch';
import { fetchCart, fetchCartForUser, fetchCategories } from './api/Client';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());

    const userId = localStorage.getItem('IKKShop_userId') || '';
    if (userId) {
      dispatch(fetchCartForUser(userId));
    } else {
      const cartId = localStorage.getItem('IKKShop_cartId') || '';
      if (cartId) dispatch(fetchCart(cartId));
    }
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
          <Route path='basket' element={<pages.BasketPage />} />
          <Route path='product/:productKey' element={<pages.ProductPage />} />
          <Route path='catalog' element={<pages.CategoryPage />} />
          <Route path='catalog/:id' element={<pages.CategoryPage />} />
          <Route path='*' element={<pages.NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
