import React, { useState } from 'react';
import { ICountryProps } from '../../../../helpers/Interfaces.ts/FormsInterfaces';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
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

export function CountryInput({ index, onSelectCountry }: ICountryProps) {
  const [country, setCountry] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    const selectedCountry = event.target.value as string;
    setCountry(selectedCountry);
    onSelectCountry(selectedCountry, index);
  };
  const targetAddressObject = index === 0 ? 'addresses.0.country' : 'addresses.1.country';
  const targetName = index === 0 ? 'billingCountry' : 'shippingCountry';
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id={targetAddressObject}>Country</InputLabel>
        <Select labelId={targetAddressObject} id={targetName} value={country} label='Country' onChange={handleChange}>
          {countryOptions}
        </Select>
      </FormControl>
    </Box>
  );
}
