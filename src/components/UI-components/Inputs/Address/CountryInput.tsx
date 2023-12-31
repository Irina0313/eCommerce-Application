import React from 'react';
import { ICountryProps, ICountryChangeProps } from '../../../../helpers/Interfaces.ts/FormsInterfaces';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import { Countries } from '../../../../hooks/usePostalCodeValidation';

const countriesArr = Object.keys(Countries);

const countryOptions = countriesArr.map((item) => (
  <MenuItem key={item} value={item}>
    {item}
  </MenuItem>
));

export const CountryInput = React.forwardRef(function CountryInput({ index, onSelectCountry, valueToCheck, isDisabled }: ICountryProps, ref) {
  const targetAddressObject = index === 0 ? 'addresses.0.country' : 'addresses.1.country';
  const targetName = index === 0 ? 'billingCountry' : 'shippingCountry';

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id={targetAddressObject}>Country</InputLabel>
        <Select labelId={targetAddressObject} label='Country ' value={valueToCheck} onChange={(event) => onSelectCountry(event.target.value as string, index)} ref={ref} disabled={isDisabled} data-testid={targetName} id={targetName}>
          {countryOptions}
        </Select>
      </FormControl>
    </Box>
  );
});

export const CountryChangeInput = React.forwardRef(function CountryInput({ onSelectCountry, valueToCheck }: ICountryChangeProps, ref) {
  const targetAddressObject = 'address.country';
  const targetName = 'country';

  return (
    <Box sx={{ minWidth: 120, margin: '20px' }}>
      <FormControl fullWidth>
        <InputLabel id={targetAddressObject}>Country</InputLabel>
        <Select labelId={targetAddressObject} label='Country ' value={valueToCheck} onChange={(event) => onSelectCountry(event.target.value as string)} ref={ref} data-testid={targetName} id={targetName}>
          {countryOptions}
        </Select>
      </FormControl>
    </Box>
  );
});
