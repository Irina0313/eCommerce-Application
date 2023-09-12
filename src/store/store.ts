import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import categoriesReducer from './categoriesSlice';
import cartReducer from './cartSlice';
import productReducer from './productSlice';

export const store = configureStore({
  reducer: { userReducer: userReducer, categoriesReducer: categoriesReducer, cartReducer: cartReducer, productReducer: productReducer },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
