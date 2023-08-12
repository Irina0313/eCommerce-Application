import React from 'react';
import { Controller, UseFormRegister, Control, FieldErrors } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import st from './Inputs.module.scss';
import { useEmailValidation } from '../../../hooks/useEmailValidation';
interface IFormInput {
  mail?: string;
  password?: string;
}
interface IEmailInputProps {
  control: Control<IFormInput>;
  register: UseFormRegister<IFormInput>;
  errors: FieldErrors<IFormInput>;
  valueToValidate: string;
}

export function EmailInput({ control, register, errors, valueToValidate }: IEmailInputProps) {
  const { errorsArr, registerParams } = useEmailValidation(valueToValidate);
  return (
    <>
      <Controller name='mail' control={control} defaultValue='' render={({ field }) => <TextField {...register('mail', registerParams)} {...field} margin='normal' fullWidth id='email' label='Email' name='email' autoComplete='email' autoFocus />} />
      {errors.mail && errorsArr.length > 0 && <p className={`${st.errorMessage}`}>{errorsArr}</p>}
    </>
  );
}
