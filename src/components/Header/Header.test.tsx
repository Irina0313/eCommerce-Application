import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

describe('Main Page', () => {
  test('Renders main page', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/About/i)).toBeInTheDocument();
  });
});
