import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Cart } from '@commercetools/platform-sdk';

export interface CartState {
  loading: boolean;
  error: string;
  cart?: Cart;
}

const initialState: CartState = {
  loading: false,
  error: '',
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    cartFetching(state) {
      state.loading = true;
      state.error = '';
      state.cart = undefined;
    },
    cartFetchingSuccess(state, action: PayloadAction<Cart>) {
      state.loading = false;
      state.cart = action.payload;
    },
    cartFetchingError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { cartFetching, cartFetchingSuccess, cartFetchingError } = cartSlice.actions;
export default cartSlice.reducer;
