import { UseFormRegister, Control, FieldErrors } from 'react-hook-form';

export interface IFormInput {
  title?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  dateOfBirth?: string;
  country?: string;
}

export interface IInputProps {
  control: Control<IFormInput>;
  register: UseFormRegister<IFormInput>;
  errors: FieldErrors<IFormInput>;
  valueToValidate: string;
  inputName: keyof IFormInput;
}
