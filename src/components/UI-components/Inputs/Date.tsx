import React from 'react';
import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { useBirthDateValidation } from '../../../hooks/useDateValidation';
import { IInputProps } from '../../../helpers/Interfaces.ts/FormsInterfaces';

export function DateInput({ control, register, errors, valueToValidate, inputName, trigger }: IInputProps) {
  let errorsArr: string[] = [];
  let registerParams = {};

  if (inputName === 'dateOfBirth') {
    const result = useBirthDateValidation(valueToValidate);
    errorsArr = result.errorsArr;
    registerParams = result.registerParams;
  }

  const hasError = errors[inputName] && errorsArr.length > 0;

  return (
    <>
      <Controller
        name={inputName}
        control={control}
        defaultValue=''
        render={({ field }) => (
          <>
            <TextField
              {...register(`${inputName}`, registerParams)}
              {...field}
              margin='normal'
              type='date'
              fullWidth
              id={inputName}
              name={inputName}
              label='Birth Date'
              autoComplete={inputName}
              autoFocus
              error={hasError}
              helperText={hasError ? `⚠ ${errorsArr}` : ''}
              sx={{ marginTop: 0, marginBottom: 0 }}
              InputLabelProps={{ shrink: true }}
              inputProps={{ placeholder: 'dd/mm/yyyy' }}
              onChange={(e) => {
                field.onChange(e);
                trigger(inputName);
              }}
            />
          </>
        )}
      />
    </>
  );
}
