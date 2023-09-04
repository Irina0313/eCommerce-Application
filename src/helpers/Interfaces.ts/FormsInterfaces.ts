import { UseFormRegister, Control, FieldErrors, UseFormTrigger } from 'react-hook-form';

export interface IUserAddress {
  streetName: string;
  city: string;
  country: string;
  postalCode: string;
}
export interface IUserInfoFormInput {
  title?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  dateOfBirth?: string;
  addresses: IUserAddress[];
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

export interface IAddressChangeProps {
  control: Control<IUserAddress>;
  register: UseFormRegister<IUserAddress>;
  errors: FieldErrors<IUserAddress>;
  valueToValidate: string;
  inputName: keyof IUserAddress;
  trigger: UseFormTrigger<IUserAddress>;
  display: string;
  value: string;
  currentCountry: string;
  isDisabled: boolean;
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

export interface ICountryProps {
  control: Control<IUserInfoFormInput>;
  index: number;
  onSelectCountry: (country: string, index: number) => void;
  valueToCheck: string;
  isDisabled: boolean;
  trigger: UseFormTrigger<IUserInfoFormInput>;
}

export interface ICountryChangeProps {
  inputName: keyof IUserAddress;
  onSelectCountry: (country: string) => void;
  valueToCheck: string;
  isDisabled: boolean;
  trigger: UseFormTrigger<IUserAddress>;
  display: string;
}
export interface IPostalCodeProps extends IAddressProps {
  currentCountry: string;
}

export interface ITabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
