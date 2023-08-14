import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { useSimpleStringValidation } from '../../../hooks/useSimpleStringValidation';
import { IInputProps } from '../../../helpers/Interfaces.ts/FormsInterfaces';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';

export function TitleInput() {
  const [title, setTitle] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setTitle(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id='title'>Title</InputLabel>
        <Select labelId='title' id='title' value={title} label='Title' onChange={handleChange}>
          <MenuItem value={'Mr'}>Mr</MenuItem>
          <MenuItem value={'Mrs'}>Mrs</MenuItem>
          <MenuItem value={'Ms'}>Ms</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export function FirstNameInput({ control, register, errors, valueToValidate, inputName }: IInputProps) {
  const { errorsArr, registerParams } = useSimpleStringValidation(valueToValidate);
  const hasError = errors[inputName] && errorsArr.length > 0;
  return (
    <>
      <Controller
        name={inputName}
        control={control}
        defaultValue=''
        render={({ field }) => <TextField {...register(inputName, registerParams)} {...field} autoComplete='given-name' name={inputName} fullWidth id={inputName} label='First Name' autoFocus error={hasError} helperText={hasError ? `⚠ ${errorsArr}` : ''} />}
      />
    </>
  );
}

export function LastNameInput({ control, register, errors, valueToValidate, inputName }: IInputProps) {
  const { errorsArr, registerParams } = useSimpleStringValidation(valueToValidate);
  const hasError = errors[inputName] && errorsArr.length > 0;
  return (
    <>
      <Controller
        name={inputName}
        control={control}
        defaultValue=''
        render={({ field }) => <TextField {...register(inputName, registerParams)} {...field} fullWidth id={inputName} label='Last Name' name={inputName} autoComplete='family-name' error={hasError} helperText={hasError ? `⚠ ${errorsArr}` : ''} />}
      />
    </>
  );
}
