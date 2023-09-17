import React, { useRef, useEffect, useState } from 'react';
import { CircularProgress, Typography, Box, Container, Checkbox, FormGroup, FormControlLabel, TextField, InputAdornment, Pagination } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Category, ProductProjection } from '@commercetools/platform-sdk';
import { getProducts } from '../../api/Client';
import ProductViewListItem from '../ProductViewListItem/ProductViewListItem';
import SearchField from '../SearchField/SearchField';
import { siteLocale } from '../../api/BuildClient';

interface IProductListViewProps {
  category?: Category;
}

export default function ProductListView({ category }: IProductListViewProps) {
  const [list, setList] = useState<ProductProjection[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortByValue, setSortByValue] = useState<string>(`name.${siteLocale} asc`);
  const [filterByPriceQuery, setFilterByPriceString] = React.useState('');
  const [filterByPrice, setFilterByPrice] = React.useState(false);
  const [minPrice, setMinPrice] = React.useState(0);
  const [maxPrice, setMaxPrice] = React.useState(1000);
  const [page, setPage] = React.useState(1);
  const [offset, setOffset] = React.useState('0');
  const [count, setCount] = React.useState(0);
  const queryRef = useRef<HTMLInputElement>();

  useEffect(() => {
    setSearchQuery('');
    if (queryRef.current) queryRef.current.value = '';
  }, [category]);

  useEffect(() => {
    setLoading(true);
    getProducts(category?.id, searchQuery, filterByPriceQuery, sortByValue, '3', offset)
      .then(({ body }) => {
        // console.log('ProductListView result: ', body.results);
        setLoading(false);
        setError('');
        setList(body.results);
      })
      .catch((e) => {
        setLoading(false);
        setError(e.message);
        setList([]);
      });
  }, [category, searchQuery, sortByValue, filterByPriceQuery, page]);

  useEffect(() => {
    setLoading(true);
    getProducts(category?.id, searchQuery, filterByPriceQuery, sortByValue, '100')
      .then(({ body }) => {
        setCount(Math.ceil(body.results.length / 3));
      })
      .catch((e) => {
        setLoading(false);
        setError(e.message);
        setList([]);
      });
  }, [category, searchQuery, sortByValue, filterByPriceQuery]);

  const onSearchClick = (query: string): void => {
    if (query !== searchQuery) setSearchQuery(query);
  };

  const onMinPriceChange = (e: React.FocusEvent<HTMLInputElement>) => {
    setMinPrice(+e.target.value > -1 ? +e.target.value : 0);
  };

  const onMaxPriceChange = (e: React.FocusEvent<HTMLInputElement>) => {
    setMaxPrice(+e.target.value > -1 ? +e.target.value : 0);
  };

  const onPriceFilterUpdate = (active: boolean) => {
    setFilterByPriceString(active ? `variants.price.centAmount:range (${minPrice * 100} to ${maxPrice * 100})` : '');
  };

  // console.log('ListVew Render:', searchQuery, '---', category);

  return (
    <>
      <Typography variant='h2' textAlign={'center'} mb={4}>
        {searchQuery ? `Search result for : ${searchQuery}` : category ? category?.name[siteLocale] : 'Our catalog'}
      </Typography>

      <Container sx={{ display: 'flex', flexWrap: 'wrap', alignItems: { lg: 'center' }, gap: 3, marginBottom: '1rem' }}>
        {/* Search */}
        <SearchField onSearchClick={onSearchClick} queryRef={queryRef} />

        {/* Sort */}
        <FormControl sx={{ width: '12rem' }}>
          <InputLabel htmlFor='sortBySelect'>Sort by</InputLabel>
          <Select native id='sortBySelect' label='Sort by' defaultValue={sortByValue} onChange={(e) => setSortByValue(e.target.value)}>
            <option value={`name.${siteLocale} asc`}>Name ascending</option>
            <option value={`name.${siteLocale} desc`}>Name descending</option>
            <option value='price asc'>Price ascending</option>
            <option value='price desc'>Price descending</option>
          </Select>
        </FormControl>

        {/* Filter by Price */}
        <FormGroup sx={{ flexDirection: 'row' }}>
          <FormControlLabel
            label='Filter by priсe'
            control={
              <Checkbox
                checked={filterByPrice}
                onChange={(e) => {
                  setFilterByPrice(e.target.checked);
                  onPriceFilterUpdate(e.target.checked);
                }}
              />
            }
          />
          <TextField
            label='From'
            value={minPrice}
            disabled={!filterByPrice}
            onChange={onMinPriceChange}
            onBlur={() => onPriceFilterUpdate(true)}
            sx={{ width: '7rem', marginRight: '1rem' }}
            type='number'
            autoComplete='off'
            InputProps={{
              startAdornment: <InputAdornment position='start'>$</InputAdornment>,
            }}
          />
          <TextField
            label='To'
            value={maxPrice}
            disabled={!filterByPrice}
            onChange={onMaxPriceChange}
            onBlur={() => onPriceFilterUpdate(true)}
            sx={{ width: '7rem' }}
            type='number'
            autoComplete='off'
            InputProps={{
              startAdornment: <InputAdornment position='start'>$</InputAdornment>,
            }}
          />
        </FormGroup>
      </Container>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <CircularProgress size={24} sx={{ color: 'grey' }} />
        </Box>
      )}

      {error && (
        <Typography color={'error'} mt={3} textAlign={'center'}>
          {error}
        </Typography>
      )}
      {!loading && !error && list.length > 0 && list.map((item) => <ProductViewListItem item={item} key={item.id} />)}
      {count <= 1 ? (
        ''
      ) : (
        <Pagination
          sx={{ margin: 'auto' }}
          count={count}
          page={page}
          onChange={(_, num) => {
            setPage(num);
            setOffset(`${(num - 1) * 3}`);
          }}
        ></Pagination>
      )}
    </>
  );
}
