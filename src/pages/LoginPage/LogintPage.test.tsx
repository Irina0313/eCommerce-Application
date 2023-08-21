import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { LoginPage } from './LoginPage';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import userEvent from '@testing-library/user-event';

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

test('displays loading indicator while submitting the form', async () => {
  const { container } = render(
    <Provider store={store}>
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    </Provider>
  );
  const emailInput = screen.getByLabelText('Email');
  const passwordInput = screen.getByLabelText('Password');
  const submitButton = screen.getByText('Log in');

  userEvent.type(emailInput, 'test@example.com');
  userEvent.type(passwordInput, 'password');
  userEvent.click(submitButton);

  const loadingIndicator = container.querySelector('.MuiCircularProgress-root');
  expect(loadingIndicator).toBeInTheDocument();
});
test('displays modal on valid login attempt', async () => {
  jest.mock('../../api/Client', () => ({
    userLogin: jest.fn().mockResolvedValueOnce({ body: { customer: { id: 'testUserId' } } }),
  }));

  const emailInput = screen.getByLabelText('Email');
  const passwordInput = screen.getByLabelText('Password');
  const submitButton = screen.getByRole('button', { name: 'Login' });

  userEvent.type(emailInput, 'invalid@example.com');
  userEvent.type(passwordInput, 'password');
  userEvent.click(submitButton);

  await waitFor(() => jest.fn(), { timeout: 0 });

  const modalMessage = screen.getByText('Logged in successfully!');
  expect(modalMessage).toBeInTheDocument();
});

test('displays error modal on invalid login attempt', async () => {
  jest.mock('../../api/Client', () => ({
    userLogin: jest.fn().mockRejectedValueOnce(new Error('BadRequest')),
  }));

  const emailInput = screen.getByLabelText('Email');
  const passwordInput = screen.getByLabelText('Password');
  const submitButton = screen.getByRole('button', { name: 'Login' });

  userEvent.type(emailInput, 'invalid@example.com');
  userEvent.type(passwordInput, 'wrongpassword');
  userEvent.click(submitButton);

  await waitFor(() => jest.fn(), { timeout: 0 });

  const errorModalMessage = screen.getByText('Invalid email or password. Please try again.');
  expect(errorModalMessage).toBeInTheDocument();
});

test('navigates to home page on successful login', async () => {
  const mockNavigate = jest.fn();
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
  }));

  const emailInput = screen.getByLabelText('Email');
  const passwordInput = screen.getByLabelText('Password');
  const submitButton = screen.getByRole('button', { name: 'Login' });

  userEvent.type(emailInput, 'test@example.com');
  userEvent.type(passwordInput, 'password');
  userEvent.click(submitButton);

  await waitFor(() => jest.fn(), { timeout: 0 });

  expect(mockNavigate).toHaveBeenCalledWith('/');
});
