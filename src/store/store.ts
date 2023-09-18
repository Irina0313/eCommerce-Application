import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import categoriesReducer from './categoriesSlice';
import cartReducer from './cartSlice';

export const store = configureStore({
  reducer: { userReducer: userReducer, categoriesReducer: categoriesReducer, cartReducer: cartReducer},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
