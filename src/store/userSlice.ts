import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface UserState {
  id: string;
}
const userFromLocalStorage = localStorage.getItem('user');
const initialState: UserState = {
  id: userFromLocalStorage !== null ? JSON.parse(userFromLocalStorage).userId : '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
  },
});

export const { setId } = userSlice.actions;
export default userSlice.reducer;
