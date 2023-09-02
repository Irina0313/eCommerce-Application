import React from 'react';
import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { useSimpleStringValidation } from '../../../hooks/useSimpleStringValidation';
import { IInputProps, ITitleProps } from '../../../helpers/Interfaces.ts/FormsInterfaces';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';

const titleArr = ['Mr', 'Mrs', 'Ms'];

const titleOptions = titleArr.map((item) => (
  <MenuItem key={item} value={item}>
    {item}
  </MenuItem>
));

export function TitleInput({ readOnly, variant, onSelectTitle, valueToValidate }: ITitleProps) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="title">Title</InputLabel>
        <Select labelId="title" id="title" label="Title " value={valueToValidate} onChange={(event) => onSelectTitle(event.target.value as string)} readOnly={readOnly} variant={variant}>
          {titleOptions}
        </Select>
      </FormControl>
    </Box>
  );
}

export function FirstNameInput({ control, register, errors, valueToValidate, inputName, trigger, readOnly, variant }: IInputProps) {
  const { errorsArr, registerParams } = useSimpleStringValidation(valueToValidate);
  const hasError = errors[inputName] && errorsArr.length > 0;
  return (
    <>
      <Controller
        name={inputName}
        control={control}
        defaultValue={valueToValidate}
        render={({ field }) => (
          <TextField
            {...register(inputName, registerParams)}
            {...field}
            autoComplete="given-name"
            InputProps={{
              readOnly: readOnly,
            }}
            name={inputName}
            fullWidth
            id={inputName}
            variant={variant}
            label="First Name"
            autoFocus
            error={hasError}
            helperText={hasError ? `⚠ ${errorsArr}` : ''}
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

export function LastNameInput({ control, register, errors, valueToValidate, inputName, trigger, readOnly, variant }: IInputProps) {
  const { errorsArr, registerParams } = useSimpleStringValidation(valueToValidate);
  const hasError = errors[inputName] && errorsArr.length > 0;
  return (
    <>
      <Controller
        name={inputName}
        control={control}
        defaultValue={valueToValidate}
        render={({ field }) => (
          <TextField
            {...register(inputName, registerParams)}
            {...field}
            fullWidth
            id={inputName}
            variant={variant}
            label="Last Name"
            name={inputName}
            autoComplete="family-name"
            InputProps={{
              readOnly: readOnly,
            }}
            error={hasError}
            helperText={hasError ? `⚠ ${errorsArr}` : ''}
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
