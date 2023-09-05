import React from 'react';
import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { useSimpleStringValidation, useOneCharacterValidation } from '../../../../hooks/useSimpleStringValidation';
import { IAddressProps, IPostalCodeProps, IAddressChangeProps } from '../../../../helpers/Interfaces/FormsInterfaces';
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
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...register(targetAddressObject, registerParams)}
            {...field}
            autoComplete={targetName}
            name={targetName}
            fullWidth
            id={targetName}
            label="Street"
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

export function StreetChangeInput({ control, register, errors, valueToValidate, trigger, inputName, display, value }: IAddressChangeProps) {
  const { errorsArr, registerParams } = useOneCharacterValidation(valueToValidate as string);
  const hasError = errors[inputName] && errorsArr.length > 0;
  return (
    <>
      <Controller
        name={inputName}
        control={control}
        defaultValue={value}
        render={({ field }) => (
          <TextField
            {...register(inputName, registerParams)}
            {...field}
            autoComplete={inputName}
            name={inputName}
            fullWidth
            id={inputName}
            label="Street"
            autoFocus
            error={hasError}
            helperText={hasError ? `⚠  ${errorsArr}` : ''}
            placeholder={value}
            value={valueToValidate}
            data-testid={inputName}
            onChange={(e) => {
              field.onChange(e);
              trigger(inputName);
            }}
            sx={{ display: { display }, margin: '20px 0' }}
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
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...register(targetAddressObject, registerParams)}
            {...field}
            autoComplete={targetName}
            name={targetName}
            fullWidth
            id={targetName}
            label="City"
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

export function CityChangeInput({ control, register, errors, valueToValidate, trigger, display, inputName }: IAddressChangeProps) {
  const { errorsArr, registerParams } = useSimpleStringValidation(valueToValidate);
  const hasError = errors.city && errorsArr.length > 0;

  return (
    <>
      <Controller
        name={inputName}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...register(inputName, registerParams)}
            {...field}
            autoComplete={inputName}
            name={inputName}
            fullWidth
            id={inputName}
            label="City"
            autoFocus
            error={hasError}
            helperText={hasError ? `⚠ ${errorsArr}` : ''}
            value={valueToValidate}
            data-testid={inputName}
            onChange={(e) => {
              field.onChange(e);
              trigger(inputName);
            }}
            sx={{ display: { display }, margin: '20px 0' }}
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
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...register(targetAddressObject, registerParams)}
            {...field}
            autoComplete={targetName}
            name={targetName}
            fullWidth
            id={targetName}
            label="PostalCode"
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

export function PostalCodeChangeInput({ control, register, errors, valueToValidate, currentCountry, isDisabled, trigger, inputName, display }: IAddressChangeProps) {
  const { errorsArr, registerParams } = usePostalCodeValidation(valueToValidate, currentCountry);
  const hasError = errors.postalCode && errorsArr.length > 0;
  return (
    <>
      <Controller
        name={inputName}
        control={control}
        defaultValue="12345"
        render={({ field }) => (
          <TextField
            {...register(inputName, registerParams)}
            {...field}
            autoComplete={inputName}
            name={inputName}
            fullWidth
            id={inputName}
            label="PostalCode"
            autoFocus
            error={hasError}
            helperText={hasError ? `⚠ ${errorsArr}` : ''}
            value={valueToValidate}
            disabled={isDisabled}
            data-testid={inputName}
            onChange={(e) => {
              field.onChange(e);
              trigger(inputName);
            }}
            sx={{ display: { display }, margin: '20px 0' }}
          />
        )}
      />
    </>
  );
}
