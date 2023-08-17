import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
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
});
