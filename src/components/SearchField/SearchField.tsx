import React, { useState } from 'react';
import { Button, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';

interface ISearchFieldProps {
  onSearchClick(query: string): void;
  queryRef: React.MutableRefObject<HTMLInputElement | undefined>;
}

export default function SearchField({ onSearchClick, queryRef }: ISearchFieldProps) {
  const [showSearchBtn, setShowSearchBtn] = useState('none');

  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setShowSearchBtn(event.target.value === '' ? 'none' : 'flex');
    if (event.target.value === '') {
      onSearchClick(event.target.value);
    }
  };

  const onSearchClickLocal = (): void => {
    onSearchClick(queryRef.current ? queryRef.current.value : '');
    setShowSearchBtn('none');
  };

  console.log('SearchField Render');
  return (
    <Box
      component='form'
      onSubmit={(e) => {
        e.preventDefault();
        onSearchClickLocal();
      }}
    >
      <TextField
        sx={{ mb: 3 }}
        type='search'
        size='small'
        variant='outlined'
        aria-label='search'
        onChange={onChange}
        inputRef={queryRef}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position='end' style={{ display: showSearchBtn }} onClick={onSearchClickLocal}>
              <Button variant='contained'>Search</Button>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}
