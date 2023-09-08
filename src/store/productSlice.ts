import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ProductData } from '@commercetools/platform-sdk';

const initialState: ProductData = {
  name: {
    'en-US': 'Loading...',
  },
  description: {
    'en-US': 'Some description',
  },
  categories: [],
  categoryOrderHints: {},
  slug: {
    'en-US': 'slug',
  },
  metaTitle: {
    'en-US': 'metaTitle',
  },
  metaDescription: {
    'en-US': 'MetaDescription',
  },
  masterVariant: {
    id: 1,
    key: '...123abc',
    prices: [
      {
        id: 'anyId',
        value: {
          type: 'centPrecision',
          currencyCode: 'USD',
          centAmount: 1200,
          fractionDigits: 2,
        },
        key: '132',
        tiers: [
          {
            minimumQuantity: 1,
            value: {
              type: 'centPrecision',
              currencyCode: 'USD',
              centAmount: 1200,
              fractionDigits: 2,
            },
          },
        ],
      },
    ],
    images: [
      {
        url: 'data:image/jpeg;base64,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',
        dimensions: {
          w: 1117,
          h: 1400,
        },
      },
    ],
    attributes: [
      {
        name: 'size',
        value: {
          key: 'Medium',
          label: 'Medium',
        },
      },
      {
        name: 'color',
        value: {
          key: 'Green',
          label: 'Green',
        },
      },
    ],
    assets: [],
  },
  variants: [],
  searchKeywords: {},
};

export const productSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProd: (state, action: PayloadAction<ProductData>) => {
      state = action.payload;
    },
  },
});
export const { setProd } = productSlice.actions;
export default productSlice.reducer;
