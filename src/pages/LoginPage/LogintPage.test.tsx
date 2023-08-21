import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { LoginPage } from './LoginPage';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

test('Renders Login page', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    </Provider>
  );

  const loginHeading = screen.getByRole('heading', { name: /log in/i });
  expect(loginHeading).toBeInTheDocument();
});
