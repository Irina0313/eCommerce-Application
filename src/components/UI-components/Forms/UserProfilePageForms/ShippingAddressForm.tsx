import React from 'react';

import { UserAddressesForm } from './UserAddressesForm';
import { Customer } from '@commercetools/platform-sdk';

export function ShippingAddressesForm(props: { customerInfo: Customer }) {
  const customerInfo = props.customerInfo;
  return <UserAddressesForm customerInfo={customerInfo} addressType={'shipping'} />;
}
