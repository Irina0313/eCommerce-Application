import React from 'react';
import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { useSimpleStringValidation, useOneCharacterValidation } from '../../../../hooks/useSimpleStringValidation';
import { IAddressProps, IPostalCodeProps, IAddressChangeProps } from '../../../../helpers/Interfaces.ts/FormsInterfaces';
import { usePostalCodeValidation } from '../../../../hooks/usePostalCodeValidation';

export function StreetInput({ control, register, errors, valueToValidate, index, isDisabled, trigger }: IAddressProps) {
  const targetAddressObject = index === 0 ? 'addresses.0.streetName' : 'addresses.1.streetName';
  const targetName = index === 0 ? 'billingStreet' : 'shippingStreet';
  const { errorsArr, registerParams } = useOneCharacterValidation(valueToValidate as string);
  const hasError = index === 0 ? errors.addresses?.[0]?.streetName && errorsArr.length > 0 : errors.addresses?.[1]?.streetName && errorsArr.length > 0;
  return (
    <>
      <Controller
        name={targetAddressObject}
        control={control}
        defaultValue=''
        render={({ field }) => (
          <TextField
            {...register(targetAddressObject, registerParams)}
            {...field}
            autoComplete={targetName}
            name={targetName}
            fullWidth
            id={targetName}
            label='Street'
            autoFocus
            error={hasError}
            helperText={hasError ? `⚠  ${errorsArr}` : ''}
            value={valueToValidate}
            disabled={isDisabled}
            data-testid={targetName}
            onChange={(e) => {
              field.onChange(e);
              trigger(targetAddressObject);
            }}
          />
        )}
      />
    </>
  );
}

export function StreetChangeInput({ control, register, errors, valueToValidate, trigger }: IAddressChangeProps) {
  const targetAddressObject = 'address.streetName';
  const targetName = 'street';
  const { errorsArr, registerParams } = useOneCharacterValidation(valueToValidate as string);
  const hasError = errors.address?.streetName && errorsArr.length > 0;
  return (
    <>
      <Controller
        name={targetAddressObject}
        control={control}
        defaultValue={valueToValidate}
        render={({ field }) => (
          <TextField
            {...register(targetAddressObject, registerParams)}
            {...field}
            autoComplete={targetName}
            name={targetName}
            id={targetName}
            label='Street'
            autoFocus
            error={hasError}
            helperText={hasError ? `⚠  ${errorsArr}` : ''}
            value={valueToValidate}
            data-testid={targetName}
            onChange={(e) => {
              field.onChange(e);
              trigger(targetAddressObject);
            }}
            sx={{ margin: '20px' }}
          />
        )}
      />
    </>
  );
}

export function CityInput({ control, register, errors, valueToValidate, index, isDisabled, trigger }: IAddressProps) {
  const targetAddressObject = index === 0 ? 'addresses.0.city' : 'addresses.1.city';
  const targetName = index === 0 ? 'billingCity' : 'shippingCity';
  const { errorsArr, registerParams } = useSimpleStringValidation(valueToValidate);
  const hasError = index === 0 ? errors.addresses?.[0]?.city && errorsArr.length > 0 : errors.addresses?.[1]?.city && errorsArr.length > 0;

  return (
    <>
      <Controller
        name={targetAddressObject}
        control={control}
        defaultValue=''
        render={({ field }) => (
          <TextField
            {...register(targetAddressObject, registerParams)}
            {...field}
            autoComplete={targetName}
            name={targetName}
            fullWidth
            id={targetName}
            label='City'
            autoFocus
            error={hasError}
            helperText={hasError ? `⚠ ${errorsArr}` : ''}
            value={valueToValidate}
            disabled={isDisabled}
            data-testid={targetName}
            onChange={(e) => {
              field.onChange(e);
              trigger(targetAddressObject);
            }}
          />
        )}
      />
    </>
  );
}

export function CityChangeInput({ control, register, errors, valueToValidate, trigger }: IAddressChangeProps) {
  const targetAddressObject = 'address.city';
  const targetName = 'city';
  const { errorsArr, registerParams } = useSimpleStringValidation(valueToValidate);
  const hasError = errors.address?.city && errorsArr.length > 0;

  return (
    <>
      <Controller
        name={targetAddressObject}
        control={control}
        defaultValue={valueToValidate}
        render={({ field }) => (
          <TextField
            {...register(targetAddressObject, registerParams)}
            {...field}
            autoComplete={targetName}
            name={targetName}
            id={targetName}
            label='City'
            autoFocus
            error={hasError}
            helperText={hasError ? `⚠ ${errorsArr}` : ''}
            value={valueToValidate}
            data-testid={targetName}
            onChange={(e) => {
              field.onChange(e);
              trigger(targetAddressObject);
            }}
            sx={{ margin: '20px' }}
          />
        )}
      />
    </>
  );
}
export function PostalCodeInput({ control, register, errors, valueToValidate, index, currentCountry, isDisabled, trigger }: IPostalCodeProps) {
  const targetAddressObject = index === 0 ? 'addresses.0.postalCode' : 'addresses.1.postalCode';
  const targetName = index === 0 ? 'billingPostalCode' : 'shippingPostalCode';
  const { errorsArr, registerParams } = usePostalCodeValidation(valueToValidate, currentCountry);
  const hasError = index === 0 ? errors.addresses?.[0]?.postalCode && errorsArr.length > 0 : errors.addresses?.[1]?.postalCode && errorsArr.length > 0;
  return (
    <>
      <Controller
        name={targetAddressObject}
        control={control}
        defaultValue=''
        render={({ field }) => (
          <TextField
            {...register(targetAddressObject, registerParams)}
            {...field}
            autoComplete={targetName}
            name={targetName}
            fullWidth
            id={targetName}
            label='PostalCode'
            autoFocus
            error={hasError}
            helperText={hasError ? `⚠ ${errorsArr}` : ''}
            value={valueToValidate}
            disabled={isDisabled}
            data-testid={targetName}
            onChange={(e) => {
              field.onChange(e);
              trigger(targetAddressObject);
            }}
          />
        )}
      />
    </>
  );
}

export function PostalCodeChangeInput({ control, register, errors, valueToValidate, trigger, currentCountry }: IAddressChangeProps) {
  const targetAddressObject = 'address.postalCode';
  const targetName = 'postalCode';
  const { errorsArr, registerParams } = usePostalCodeValidation(valueToValidate, currentCountry || 'USA');
  const hasError = errors.address?.postalCode && errorsArr.length > 0;
  return (
    <>
      <Controller
        name={targetAddressObject}
        control={control}
        defaultValue={valueToValidate}
        render={({ field }) => (
          <TextField
            {...register(targetAddressObject, registerParams)}
            {...field}
            autoComplete={targetName}
            name={targetName}
            id={targetName}
            label='PostalCode'
            autoFocus
            error={hasError}
            helperText={hasError ? `⚠ ${errorsArr}` : ''}
            value={valueToValidate}
            data-testid={targetName}
            onChange={(e) => {
              field.onChange(e);
              trigger(targetAddressObject);
            }}
            sx={{ margin: '20px' }}
          />
        )}
      />
    </>
  );
}
