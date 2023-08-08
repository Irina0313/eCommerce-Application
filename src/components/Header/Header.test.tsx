import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';

describe('Main Page', () => {
  test('Renders main page', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(screen.getByText(/About/i)).toBeInTheDocument();
  });
});
