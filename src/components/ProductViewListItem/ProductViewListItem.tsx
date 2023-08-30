import React from 'react';
import { Button, Container } from '@mui/material';
import { ProductProjection } from '@commercetools/platform-sdk';
import { useNavigate } from 'react-router-dom';

interface IProductViewListItemProps {
  item: ProductProjection;
}

export default function ProductViewListItem({ item }: IProductViewListItemProps) {
  const navigate = useNavigate();

  const onClick = (slug: string) => {
    navigate(`/product/${slug}`);
  };

  return (
    <>
      <Container
        sx={{
          marginBottom: '2rem',
          border: '2px solid #000',
          borderRadius: '10px',
        }}
      >
        <Button color='primary' variant='text' fullWidth onClick={() => onClick(item.slug['en-US'])}>
          {item.name['en-US']}
        </Button>
        {item.description && item.description['en-US']}
        {item.masterVariant.images?.length && <img src={item.masterVariant.images[0].url} alt={item.name['en-US']} height={150} />}
      </Container>
    </>
  );
}
