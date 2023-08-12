import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
//import FormControlLabel from '@mui/material/FormControlLabel';
//import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { FirstNameInput, LastNameInput } from '../Inputs/NameInputs';
import { EmailInput } from '../Inputs/EmailInput';

interface IRegFormInput {
  firstName: string;
  lastName: string;
  mail?: string;
  password?: string;
}
const defaultTheme = createTheme();
interface RegistrationFormProps {
  onSubmit: (data: IRegFormInput) => void;
}
export function RegistrationForm({ onSubmit }: RegistrationFormProps) {
  const {
    watch,
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IRegFormInput>();

  const watchFirstName: string | undefined = watch('firstName', '');
  const watchLastName: string | undefined = watch('lastName', '');
  const watchMail: string | undefined = watch('mail', '');
  // const { emailErrors, registerMailParams } = useEmailValidation(watchMail as string);
  //const watchPassword: string | undefined = watch('password', '');
  //const { passwordErrors, registerPasswordParams } = usePasswordValidation(watchPassword as string);

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
          <Box component='form' noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FirstNameInput control={control} register={register} errors={errors} valueToValidate={watchFirstName} />
              </Grid>
              <Grid item xs={12}>
                <LastNameInput control={control} register={register} errors={errors} valueToValidate={watchLastName} />
              </Grid>
              <Grid item xs={12}>
                {/*<EmailInput controlRegForm={control} registerRegForm={register} errors={errors} valueToValidate={watchMail as string} />*/}

                <TextField required fullWidth id='email' label='Email Address' name='email' autoComplete='email' />
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth name='password' label='Password' type='password' id='password' autoComplete='new-password' />
              </Grid>
            </Grid>
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
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
