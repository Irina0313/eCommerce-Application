import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { RegistrationPage } from './RegistrationPage';
describe('Login Page', () => {
  test('Renders Login page', () => {
    render(
      <BrowserRouter>
        <RegistrationPage />
      </BrowserRouter>
    );

    expect(screen.getByText('Registration ')).toBeInTheDocument();
  });
});
