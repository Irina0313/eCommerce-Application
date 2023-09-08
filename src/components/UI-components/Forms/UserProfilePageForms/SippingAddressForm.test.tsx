import React from 'react';
import { render } from '@testing-library/react';
import { ShippingAddressesForm } from './ShippingAddressForm';
import { customerInfo } from './UserAddressesForm.test';

describe('UserAddressesForm', () => {
  it('renders without crashing', () => {
    const { container } = render(<ShippingAddressesForm customerInfo={customerInfo} />);
    expect(container).toBeTruthy();
  });
});
