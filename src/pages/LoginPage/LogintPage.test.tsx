import React from 'react';
import { render, screen } from '@testing-library/react';
import { LoginPage } from './LoginPage';

describe('Login Page', () => {
  test('Renders Login page', () => {
    render(<LoginPage />);

    expect(screen.getByText('Log in')).toBeInTheDocument();
  });
});
