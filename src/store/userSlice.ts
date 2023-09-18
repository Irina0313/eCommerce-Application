import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface UserState {
  id: string;
}

const initialState: UserState = {
  id: localStorage.getItem('IKKShop_userId') ?? '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
      localStorage.setItem('IKKShop_userId', action.payload);
    },
  },
});

export const { setId } = userSlice.actions;
export default userSlice.reducer;
