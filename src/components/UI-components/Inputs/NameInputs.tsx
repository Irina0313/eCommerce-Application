import React from 'react';
import { Controller, UseFormRegister, Control, FieldErrors } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import st from './Inputs.module.scss';
import { useNameValidation } from '../../../hooks/useNameValidation';

interface IRegFormInput {
  firstName: string;
  lastName: string;
  mail?: string;
  password?: string;
}
interface NameInputProps {
  control: Control<IRegFormInput>;
  register: UseFormRegister<IRegFormInput>;
  errors: FieldErrors<IRegFormInput>;
  valueToValidate: string;
}

export function FirstNameInput({ control, register, errors, valueToValidate }: NameInputProps) {
  const { errorsArr, registerParams } = useNameValidation(valueToValidate);
  return (
    <>
      <Controller name='firstName' control={control} defaultValue='' render={({ field }) => <TextField {...register('firstName', registerParams)} {...field} autoComplete='given-name' name='firstName' required fullWidth id='firstName' label='First Name' autoFocus />} />
      {errors.firstName && errorsArr.length > 0 && <p className={`${st.errorMessage}`}>{errorsArr}</p>}
    </>
  );
}

export function LastNameInput({ control, register, errors, valueToValidate }: NameInputProps) {
  const { errorsArr, registerParams } = useNameValidation(valueToValidate);
  return (
    <>
      <Controller name='lastName' control={control} defaultValue='' render={({ field }) => <TextField {...register('lastName', registerParams)} {...field} required fullWidth id='lastName' label='Last Name' name='lastName' autoComplete='family-name' />} />
      {errors.lastName && errorsArr.length > 0 && <p className={`${st.errorMessage}`}>{errorsArr}</p>}
    </>
  );
}
