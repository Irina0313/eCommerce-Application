import React from 'react';
import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { useEmailValidation } from '../../../hooks/useEmailValidation';
import { IInputProps } from '../../../helpers/Interfaces.ts/FormsInterfaces';

export function EmailInput({ control, register, errors, valueToValidate, inputName, trigger }: IInputProps) {
  const { errorsArr, registerParams } = useEmailValidation(valueToValidate);
  const hasError = errors[inputName] && errorsArr.length > 0;
  return (
    <>
      <Controller
        name={inputName}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...register(inputName, registerParams)}
            {...field}
            margin="normal"
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            error={hasError}
            helperText={hasError ? `⚠  ${errorsArr}` : ''}
            sx={{ marginTop: 0, marginBottom: 0 }}
            data-testid={'email'}
            onChange={(e) => {
              field.onChange(e);
              trigger(inputName);
            }}
          />
        )}
      />
    </>
  );
}
