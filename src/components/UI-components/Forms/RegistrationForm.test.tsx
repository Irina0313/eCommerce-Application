import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { RegistrationForm } from './RegistrationForm';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { store } from '../../../store/store';
import { BrowserRouter } from 'react-router-dom';

describe('RegistrationForm', () => {
  it('should render all required form fields', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <RegistrationForm onSubmit={jest.fn()} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByLabelText('Title')).toBeInTheDocument();
    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Birth Date')).toBeInTheDocument();
    expect(screen.getByTestId('billingStreet')).toBeInTheDocument();
    expect(screen.getByTestId('billingCity')).toBeInTheDocument();
    expect(screen.getByTestId('billingPostalCode')).toBeInTheDocument();
    expect(screen.getByTestId('billingCountry')).toBeInTheDocument();
    expect(screen.getByTestId('shippingStreet')).toBeInTheDocument();
    expect(screen.getByTestId('shippingCity')).toBeInTheDocument();
    expect(screen.getByTestId('shippingPostalCode')).toBeInTheDocument();
    expect(screen.getByTestId('shippingCountry')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('handles set as shipping address change', async () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <RegistrationForm onSubmit={jest.fn()} />
        </BrowserRouter>
      </Provider>
    );

    const setAsShippingCheckbox = container.querySelector('#setAsShippingAddress') as HTMLInputElement;
    act(() => {
      fireEvent.click(setAsShippingCheckbox);
    });

    const streetNameInput = container.querySelector('#shippingStreet') as HTMLInputElement;
    const cityInput = container.querySelector('#shippingCity') as HTMLInputElement;
    const postalCodeInput = container.querySelector('#shippingPostalCode') as HTMLInputElement;
    const countryInput = container.querySelector('#shippingCountry') as HTMLElement;

    expect(streetNameInput.value).toBe('');
    expect(cityInput.value).toBe('');
    expect(postalCodeInput.value).toBe('');
    expect(countryInput.innerHTML).toBe('USA');
  });
});
