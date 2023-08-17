import React from 'react';
import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { useSimpleStringValidation } from '../../../../hooks/useSimpleStringValidation';
import { IAddressProps, IPostalCodeProps } from '../../../../helpers/Interfaces.ts/FormsInterfaces';
import { usePostalCodeValidation } from '../../../../hooks/usePostalCodeValidation';

export function StreetInput({ control, register, errors, valueToValidate, inputName, index }: IAddressProps) {
  const targetAddressObject = index === 0 ? 'addresses.0.streetName' : 'addresses.1.streetName';
  const targetName = index === 0 ? 'billingStreet' : 'shippingStreet';
  const { errorsArr, registerParams } = useSimpleStringValidation(valueToValidate as string);
  const hasError = errors[inputName] && errorsArr.length > 0;
  return (
    <>
      <Controller
        name={targetAddressObject}
        control={control}
        defaultValue=''
        render={({ field }) => <TextField {...register(targetAddressObject, registerParams)} {...field} autoComplete={targetName} name={targetName} fullWidth id={targetName} label='Street' autoFocus error={hasError} helperText={hasError ? `⚠ ${errorsArr}` : ''} value={valueToValidate} />}
      />
    </>
  );
}

export function CityInput({ control, register, errors, valueToValidate, inputName, index }: IAddressProps) {
  const targetAddressObject = index === 0 ? 'addresses.0.city' : 'addresses.1.city';
  const targetName = index === 0 ? 'billingCity' : 'shippingCity';
  const { errorsArr, registerParams } = useSimpleStringValidation(valueToValidate);
  const hasError = errors[inputName] && errorsArr.length > 0;
  return (
    <>
      <Controller
        name={targetAddressObject}
        control={control}
        defaultValue=''
        render={({ field }) => <TextField {...register(targetAddressObject, registerParams)} {...field} autoComplete={targetName} name={targetName} fullWidth id={targetName} label='City' autoFocus error={hasError} helperText={hasError ? `⚠ ${errorsArr}` : ''} value={valueToValidate} />}
      />
    </>
  );
}

export function PostalCodeInput({ control, register, errors, valueToValidate, inputName, index, currentCountry }: IPostalCodeProps) {
  const targetAddressObject = index === 0 ? 'addresses.0.postalCode' : 'addresses.1.postalCode';
  const targetName = index === 0 ? 'billingPostalCode' : 'shippingPostalCode';
  const { errorsArr, registerParams } = usePostalCodeValidation(valueToValidate, currentCountry);
  const hasError = errors[inputName] && errorsArr.length > 0;
  return (
    <>
      <Controller
        name={targetAddressObject}
        control={control}
        defaultValue=''
        render={({ field }) => <TextField {...register(targetAddressObject, registerParams)} {...field} autoComplete={targetName} name={targetName} fullWidth id={targetName} label='PostalCode' autoFocus error={hasError} helperText={hasError ? `⚠ ${errorsArr}` : ''} value={valueToValidate} />}
      />
    </>
  );
}
