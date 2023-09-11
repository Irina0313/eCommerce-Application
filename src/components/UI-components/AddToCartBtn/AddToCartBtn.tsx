import React from 'react';
import { Button } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

interface PropsType {
  handleClick?: (e: MouseEvent) => void;
  disabled?: boolean;
}

export default function AddToCartBtn({ handleClick, disabled = false }: PropsType) {
  return (
    <Button onClick={(e) => (handleClick ? handleClick(e as unknown as MouseEvent) : '')} disabled={disabled} variant='contained' data-testid='addToCart' style={{ width: 'max-content', margin: '0 auto' }}>
      <AddShoppingCartIcon></AddShoppingCartIcon>
      Add to cart
    </Button>
  );
}
