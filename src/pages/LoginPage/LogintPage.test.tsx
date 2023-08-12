import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { LoginPage } from './LoginPage';

describe('Login Page', () => {
  test('Renders Login page', () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    const loginHeading = screen.getByRole('heading', { name: /log in/i });
    expect(loginHeading).toBeInTheDocument();
  });
});
