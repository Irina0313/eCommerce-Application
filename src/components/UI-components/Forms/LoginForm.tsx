import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import { EmailInput } from '../Inputs/EmailInput';
import { PasswordInput } from '../Inputs/PasswordInput';
import { IUserInfoFormInput } from '../../../helpers/Interfaces.ts/FormsInterfaces';
import { Link as LinkNav } from 'react-router-dom';

const defaultTheme = createTheme();

interface LoginFormProps {
  onSubmit: (data: IUserInfoFormInput) => void;
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const {
    watch,
    register,
    handleSubmit,
    control,
    formState: { errors },
    trigger,
  } = useForm<IUserInfoFormInput>();

  const watchMail: string | undefined = watch('email', '');
  const watchPassword: string | undefined = watch('password', '');

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="div" maxWidth="xs">
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
          <Typography component="h1" variant="h5">
            Log in
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 3, mb: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <EmailInput control={control} register={register} errors={errors} valueToValidate={watchMail as string} inputName="email" trigger={trigger} />
              </Grid>
              <Grid item xs={12}>
                <PasswordInput control={control} register={register} errors={errors} valueToValidate={watchPassword as string} inputName="password" trigger={trigger} />
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 1, mb: 2 }} disabled={Object.keys(errors).length > 0} data-testid={'loginFormBtn'}>
                  Log In
                </Button>
              </Grid>
            </Grid>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <LinkNav to="/registration">{"Don't have an account? Register now"}</LinkNav>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
