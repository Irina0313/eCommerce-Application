import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { ProfilePage } from './ProfilePage';
import { store } from '../../store/store';
import { Provider } from 'react-redux';

describe('Profile Page', () => {
  test('Renders Profile Page', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProfilePage />
        </BrowserRouter>
      </Provider>
    );
    await screen.findByRole('tabpanel', { name: /personal info/i });
    expect(screen.getByRole('tabpanel', { name: /personal info/i })).toBeInTheDocument();
  });
});
