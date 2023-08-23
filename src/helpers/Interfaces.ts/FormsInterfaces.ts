import { UseFormRegister, Control, FieldErrors, UseFormTrigger } from 'react-hook-form';

export interface IUserInfoFormInput {
  title?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  dateOfBirth?: string;
  addresses: [
    {
      streetName: string;
      city: string;
      country: string;
      postalCode: string;
    },
    {
      streetName: string;
      city: string;
      country: string;
      postalCode: string;
    },
  ];
  defaultBillingAddress?: number;
  defaultShippingAddress?: number;
  shippingAddresses?: number[];
  billingAddresses?: number[];
}

export interface IInputProps {
  control: Control<IUserInfoFormInput>;
  register: UseFormRegister<IUserInfoFormInput>;
  errors: FieldErrors<IUserInfoFormInput>;
  valueToValidate: string;
  inputName: keyof IUserInfoFormInput;
  trigger: UseFormTrigger<IUserInfoFormInput>;
}

export interface IAddressProps extends IInputProps {
  index: number;
  isDisabled: boolean;
}
//country
export interface ICountryProps {
  control: Control<IUserInfoFormInput>;
  index: number;
  onSelectCountry: (country: string, index: number) => void;
  valueToCheck: string;
  isDisabled: boolean;
  trigger: UseFormTrigger<IUserInfoFormInput>;
}
export interface IPostalCodeProps extends IAddressProps {
  currentCountry: string;
}
