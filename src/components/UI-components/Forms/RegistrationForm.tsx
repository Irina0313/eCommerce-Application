import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { TitleInput, FirstNameInput, LastNameInput } from '../Inputs/NameInputs';
import { IUserInfoFormInput } from '../../../helpers/Interfaces.ts/FormsInterfaces';
import { EmailInput } from '../Inputs/EmailInput';
import { PasswordInput } from '../Inputs/PasswordInput';
import { DateInput } from '../Inputs/Date';
import { StreetInput, CityInput, PostalCodeInput } from '../Inputs/Address/AddressTextInputs';
import { CountryInput } from '../Inputs/Address/CountryInput';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Countries } from '../../../hooks/usePostalCodeValidation';
import { Link as LinkNav } from 'react-router-dom';

const defaultTheme = createTheme();
interface RegistrationFormProps {
  onSubmit: (data: IUserInfoFormInput) => void;
}

export function RegistrationForm({ onSubmit }: RegistrationFormProps) {
  const {
    watch,
    register,
    handleSubmit,
    control,
    clearErrors,
    formState: { errors },
    setValue,
    trigger,
  } = useForm<IUserInfoFormInput>();

  const watchFirstName: string | undefined = watch('firstName', '');
  const watchLastName: string | undefined = watch('lastName', '');
  const watchMail: string | undefined = watch('email', '');
  const watchPassword: string | undefined = watch('password', '');
  const watchBirthDate: string | undefined = watch('dateOfBirth', '');
  const watchBillingStreet: string | undefined = watch('addresses.0.streetName', '');
  const watchShippingStreet: string | undefined = watch('addresses.1.streetName', '');
  const watchBillingCity: string | undefined = watch('addresses.0.city', '');
  const watchShippingCity: string | undefined = watch('addresses.1.city', '');
  const watchBillingCountry: string | undefined = watch('addresses.0.country', '');
  const watchShippingCountry: string | undefined = watch('addresses.1.country', '');

  const watchBillingPostalCode: string | undefined = watch('addresses.0.postalCode', '');
  const watchShippingPostalCode: string | undefined = watch('addresses.1.postalCode', '');
  const [isShipping, setIsShipping] = useState(false);
  const [isBilling, setIsBilling] = useState(false);

  const [defaultBillingAddressChecked, setDefaultBillingAddressChecked] = useState<boolean>(true);
  const [defaultShippingAddressChecked, setDefaultShippingAddressChecked] = useState<boolean>(true);

  const handleSetAsShippingAddressChange = (checked: boolean) => {
    if (checked) {
      setIsShipping(true);
      setValue('addresses.1.streetName', watchBillingStreet || '');
      setValue('addresses.1.city', watchBillingCity || '');
      setValue('addresses.1.postalCode', watchBillingPostalCode || '');
      setValue('addresses.1.country', watchBillingCountry || 'USA');

      clearErrors('addresses.1.streetName');
      clearErrors('addresses.1.city');
      clearErrors('addresses.1.postalCode');
      clearErrors('addresses.1.country');
    } else {
      setIsShipping(false);
    }
  };

  const handleSetAsBillingAddressChange = (checked: boolean) => {
    if (checked) {
      setIsBilling(true);
      setValue('addresses.0.streetName', watchShippingStreet || '');
      setValue('addresses.0.city', watchShippingCity || '');
      setValue('addresses.0.postalCode', watchShippingPostalCode || '');
      setValue('addresses.0.country', watchShippingCountry || 'USA');

      clearErrors('addresses.0.streetName');
      clearErrors('addresses.0.city');
      clearErrors('addresses.0.postalCode');
      clearErrors('addresses.0.country');
    } else {
      setIsBilling(false);
    }
  };

  const handleDefaultAddressChange = (checked: boolean, addressType: string) => {
    if (addressType === 'billing') {
      setDefaultBillingAddressChecked(checked);
    }
    if (addressType === 'shipping') {
      setDefaultShippingAddressChecked(checked);
    }
  };

  const handleFormSubmit = (data: IUserInfoFormInput) => {
    const formDataWithDefaults = {
      ...data,
      defaultBillingAddress: defaultBillingAddressChecked ? 0 : undefined,
      defaultShippingAddress: defaultShippingAddressChecked ? 1 : undefined,
    };
    const shippingCountry = formDataWithDefaults.addresses[0].country;
    const billingCountry = formDataWithDefaults.addresses[1].country;
    formDataWithDefaults.addresses[0].country = Countries[shippingCountry].code;
    formDataWithDefaults.addresses[1].country = Countries[billingCountry].code;
    onSubmit(formDataWithDefaults);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component='div' maxWidth='xl'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            marginBottom: 8,
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
            <Typography component='h1' variant='h5' margin={2}>
              Registration
            </Typography>
          </Box>

          <Box component='form' noValidate onSubmit={handleSubmit(handleFormSubmit)} sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={2}>
                <TitleInput />
              </Grid>
              <Grid item xs={12} md={5}>
                <FirstNameInput control={control} register={register} errors={errors} valueToValidate={watchFirstName as string} inputName='firstName' trigger={trigger} />
              </Grid>
              <Grid item xs={12} md={5}>
                <LastNameInput control={control} register={register} errors={errors} valueToValidate={watchLastName as string} inputName='lastName' trigger={trigger} />
              </Grid>
              <Grid item xs={12} md={4}>
                <EmailInput control={control} register={register} errors={errors} valueToValidate={watchMail as string} inputName='email' trigger={trigger} />
              </Grid>
              <Grid item xs={12} md={4}>
                <PasswordInput control={control} register={register} errors={errors} valueToValidate={watchPassword as string} inputName='password' trigger={trigger} />
              </Grid>
              <Grid item xs={12} md={4}>
                <DateInput control={control} register={register} errors={errors} valueToValidate={watchBirthDate as string} inputName='dateOfBirth' trigger={trigger} />
              </Grid>
            </Grid>

            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ margin: '20px 0' }}>
              <Box component='div'>
                <Typography component='h5' variant='h6' sx={{ padding: '0 50px 0 30px', display: 'inline-block' }}>
                  Billing Address:
                </Typography>
                <FormControlLabel control={<Checkbox checked={defaultBillingAddressChecked} onChange={(e) => handleDefaultAddressChange(e.target.checked, 'billing')} />} label='Set as default Billing Address' />
                <FormControlLabel control={<Checkbox onChange={(e) => handleSetAsShippingAddressChange(e.target.checked)} />} id='setAsShippingAddress' label='Set as Shipping Address' disabled={isBilling} />
              </Box>

              <Grid item xs={12} md={12}>
                <StreetInput control={control} register={register} errors={errors} valueToValidate={watchBillingStreet} inputName='addresses' index={0} isDisabled={isBilling} trigger={trigger} />
              </Grid>
              <Grid item xs={12} md={4}>
                <CityInput control={control} register={register} errors={errors} valueToValidate={watchBillingCity} inputName='addresses' index={0} isDisabled={isBilling} trigger={trigger} />
              </Grid>
              <Grid item xs={12} md={4}>
                <Controller
                  name='addresses.0.country'
                  control={control}
                  defaultValue='USA'
                  render={({ field }) => (
                    <CountryInput
                      {...field}
                      control={control}
                      index={0}
                      valueToCheck={watchBillingCountry || 'USA'}
                      onSelectCountry={(currCountry) => {
                        field.onChange(currCountry);
                        setValue('addresses.0.country', currCountry);
                      }}
                      ref={field.ref}
                      isDisabled={isBilling}
                      trigger={trigger}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <PostalCodeInput control={control} register={register} errors={errors} valueToValidate={watchBillingPostalCode} inputName='addresses' index={0} currentCountry={watchBillingCountry || 'USA'} isDisabled={isBilling} trigger={trigger} />
              </Grid>
            </Grid>

            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ margin: '20px 0' }}>
              <Typography component='h5' variant='h6' sx={{ padding: '0 30px', display: 'inline-block' }}>
                Shipping Address:
              </Typography>
              <FormControlLabel control={<Checkbox checked={defaultShippingAddressChecked} onChange={(e) => handleDefaultAddressChange(e.target.checked, 'shipping')} />} label='Set as default Shipping Address' />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) => {
                      handleSetAsBillingAddressChange(e.target.checked);
                    }}
                  />
                }
                id='setAsShippingAddress'
                label='Set as Billing Address '
                disabled={isShipping}
              />
              <Grid item xs={12} md={12}>
                <StreetInput control={control} register={register} errors={errors} valueToValidate={watchShippingStreet} inputName='addresses' index={1} isDisabled={isShipping} trigger={trigger} />
              </Grid>
              <Grid item xs={12} md={4}>
                <CityInput control={control} register={register} errors={errors} valueToValidate={watchShippingCity} inputName='addresses' index={1} isDisabled={isShipping} trigger={trigger} />
              </Grid>
              <Grid item xs={12} md={4}>
                <Controller
                  name='addresses.1.country'
                  control={control}
                  defaultValue='USA'
                  render={({ field }) => (
                    <CountryInput
                      {...field}
                      control={control}
                      index={1}
                      valueToCheck={watchShippingCountry || 'USA'}
                      onSelectCountry={(currCountry) => {
                        field.onChange(currCountry);
                        setValue('addresses.1.country', currCountry);
                      }}
                      ref={field.ref}
                      isDisabled={isShipping}
                      trigger={trigger}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <PostalCodeInput control={control} register={register} errors={errors} valueToValidate={watchShippingPostalCode} inputName='addresses' index={1} currentCountry={watchShippingCountry || 'USA'} isDisabled={isShipping} trigger={trigger} />
              </Grid>
            </Grid>

            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }} disabled={Object.keys(errors).length > 0}>
              Submit
            </Button>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <LinkNav to='/login'>Already have an account? Log in</LinkNav>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
