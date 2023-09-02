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
export interface IUserPasswordChange {
  version: number;
  currentPassword: string;
  newPassword: string;
}

export interface IInputProps {
  control: Control<IUserInfoFormInput>;
  register: UseFormRegister<IUserInfoFormInput>;
  errors: FieldErrors<IUserInfoFormInput>;
  valueToValidate: string;
  inputName: keyof IUserInfoFormInput;
  trigger: UseFormTrigger<IUserInfoFormInput>;
  readOnly: true | false;
  variant: 'filled' | 'outlined' | 'standard';
  controllertName?: string;
}

export interface IPasswordInputProps {
  control: Control<IUserPasswordChange>;
  register: UseFormRegister<IUserPasswordChange>;
  errors: FieldErrors<IUserPasswordChange>;
  valueToValidate: string;
  inputName: keyof IUserPasswordChange;
  trigger: UseFormTrigger<IUserPasswordChange>;
  readOnly: true | false;
  variant: 'filled' | 'outlined' | 'standard';
  label: string;
  display: string;
}
export interface ITitleProps {
  control: Control<IUserInfoFormInput>;
  readOnly: true | false;
  variant: 'filled' | 'outlined' | 'standard';
  onSelectTitle: (title: string) => void;
  valueToValidate: string;
  trigger: UseFormTrigger<IUserInfoFormInput>;
  inputName: keyof IUserInfoFormInput;
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

export interface ITabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
