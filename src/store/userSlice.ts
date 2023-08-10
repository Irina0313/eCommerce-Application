import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface UserState {
  id: null | number | string;
}

const initialState: UserState = {
  id: null,
};

export const userSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setId: (state, action: PayloadAction<number | string | null>) => {
      state.id = action.payload;
    },
  },
});

export const { setId } = userSlice.actions;

export default userSlice.reducer;
