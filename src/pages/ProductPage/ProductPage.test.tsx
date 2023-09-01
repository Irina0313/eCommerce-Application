import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { ProductPage } from './ProductPage';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

describe('Product Page', () => {
  test('Renders Product Page', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProductPage />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByTestId('prodName')).toBeInTheDocument();
    expect(screen.getByTestId('carousel')).toBeInTheDocument();
    expect(screen.getByTestId('lightBox')).toBeInTheDocument();
    expect(screen.getByTestId('prices')).toBeInTheDocument();
    expect(screen.getByTestId('addToCart')).toBeInTheDocument();
    expect(screen.getByTestId('descroption')).toBeInTheDocument();
  });
});
