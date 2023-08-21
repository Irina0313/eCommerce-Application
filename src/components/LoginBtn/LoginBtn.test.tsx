import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import LoginBtn from './LoginBtn';

describe('LoginBtn', () => {
  test('renders without errors', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginBtn />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('opens and closes the menu on button click', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginBtn />
        </BrowserRouter>
      </Provider>
    );

    const button = screen.getByTestId('loginBtnIcon');

    fireEvent.click(button);
    const menuLogin = screen.getByTestId('menuLogin');
    expect(menuLogin).toBeInTheDocument();

    fireEvent.click(button);
    const menuRegister = screen.getByTestId('menuRegister');
    expect(menuRegister).toBeInTheDocument();
  });
});
