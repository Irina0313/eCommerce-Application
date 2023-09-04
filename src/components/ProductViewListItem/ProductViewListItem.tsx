import React from 'react';
import { Typography, Container } from '@mui/material';
import { ProductProjection } from '@commercetools/platform-sdk';
import { useNavigate } from 'react-router-dom';
import { siteLocale } from '../../api/BuildClient';
import PriceView from '../PriceView/PriceView';

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
        <Typography variant='h5' textAlign={'center'} m={4}>
          {item.name[siteLocale]}
        </Typography>

        <Container sx={{ display: 'flex', flexDirection: 'row', paddingBottom: '2rem' }}>
          {item.masterVariant.images && item.masterVariant.images.length > 0 && <img src={item.masterVariant.images[0].url} alt={item.name[siteLocale]} height={200} />}

          <Container sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingBottom: '2rem' }}>
            <PriceView prices={item.masterVariant.prices} />
            {item.description && item.description[siteLocale]}
          </Container>
        </Container>
      </Container>
    </>
  );
}
