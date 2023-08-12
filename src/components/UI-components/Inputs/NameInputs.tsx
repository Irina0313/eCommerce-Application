import React from 'react';
import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { useNameValidation } from '../../../hooks/useNameValidation';
import { IInputProps } from '../../../helpers/Interfaces.ts/FormsInterfaces';

export function FirstNameInput({ control, register, errors, valueToValidate, inputName }: IInputProps) {
  const { errorsArr, registerParams } = useNameValidation(valueToValidate);
  const hasError = errors[inputName] && errorsArr.length > 0;
  return (
    <>
      <Controller
        name={inputName}
        control={control}
        defaultValue=''
        render={({ field }) => <TextField {...register(inputName, registerParams)} {...field} autoComplete='given-name' name={inputName} required fullWidth id={inputName} label='First Name' autoFocus error={hasError} helperText={hasError ? `⚠ ${errorsArr}` : ''} />}
      />
    </>
  );
}

export function LastNameInput({ control, register, errors, valueToValidate, inputName }: IInputProps) {
  const { errorsArr, registerParams } = useNameValidation(valueToValidate);
  const hasError = errors[inputName] && errorsArr.length > 0;
  return (
    <>
      <Controller
        name={inputName}
        control={control}
        defaultValue=''
        render={({ field }) => <TextField {...register(inputName, registerParams)} {...field} required fullWidth id={inputName} label='Last Name' name={inputName} autoComplete='family-name' error={hasError} helperText={hasError ? `⚠ ${errorsArr}` : ''} />}
      />
    </>
  );
}
