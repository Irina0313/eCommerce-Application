import React, { useRef, useEffect, useState } from 'react';
import { CircularProgress, Typography, Box, Container } from '@mui/material';
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
  const queryRef = useRef<HTMLInputElement>();

  useEffect(() => {
    setSearchQuery('');
    if (queryRef.current) queryRef.current.value = '';
  }, [category]);

  useEffect(() => {
    setLoading(true);
    getProducts(category?.id, searchQuery, sortByValue)
      .then(({ body }) => {
        console.log('ProductListView result: ', body.results);
        setLoading(false);
        setError('');
        setList(body.results);
      })
      .catch((e) => {
        console.log('ProductListView err: ', e);
        setLoading(false);
        setError(e.message);
        setList([]);
      });
  }, [category, searchQuery, sortByValue]);

  const onSearchClick = (query: string): void => {
    if (query !== searchQuery) setSearchQuery(query);
  };

  console.log('ListVew Render:', searchQuery, '---', category);

  return (
    <>
      <Typography variant='h2' textAlign={'center'} mb={4}>
        {searchQuery ? `Search result for : ${searchQuery}` : category ? category?.name[siteLocale] : 'Our catalog'}
      </Typography>

      <Container sx={{ display: 'flex', alignItems: 'center', gap: 3, marginBottom: '1rem' }}>
        <SearchField onSearchClick={onSearchClick} queryRef={queryRef} />

        <FormControl sx={{ m: 1, width: '15rem' }}>
          <InputLabel htmlFor='sortBySelect'>Sort by</InputLabel>
          <Select native id='sortBySelect' label='Sort by' defaultValue={sortByValue} onChange={(e) => setSortByValue(e.target.value)}>
            <option value={`name.${siteLocale} asc`}>Name ascending</option>
            <option value={`name.${siteLocale} desc`}>Name descending</option>
            <option value='price asc'>Price ascending</option>
            <option value='price desc'>Price descending</option>
          </Select>
        </FormControl>
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
    </>
  );
}
