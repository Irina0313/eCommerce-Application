import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { CategoryPage } from './CategoryPage';

describe('Category Page', () => {
  test('Renders Category Page', () => {
    render(
      <BrowserRouter>
        <CategoryPage />
      </BrowserRouter>
    );

    expect(screen.getByText(/Category Page/i)).toBeInTheDocument();
  });
});
