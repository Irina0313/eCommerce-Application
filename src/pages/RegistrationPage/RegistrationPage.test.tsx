import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { RegistrationPage } from './RegistrationPage';

describe('Registration Page', () => {
  test('Renders Registration Page', () => {
    render(
      <BrowserRouter>
        <RegistrationPage />
      </BrowserRouter>
    );

    expect(screen.getByText('Registration')).toBeInTheDocument();
  });
});
