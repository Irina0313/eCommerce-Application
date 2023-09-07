import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { CategoryPage } from './CategoryPage';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

describe('Category Page', () => {
  test('Renders Category Page', () => {
    const container = render(
      <Provider store={store}>
        <BrowserRouter>
          <CategoryPage />
        </BrowserRouter>
      </Provider>
    );
    expect(container).toBeTruthy();
  });
});
