import React from 'react';
//import { Controller } from 'react-hook-form';
import { ICountryProps } from '../../../../helpers/Interfaces.ts/FormsInterfaces';
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

/* export function CountryInput({control,  index, onSelectCountry, setAsShipping, setAsBilling }: ICountryProps) {
  console.log('setAsShipping', setAsShipping, 'setAsBilling', setAsBilling);
  const [selectedCountry, setSelectedCountry] = useState('');


  const handleChange = (event: SelectChangeEvent) => {
    const selectedCountry = event.target.value as string;
    setSelectedCountry(selectedCountry); 
    onSelectCountry(selectedCountry, index);
  };

  const targetAddressObject = index === 0 ? 'addresses.0.country' : 'addresses.1.country';
  const targetName = index === 0 ? 'billingCountry' : 'shippingCountry';
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id={targetAddressObject}>Country</InputLabel>
        <Controller
          name={targetAddressObject}
          control={control}
          defaultValue=''
          render={({ field }) => (
            <Select {...field} labelId={targetAddressObject} id={targetName} value={selectedCountry} label='Country' onChange={handleChange}>
              {countryOptions}
            </Select>
          )}
        />
      </FormControl>
    </Box>
  );
} */
export const CountryInput = React.forwardRef(function CountryInput({ index, onSelectCountry, valueToCheck }: ICountryProps, ref) {
  const targetAddressObject = index === 0 ? 'addresses.0.country' : 'addresses.1.country';

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id={targetAddressObject}>Country</InputLabel>
        <Select
          labelId={targetAddressObject}
          label='Country'
          value={valueToCheck}
          onChange={(event) => onSelectCountry(event.target.value as string, index)}
          ref={ref} // Pass the ref to the Select component
        >
          {countryOptions}
        </Select>
      </FormControl>
    </Box>
  );
});
