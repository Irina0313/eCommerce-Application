import { UseFormRegister, Control, FieldErrors } from 'react-hook-form';

export interface IFormInput {
  title?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
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
}

export interface IInputProps {
  control: Control<IFormInput>;
  register: UseFormRegister<IFormInput>;
  errors: FieldErrors<IFormInput>;
  valueToValidate: string;
  inputName: keyof IFormInput;
}

export interface IAddressProps extends IInputProps {
  index: number;
  isDisabled: boolean;
}
//country
export interface ICountryProps {
  control: Control<IFormInput>;
  index: number;
  onSelectCountry: (country: string, index: number) => void;
  valueToCheck: string;
  isDisabled: boolean;
}
export interface IPostalCodeProps extends IAddressProps {
  currentCountry: string;
}
