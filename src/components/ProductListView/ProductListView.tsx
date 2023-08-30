import React, { useEffect, useState } from 'react';
import { CircularProgress, Typography, Box } from '@mui/material';
import { Category, ProductProjection } from '@commercetools/platform-sdk';
import { getProducts } from '../../api/Client';
import ProductViewListItem from '../ProductViewListItem/ProductViewListItem';

interface IProductListViewProps {
  category?: Category;
}

export default function ProductListView({ category }: IProductListViewProps) {
  const [list, setList] = useState<ProductProjection[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    console.log('ProductListView useEffect category: ', category);
    getProducts(category?.id)
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
  }, [category]);

  const getProductsList = (list: ProductProjection[]): JSX.Element[] => {
    const content: JSX.Element[] = [];
    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      //    if (item.masterData.published)
      content.push(<ProductViewListItem item={item} key={item.id} />);
    }
    return content;
  };

  return (
    <>
      {/* <Typography variant='h5' m={3} textAlign={'center'}>
        Products
      </Typography> */}

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

      {!loading && !error && getProductsList(list)}
    </>
  );
}
