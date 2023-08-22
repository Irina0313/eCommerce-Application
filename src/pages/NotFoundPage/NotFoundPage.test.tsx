import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { NotFoundPage } from './NotFoundPage';

describe('NotFoundPage Page', () => {
  test('Renders NotFoundPage', () => {
    render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>
    );
    const errorImg = screen.getByTestId('WebAssetOffIcon');

    expect(errorImg).toBeInTheDocument();
  });
});
