import React, { useRef, useState } from 'react';
import { Controller } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { usePasswordValidation } from '../../../hooks/usePasswordValidation';
import { IInputProps } from '../../../helpers/Interfaces.ts/FormsInterfaces';
import FormHelperText from '@mui/material/FormHelperText';

export function PasswordInput({ control, register, errors, valueToValidate, inputName }: IInputProps) {
  const { errorsArr, registerParams } = usePasswordValidation(valueToValidate);
  const hasError = errors[inputName] && errorsArr.length > 0;
  const passwordInputRef = useRef<HTMLInputElement | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    if (passwordInputRef.current) {
      const selectionStart = passwordInputRef.current.selectionStart;
      setShowPassword((show) => !show);
      setTimeout(() => {
        passwordInputRef.current?.focus();
        if (selectionStart !== null) {
          passwordInputRef.current?.setSelectionRange(selectionStart, selectionStart);
        }
      }, 0.005);
    }
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <FormControl sx={{ mt: 1 }} fullWidth variant='outlined' error={hasError} required>
      <InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel>
      <Controller
        name={inputName}
        control={control}
        defaultValue=''
        render={({ field }) => (
          <OutlinedInput
            {...field}
            {...register(inputName, registerParams)}
            id='outlined-adornment-password'
            type={showPassword ? 'text' : inputName}
            inputRef={(ref: HTMLInputElement | null) => {
              passwordInputRef.current = ref;
            }}
            sx={{ marginTop: 0, marginBottom: 0 }}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton aria-label='toggle password visibility' onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge='end'>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label={inputName}
            autoComplete='current-password'
          />
        )}
      />
      <FormHelperText>{hasError ? `⚠ ${errorsArr}` : ''}</FormHelperText>
    </FormControl>
  );
}
