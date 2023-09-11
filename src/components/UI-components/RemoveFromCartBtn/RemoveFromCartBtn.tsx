import React from 'react';
import { Button } from '@mui/material';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
interface PropsType {
  handleClick?: (e: MouseEvent) => void;
  disabled?: boolean;
}

export default function RemoveFromCartBtn({ handleClick, disabled = false }: PropsType) {
  return (
    <Button onClick={(e) => (handleClick ? handleClick(e as unknown as MouseEvent) : '')} disabled={disabled} variant='contained' color='error' data-testid='removeFromCart' style={{ width: 'max-content', margin: '0 auto' }}>
      <RemoveShoppingCartIcon />
      Remove from cart
    </Button>
  );
}
