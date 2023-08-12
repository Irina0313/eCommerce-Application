import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { AboutPage } from './AboutPage';

describe('About Page', () => {
  test('Renders About page', () => {
    render(
      <BrowserRouter>
        <AboutPage />
      </BrowserRouter>
    );

    expect(screen.getByText(/We are small but proud developer company/i)).toBeInTheDocument();
  });
});
