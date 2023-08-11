import React from 'react';
import { render, screen } from '@testing-library/react';
import { RegistrationtPage } from './RegistrationtPage';

describe('Login Page', () => {
  test('Renders Login page', () => {
    render(<RegistrationtPage />);

    expect(screen.getByText('Registration')).toBeInTheDocument();
  });
});
