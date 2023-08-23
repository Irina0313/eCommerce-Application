import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from './Layout';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

test('render layout', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </Provider>
  );

  const header = screen.getByTestId('header');
  const main = screen.getByTestId('main');
  const footer = screen.getByTestId('footer');

  expect(header).toBeInTheDocument();
  expect(main).toBeInTheDocument();
  expect(footer).toBeInTheDocument();
});
