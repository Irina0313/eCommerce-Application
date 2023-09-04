import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Category } from '@commercetools/platform-sdk';

export interface CategoriesState {
  loading: boolean;
  error: string;
  categories: Array<Category>;
}

const initialState: CategoriesState = {
  loading: true,
  error: '',
  categories: [],
};

type PayloadData = Array<Category>;

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    categoriesFetching(state) {
      state.loading = true;
      state.error = '';
    },
    categoriesFetchingSuccess(state, action: PayloadAction<PayloadData>) {
      state.loading = false;
      state.categories = action.payload;
    },
    categoriesFetchingError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { categoriesFetching, categoriesFetchingSuccess, categoriesFetchingError } = categoriesSlice.actions;
export default categoriesSlice.reducer;
