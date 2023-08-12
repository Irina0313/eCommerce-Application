import React, { useState, useRef } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { usePasswordValidation } from '../../hooks/usePasswordValidation';
import { useEmailValidation } from '../../hooks/useEmailValidation';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { EmailInput } from '../../components/UI-components/Inputs/EmailInput';
import { PasswordInput } from '../../components/UI-components/Inputs/PasswordInput';

interface IFormInput {
  mail?: string;
  password?: string;
}

const defaultTheme = createTheme();

export function LoginPage() {
  const {
    watch,
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormInput>();

  const watchMail: string | undefined = watch('mail', '');
  const { emailErrors, registerMailParams } = useEmailValidation(watchMail as string);
  const watchPassword: string | undefined = watch('password', '');
  const { passwordErrors, registerPasswordParams } = usePasswordValidation(watchPassword as string);

  const onSubmit = (data: IFormInput) => {
    if (Object.keys(errors).length === 0) {
      alert(JSON.stringify(data));
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Log in
          </Typography>
          <Box component='form' onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
            <EmailInput control={control} registerMailParams={registerMailParams} emailErrors={emailErrors} register={register} errors={errors} />
            <PasswordInput control={control} registerPasswordParams={registerPasswordParams} passwordErrors={passwordErrors} register={register} errors={errors} />
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }} disabled={Object.keys(errors).length > 0}>
              Log In
            </Button>
            <Grid container>
              <Grid item>
                <Link href='/registation' variant='body2'>
                  {"Don't have an account? Register now"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
