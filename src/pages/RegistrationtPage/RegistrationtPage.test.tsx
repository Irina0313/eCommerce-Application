import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { RegistrationtPage } from './RegistrationtPage';

describe('Registrationt Page', () => {
  test('Renders Registrationt Page', () => {
    render(
      <BrowserRouter>
        <RegistrationtPage />
      </BrowserRouter>
    );

    expect(screen.getByText(/Registrationt Page/i)).toBeInTheDocument();
  });
});
