import React from 'react';
import { Typography, Container } from '@mui/material';
import { ProductProjection } from '@commercetools/platform-sdk';
import { useNavigate } from 'react-router-dom';
import { siteLocale } from '../../api/BuildClient';

interface IProductViewListItemProps {
  item: ProductProjection;
}

export default function ProductViewListItem({ item }: IProductViewListItemProps) {
  const navigate = useNavigate();

  const onClick = (key: string) => {
    navigate(`/product/${key}`);
  };

  return (
    <>
      <Container
        onClick={() => onClick(item.key ? item.key : '404')}
        sx={{
          marginBottom: '2rem',
          border: '2px solid #000',
          borderRadius: '10px',
          ':hover': {
            cursor: 'pointer',
            background: '#f1f1f1',
          },
        }}
      >
        <Typography variant='h5' textAlign={'center'} m={2}>
          {item.name[siteLocale]}
        </Typography>
        <Container sx={{ display: 'flex', gap: '2rem', paddingBottom: '2rem' }}>
          {item.masterVariant.images && item.masterVariant.images.length > 0 && <img src={item.masterVariant.images[0].url} alt={item.name[siteLocale]} height={150} />}
          {item.description && item.description[siteLocale]}
        </Container>
      </Container>
    </>
  );
}
