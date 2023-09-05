import React from 'react';

import { UserAddressesForm } from './UserAddressesForm';
import { Customer } from '@commercetools/platform-sdk';

export function BillingAddressesForm(props: { customerInfo: Customer }) {
  const customerInfo = props.customerInfo;
  return <UserAddressesForm customerInfo={customerInfo} addressType={'billing'} />;
}
