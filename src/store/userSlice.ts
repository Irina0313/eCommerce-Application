import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface UserState {
  id: string;
}

const initialState: UserState = {
  id: '',
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
