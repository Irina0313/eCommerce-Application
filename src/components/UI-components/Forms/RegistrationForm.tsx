import React, { useState } from 'react';
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
import { TitleInput, FirstNameInput, LastNameInput } from '../Inputs/NameInputs';
import { IFormInput } from '../../../helpers/Interfaces.ts/FormsInterfaces';
import { EmailInput } from '../Inputs/EmailInput';
import { PasswordInput } from '../Inputs/PasswordInput';
import { DateInput } from '../Inputs/Date';
import { StreetInput, CityInput, PostalCodeInput } from '../Inputs/Address/AddressTextInputs';
import { CountryInput } from '../Inputs/Address/CountryInput';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

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
  const watchMail: string | undefined = watch('email', '');
  const watchPassword: string | undefined = watch('password', '');
  const watchBirthDate: string | undefined = watch('dateOfBirth', '');
  const watchBillingStreet: string | undefined = watch('addresses.0.streetName', '');
  const watchShippingStreet: string | undefined = watch('addresses.1.streetName', '');
  const watchBillingCity: string | undefined = watch('addresses.0.city', '');
  const watchShippingCity: string | undefined = watch('addresses.1.city', '');
  const watchBillingPostalCode: string | undefined = watch('addresses.0.postalCode', '');
  const watchShippingPostalCode: string | undefined = watch('addresses.1.postalCode', '');

  //copy value from billing to shipping
  const [copyBillingStreet, setCopyBillingStreet] = useState<boolean>(false);
  const [copyBillingCity, setCopyBillingCity] = useState<boolean>(false);

  const handleSetAsShippingAddressChange = (checked: boolean) => {
    setCopyBillingStreet(checked);
    setCopyBillingCity(checked);
  };

  //const [copyShippingStreet, setCopySgippingStreet] = useState<boolean>(false);

  const [defaultBillingAddressChecked, setDefaultBillingAddressChecked] = useState<boolean>(true);
  const [defaultShippingAddressChecked, setDefaultShippingAddressChecked] = useState<boolean>(true);
  const handleDefaultAddressChange = (checked: boolean, addressType: string) => {
    if (addressType === 'billing') {
      setDefaultBillingAddressChecked(checked);
    }
    if (addressType === 'shipping') {
      setDefaultShippingAddressChecked(checked);
    }
  };

  const handleFormSubmit = (data: IFormInput) => {
    const formDataWithDefaults = {
      ...data,
      defaultBillingAddress: defaultBillingAddressChecked ? 0 : undefined,
      defaultShippingAddress: defaultShippingAddressChecked ? 1 : undefined,
    };

    onSubmit(formDataWithDefaults);
  };

  const [selectedBillingCountry, setSelectedBillingCountry] = useState<string>('');
  const [selectedShippingCountry, setSelectedShippingCountry] = useState<string>('');

  const handleCountryChange = (country: string, index: number) => {
    if (index === 0) {
      setSelectedBillingCountry(country);
    } else if (index === 1) {
      setSelectedShippingCountry(country);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component='div' maxWidth='xl'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <Box
            component='div'
            sx={{
              mt: 1,
              width: '100%',
              display: 'flex',
              flexWrap: 'wrap',
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
          </Box>

          <Box component='form' noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={2}>
                <TitleInput />
              </Grid>
              <Grid item xs={12} md={5}>
                <FirstNameInput control={control} register={register} errors={errors} valueToValidate={watchFirstName as string} inputName='firstName' />
              </Grid>
              <Grid item xs={12} md={5}>
                <LastNameInput control={control} register={register} errors={errors} valueToValidate={watchLastName as string} inputName='lastName' />
              </Grid>
              <Grid item xs={12} md={4}>
                <EmailInput control={control} register={register} errors={errors} valueToValidate={watchMail as string} inputName='email' />
              </Grid>
              <Grid item xs={12} md={4}>
                <PasswordInput control={control} register={register} errors={errors} valueToValidate={watchPassword as string} inputName='password' />
              </Grid>
              <Grid item xs={12} md={4}>
                <DateInput control={control} register={register} errors={errors} valueToValidate={watchBirthDate as string} inputName='dateOfBirth' />
              </Grid>
            </Grid>

            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ margin: '20px 0' }}>
              <Box component='div'>
                <Typography component='h5' variant='h6' sx={{ padding: '0 50px 0 30px', display: 'inline-block' }}>
                  Billing Address:
                </Typography>
                <FormControlLabel control={<Checkbox checked={defaultBillingAddressChecked} onChange={(e) => handleDefaultAddressChange(e.target.checked, 'billing')} />} label='Set as default Billing Address' />
                <FormControlLabel control={<Checkbox onChange={(e) => handleSetAsShippingAddressChange(e.target.checked)} />} id='setAsShippingAddress' label='Set as Shipping Address' />
              </Box>

              <Grid item xs={12} md={12}>
                <StreetInput control={control} register={register} errors={errors} valueToValidate={watchBillingStreet} inputName='addresses' index={0} />
              </Grid>
              <Grid item xs={12} md={4}>
                <CityInput control={control} register={register} errors={errors} valueToValidate={watchBillingCity as string} inputName='addresses' index={0} />
              </Grid>
              <Grid item xs={12} md={4}>
                <CountryInput index={0} onSelectCountry={handleCountryChange} />
              </Grid>
              <Grid item xs={12} md={4}>
                <PostalCodeInput control={control} register={register} errors={errors} valueToValidate={watchBillingPostalCode as string} inputName='addresses' index={0} currentCountry={selectedBillingCountry} />
              </Grid>
            </Grid>

            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ margin: '20px 0' }}>
              <Typography component='h5' variant='h6' sx={{ padding: '0 30px', display: 'inline-block' }}>
                Shipping Address:
              </Typography>
              <FormControlLabel control={<Checkbox checked={defaultShippingAddressChecked} onChange={(e) => handleDefaultAddressChange(e.target.checked, 'shipping')} />} label='Set as default Shipping Address' />
              <FormControlLabel control={<Checkbox />} id='setAsShippingAddress' label='Set as Billing Address' />
              <Grid item xs={12} md={12}>
                <StreetInput control={control} register={register} errors={errors} valueToValidate={copyBillingStreet ? watchBillingStreet : watchShippingStreet} inputName='addresses' index={1} />
              </Grid>
              <Grid item xs={12} md={4}>
                <CityInput control={control} register={register} errors={errors} valueToValidate={copyBillingCity ? watchBillingCity : watchShippingCity} inputName='addresses' index={1} />
              </Grid>
              <Grid item xs={12} md={4}>
                <CountryInput index={1} onSelectCountry={handleCountryChange} />
              </Grid>
              <Grid item xs={12} md={4}>
                <PostalCodeInput control={control} register={register} errors={errors} valueToValidate={watchShippingPostalCode as string} inputName='addresses' index={1} currentCountry={selectedShippingCountry} />
              </Grid>
            </Grid>

            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }} disabled={Object.keys(errors).length > 0} onClick={handleSubmit(handleFormSubmit)}>
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
