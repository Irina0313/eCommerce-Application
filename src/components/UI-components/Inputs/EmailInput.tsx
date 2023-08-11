import React from 'react';
import { Controller, UseFormRegister, RegisterOptions, Control } from 'react-hook-form';
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
}

export function EmailInput({ control, registerMailParams, emailErrors, register }: EmailInputProps) {
  return (
    <>
      <Controller name='mail' control={control} defaultValue='' render={({ field }) => <TextField {...register('mail', registerMailParams)} {...field} margin='normal' required fullWidth id='email' label='Email Address' name='email' autoComplete='email' autoFocus />} />
      {emailErrors.length > 0 && <p className={`${st.errorMessage}`}>{emailErrors}</p>}
    </>
  );
}
