import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { RegistrationPage } from './RegistrationPage';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

describe('Registration Page', () => {
  test('Renders Registration Page', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <RegistrationPage />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Registration')).toBeInTheDocument();
  });
});
