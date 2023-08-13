import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { ProfilePage } from './ProfilePage';

describe('Profile Page', () => {
  test('Renders Profile Page', () => {
    render(
      <BrowserRouter>
        <ProfilePage />
      </BrowserRouter>
    );

    expect(screen.getByText(/Profile Page/i)).toBeInTheDocument();
  });
});
