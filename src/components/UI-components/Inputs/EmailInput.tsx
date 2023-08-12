import React from 'react';
import { Controller, UseFormRegister, RegisterOptions, Control, FieldErrors } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import st from './Inputs.module.scss';

interface IFormInput {
  mail?: string;
  password?: string;
}
interface EmailInputProps {
  control: Control<IFormInput>;
  registerMailParams: RegisterOptions;
  emailErrors: string[];
  register: UseFormRegister<IFormInput>;
  errors: FieldErrors<IFormInput>;
}

export function EmailInput({ control, registerMailParams, emailErrors, register, errors }: EmailInputProps) {
  return (
    <>
      <Controller name='mail' control={control} defaultValue='' render={({ field }) => <TextField {...register('mail', registerMailParams)} {...field} margin='normal' fullWidth id='email' label='Email' name='email' autoComplete='email' autoFocus />} />
      {errors.mail && emailErrors.length > 0 && <p className={`${st.errorMessage}`}>{emailErrors}</p>}
    </>
  );
}
