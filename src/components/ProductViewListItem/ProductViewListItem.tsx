import React from 'react';
import { Typography, Container } from '@mui/material';
import { ProductProjection } from '@commercetools/platform-sdk';
import { useNavigate } from 'react-router-dom';
import { siteLocale } from '../../api/BuildClient';
import PriceView from '../PriceView/PriceView';
import { ImgCarousel } from '../UI-components/ImgCarousel/ImgCarousel';
import AddToCartBtn from '../UI-components/AddToCartBtn/AddToCartBtn';
import { addProductToCart } from '../../api/Client';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { cartFetchingSuccess } from '../../store/cartSlice';

interface IProductViewListItemProps {
  item: ProductProjection;
}

export default function ProductViewListItem({ item }: IProductViewListItemProps) {
  const navigate = useNavigate();
  const { cart } = useAppSelector((state) => state.cartReducer);
  const userId = useAppSelector((state) => state.userReducer.id);
  const dispatch = useAppDispatch();

  const onClick = (key: string) => {
    navigate(`/product/${key}`);
  };

  const onAddProductClick = async () => {
    addProductToCart(cart, item.id)
      .then((res) => {
        console.log('addProductToCart : ', res);
        dispatch(cartFetchingSuccess(res.body));
        if (!userId) localStorage.setItem('IKKShop_cartId', res.body.id); // TODO think about this ...
      })
      .catch((e) => {
        console.log(e); // TODO
      });
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

        <Container sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: '3rem', paddingBottom: '2rem', alignItems: 'center' }}>
          {item.masterVariant.images && item.masterVariant.images.length > 0 && <ImgCarousel imgUrls={[...item.masterVariant.images.map((image) => image.url)]} />}

          <Container sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingBottom: '2rem' }}>
            <PriceView prices={item.masterVariant.prices} />
            {item.description && item.description[siteLocale]}
            <AddToCartBtn
              disabled={cart?.lineItems && cart.lineItems.findIndex((lineItem) => lineItem.productId === item.id) !== -1}
              handleClick={(e) => {
                e.stopPropagation();
                onAddProductClick();
              }}
            />
          </Container>
        </Container>
      </Container>
    </>
  );
}
