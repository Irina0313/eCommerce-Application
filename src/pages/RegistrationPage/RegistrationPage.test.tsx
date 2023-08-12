import React from 'react';
import { render, screen } from '@testing-library/react';
import { RegistrationPage } from './RegistrationPage';
describe('Login Page', () => {
  test('Renders Login page', () => {
    render(<RegistrationPage />);

    expect(screen.getByText('Registration')).toBeInTheDocument();
  });
});
