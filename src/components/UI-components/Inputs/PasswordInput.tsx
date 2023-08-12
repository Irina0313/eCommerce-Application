import React, { useRef, useState } from 'react';
import { Controller, UseFormRegister, RegisterOptions, Control, FieldErrors } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import st from './Inputs.module.scss';
interface IFormInput {
  mail?: string;
  password?: string;
}
interface PasswordFieldProps {
  control: Control<IFormInput>;
  registerPasswordParams: RegisterOptions;
  passwordErrors: string[];
  register: UseFormRegister<IFormInput>;
  errors: FieldErrors<IFormInput>;
}

export function PasswordInput({ control, registerPasswordParams, passwordErrors, register, errors }: PasswordFieldProps) {
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
    <FormControl sx={{ mt: 1 }} fullWidth variant='outlined'>
      <InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel>
      <Controller
        name='password'
        control={control}
        defaultValue=''
        render={({ field }) => (
          <OutlinedInput
            {...field}
            {...register('password', registerPasswordParams)}
            id='outlined-adornment-password'
            type={showPassword ? 'text' : 'password'}
            inputRef={(ref: HTMLInputElement | null) => {
              passwordInputRef.current = ref;
            }}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton aria-label='toggle password visibility' onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge='end'>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label='Password'
            autoComplete='current-password'
          />
        )}
      />
      {errors.password && passwordErrors.length > 0 && <p className={`${st.errorMessage}`}>{passwordErrors}</p>}
    </FormControl>
  );
}
