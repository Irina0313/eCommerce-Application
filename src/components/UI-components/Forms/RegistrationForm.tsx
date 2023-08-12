import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { FirstNameInput, LastNameInput } from '../Inputs/NameInputs';
import { IFormInput } from '../../../helpers/Interfaces.ts/FormsInterfaces';
import { EmailInput } from '../Inputs/EmailInput';
import { PasswordInput } from '../Inputs/PasswordInput';
import { DateInput } from '../Inputs/Date';

const defaultTheme = createTheme();
interface RegistrationFormProps {
  onSubmit: (data: IFormInput) => void;
}
export function RegistrationForm({ onSubmit }: RegistrationFormProps) {
  const {
    watch,
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormInput>();

  const watchFirstName: string | undefined = watch('firstName', '');
  const watchLastName: string | undefined = watch('lastName', '');
  const watchMail: string | undefined = watch('mail', '');
  const watchPassword: string | undefined = watch('password', '');
  const watchBirthDate: string | undefined = watch('birthDate', '');

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
            Registration
          </Typography>
          <Box component='form' noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FirstNameInput control={control} register={register} errors={errors} valueToValidate={watchFirstName as string} inputName='firstName' />
              </Grid>
              <Grid item xs={12}>
                <LastNameInput control={control} register={register} errors={errors} valueToValidate={watchLastName as string} inputName='lastName' />
              </Grid>
              <Grid item xs={12}>
                <EmailInput control={control} register={register} errors={errors} valueToValidate={watchMail as string} inputName='mail' />
              </Grid>
              <Grid item xs={12}>
                <PasswordInput control={control} register={register} errors={errors} valueToValidate={watchPassword as string} inputName='password' />
              </Grid>
              <Grid item xs={12}>
                <DateInput control={control} register={register} errors={errors} valueToValidate={watchBirthDate as string} inputName='birthDate' />
              </Grid>
            </Grid>
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }} disabled={Object.keys(errors).length > 0}>
              Submit
            </Button>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Link href='/login' variant='body2'>
                  Already have an account? Log in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
