import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { ProfilePage } from './ProfilePage';

describe('Registration Page', () => {
  test('Renders Registration Page', () => {
    render(
      <BrowserRouter>
        <ProfilePage />
      </BrowserRouter>
    );

    expect(screen.getByText(/Registration Page/i)).toBeInTheDocument();
  });
});
