import { createSlice } from '@reduxjs/toolkit';

export interface LoginState {
  isLogged: boolean;
}

const initialState: LoginState = {
  isLogged: false,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logIn: (state) => {
      state.isLogged = true;
    },
    logOut: (state) => {
      state.isLogged = false;
    },
  },
});

export const { logIn, logOut } = loginSlice.actions;

export default loginSlice.reducer;
