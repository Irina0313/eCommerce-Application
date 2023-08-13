import { UseFormRegister, Control, FieldErrors } from 'react-hook-form';

export interface IFormInput {
  firstName?: string;
  lastName?: string;
  mail?: string;
  password?: string;
  birthDate?: string;
}

export interface IInputProps {
  control: Control<IFormInput>;
  register: UseFormRegister<IFormInput>;
  errors: FieldErrors<IFormInput>;
  valueToValidate: string;
  inputName: keyof IFormInput;
}