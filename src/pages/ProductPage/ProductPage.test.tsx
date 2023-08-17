import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { ProductPage } from './ProductPage';

describe('Product Page', () => {
  test('Renders Product Page', () => {
    render(
      <BrowserRouter>
        <ProductPage />
      </BrowserRouter>
    );

    expect(screen.getByText(/Product Page/i)).toBeInTheDocument();
  });
});
