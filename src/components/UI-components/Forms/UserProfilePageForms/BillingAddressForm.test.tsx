import React from 'react';
import { render } from '@testing-library/react';
import { BillingAddressesForm } from './BillingAddressesForm';
import { customerInfo } from './UserAddressesForm.test';

describe('UserAddressesForm', () => {
  it('renders without crashing', () => {
    const { container } = render(<BillingAddressesForm customerInfo={customerInfo} />);
    expect(container).toBeTruthy();
  });
});
