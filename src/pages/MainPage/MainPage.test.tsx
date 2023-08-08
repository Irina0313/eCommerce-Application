import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { MainPage } from './MainPage';

describe('Main Page', () => {
  test('Renders main page', () => {
    render(
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    );

    expect(screen.getByText(/This is our Main Page/i)).toBeInTheDocument();
  });
});
