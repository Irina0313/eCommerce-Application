import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { ProfilePage } from './ProfilePage';
import { store } from '../../store/store';
import { Provider } from 'react-redux';

describe('Profile Page', () => {
  test('Renders Profile Page', () => {
    const container = render(
      <Provider store={store}>
        <BrowserRouter>
          <ProfilePage />
        </BrowserRouter>
      </Provider>
    );

    expect(container).toBeTruthy();
  });
});
