import React from 'react';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { UserAddressesForm } from './UserAddressesForm';

afterEach(cleanup);

interface ICountry {
  pattern: RegExp;
  code: string;
}

const Countries: Record<string, ICountry> = {
  Canada: {
    pattern: /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,
    code: 'CA',
  },
  USA: {
    pattern: /^\d{5}(?:-\d{4})?$/,
    code: 'US',
  },
};

const customerInfo = {
  id: '956d6bf3-5d75-4ffe-912f-d4afe14c6fe3',
  version: 1,
  createdAt: '2023-09-04T14:23:29.665Z',
  lastModifiedAt: '2023-09-06T14:45:21.538Z',
  title: 'Mr',
  firstName: 'Bill',
  lastName: 'Smit',
  email: 'test@test.test',
  password: '12345***Zz',
  dateOfBirth: '2000-01-01',
  addresses: [
    {
      id: 'cfnlfqM9',
      streetName: 'Street',
      city: 'City',
      country: 'US',
      postalCode: '12345',
    },
    {
      id: 'RNhKvYGM',
      streetName: 'Street1',
      city: 'City1',
      country: 'US',
      postalCode: '12345',
    },
  ],
  defaultBillingAddress: 'cfnlfqM9',
  defaultShippingAddress: 'RNhKvYGM',
  shippingAddressIds: ['RNhKvYGM'],
  billingAddressIds: ['cfnlfqM9'],
  isEmailVerified: false,
  authenticationMode: 'Password',
};

jest.mock('../../../../api/Client', () => ({
  getCustomerInfo: jest.fn(() => customerInfo),
  updateCustomerInfo: jest.fn(() => customerInfo),
}));

describe('UserAddressesForm', () => {
  it('renders without crashing', () => {
    const { container } = render(<UserAddressesForm customerInfo={customerInfo} addressType='billing' />);
    expect(container).toBeTruthy();
    expect(container).toBeTruthy();
  });

  it('displays a list of addresses', () => {
    const { container } = render(<UserAddressesForm customerInfo={customerInfo} addressType='billing' />);
    const input = container.querySelectorAll('input')[0] as HTMLInputElement;

    const address = customerInfo.addresses[0];
    const addressText = `${address.streetName}, ${address.postalCode}, ${address.city}, ${Object.keys(Countries).find((key) => Countries[key].code === address.country)}`;
    expect(input.value).toBe(addressText);
  });

  it('button add address to be in the document', () => {
    render(<UserAddressesForm customerInfo={customerInfo} addressType='billing' />);
    const addButton = screen.getByTestId('addAddressBtn');
    expect(addButton).toBeInTheDocument();
  });

  it('button add address to be in the document', async () => {
    render(<UserAddressesForm customerInfo={customerInfo} addressType='billing' />);
    screen.debug();
    fireEvent.click(screen.getByTestId('addAddressBtn'), {
      target: { value: 'React' },
    });
    screen.debug();
  });

  it('button edit address to be in the document', () => {
    render(<UserAddressesForm customerInfo={customerInfo} addressType='billing' />);
    const editButton = screen.getByTestId('editAddressBtn');
    expect(editButton).toBeInTheDocument();
  });

  it('button delete address to be in the document', () => {
    render(<UserAddressesForm customerInfo={customerInfo} addressType='billing' />);
    const deleteButton = screen.getByTestId('deleteAddressBtn');
    expect(deleteButton).toBeInTheDocument();
  });
  it('calls handleAddAddress when "Add new address" button is clicked', () => {
    const handleAddAddress = jest.fn();
    const { container } = render(<button onClick={() => handleAddAddress()} data-testid='addAddressBtn' />);
    const addButton = container.firstChild as HTMLButtonElement;
    fireEvent.click(addButton);
    expect(handleAddAddress).toHaveBeenCalled();
  });
  it('calls handleEditAddress when "Edit" button is clicked', () => {
    const handleEditAddress = jest.fn();
    const { container } = render(<button onClick={() => handleEditAddress()} data-testid='editAddressBtn' />);
    const editButton = container.firstChild as HTMLButtonElement;
    fireEvent.click(editButton);
    expect(handleEditAddress).toHaveBeenCalled();
  });
  it('calls handleDeleteAddress when "Delete" button is clicked', () => {
    const handleDeleteAddress = jest.fn();
    const { container } = render(<button onClick={() => handleDeleteAddress()} data-testid='deleteAddressBtn' />);
    const deleteButton = container.firstChild as HTMLButtonElement;
    fireEvent.click(deleteButton);
    expect(handleDeleteAddress).toHaveBeenCalled();
  });
});

describe('UserAddressesForm', () => {
  it('should call setModalType, setShowModal, and setEditedAddress with the correct arguments when handleEditAddress is called', () => {
    interface IAddress {
      id: string;
      streetName: string;
      postalCode: string;
      city: string;
      country: string;
    }

    const address = customerInfo.addresses[0];
    const setModalType = jest.fn();
    const setShowModal = jest.fn();
    const setEditedAddress = jest.fn();

    const handleEditAddress = (address: IAddress) => {
      setModalType('Change');
      setShowModal(true);
      setEditedAddress(address);
    };
    const { container } = render(<button onClick={() => handleEditAddress(address)} data-testid='editAddressBtn' />);

    const editButton = container.firstChild as HTMLButtonElement;

    fireEvent.click(editButton);

    expect(setModalType).toHaveBeenCalledWith('Change');
    expect(setShowModal).toHaveBeenCalledWith(true);
    expect(setEditedAddress).toHaveBeenCalledWith(address);
  });
});
