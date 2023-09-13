import React, { useEffect, useState } from 'react';
import { CircularProgress, Grid, Rating, TextField, Typography } from '@mui/material';
import { Lightbox } from 'yet-another-react-lightbox';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import { returnProductByKey } from '../../api/Product';
import { ProductData } from '@commercetools/platform-sdk';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setProd } from '../../store/productSlice';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { useNavigate, useParams } from 'react-router-dom';
import GoHomeBth from '../../components/GoHomeBtn/GoHomeBth';
import { ImgCarousel } from '../../components/UI-components/ImgCarousel/ImgCarousel';
import AddToCartBtn from '../../components/UI-components/AddToCartBtn/AddToCartBtn';
import RemoveFromCartBtn from '../../components/UI-components/RemoveFromCartBtn/RemoveFromCartBtn';
import { addProductToCart, changeLineItemQuantity } from '../../api/Client';
import { cartFetchingSuccess } from '../../store/cartSlice';

export function ProductPage() {
  const prodTemplate = useAppSelector((state) => state.productReducer);
  const { cart } = useAppSelector((state) => state.cartReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<number | null>(4);
  const [amount, setAmount] = React.useState<number | null>(1);

  const [prodData, setProdData] = useState<ProductData>(prodTemplate);
  const [prodId, setprodId] = useState('');
  const [isError, setIsError] = useState<boolean>(false);
  const isProdInCart = cart?.lineItems && cart.lineItems.findIndex((lineItem) => lineItem.productId === prodId) !== -1;
  const { productKey } = useParams();

  useEffect(() => {
    if (!productKey) {
      navigate('/not-found-product');
      return;
    }

    returnProductByKey(productKey)
      .then(({ body }) => {
        setProdData(body.masterData.current);
        setprodId(body.id);
        dispatch(setProd(body.masterData.current));
      })
      .catch((e) => {
        e.code === 404 ? navigate('/not-found-product') : setIsError(true);
      });
  }, []);

  const handleChange = (amount: number | null) => {
    setAmount(amount);
  };

  const imageSrcArr = () => {
    const arr: Array<{ src: string }> = [];
    prodData.masterVariant.images?.forEach((image) => {
      arr.push({ src: image.url });
    });
    return arr;
  };

  const imageUrlsArr = () => {
    const arr: Array<string> = [];
    prodData.masterVariant.images?.forEach((image) => {
      arr.push(image.url);
    });
    return arr;
  };

  const onAddProductClick = async () => {
    addProductToCart(cart, prodId, amount || 1)
      .then((res) => {
        console.log('addProductToCart : ', amount, prodId, res);
        dispatch(cartFetchingSuccess(res.body));
      })
      .catch((e) => {
        console.warn(e); // TODO
      });
  };

  const onRemoveProductClick = async () => {
    const lineId = cart?.lineItems.find((item) => item.productId === prodId)?.id;
    if (!lineId) return console.log('onDeleteProductClick: lineId not found');

    changeLineItemQuantity(cart, lineId, 0)
      .then((res) => {
        console.log('delete product from cart : ', lineId, res);
        dispatch(cartFetchingSuccess(res.body));
      })
      .catch((e) => {
        console.warn(e); // TODO
      });
  };

  return (
    <Grid container spacing={2} justifyContent={'center'} data-testid={'catalog'}>
      {isError ? (
        <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography sx={{ marginBottom: '1rem' }} variant='h2'>
            Sorry, we can&apos;t get information about the product...
          </Typography>
          <GoHomeBth />
        </Grid>
      ) : (
        <>
          {prodData.masterVariant.key === '...123abc' ? (
            <CircularProgress />
          ) : (
            <>
              <Grid sx={{ textAlign: 'center' }} item xs={12}>
                <Typography data-testid='prodName' variant='h4'>
                  {Object.values(prodData.name)[0]}
                </Typography>
              </Grid>

              <ImgCarousel
                imgUrls={imageUrlsArr()}
                zoomIcon={<ZoomInIcon sx={{ position: 'absolute', top: '0', right: '15%' }} onClick={() => setOpen(true)} />}
                lightBox={
                  <Lightbox
                    open={open}
                    close={() => setOpen(false)}
                    carousel={{ preload: 3 }}
                    render={
                      prodData.masterVariant.images
                        ? prodData.masterVariant.images.length <= 1
                          ? {
                              buttonPrev: () => null,
                              buttonNext: () => null,
                            }
                          : undefined
                        : undefined
                    }
                    slides={imageSrcArr()}
                    plugins={[Zoom, Thumbnails]}
                    data-testid='lightBox'
                  />
                }
              ></ImgCarousel>

              <Grid item md={6} xs={12}>
                <Grid item xs={12} sx={{ height: 'max-content' }} data-testid='prices'>
                  <>
                    <Grid container justifyContent={'space-between'}>
                      {prodData.masterVariant.prices ? (
                        prodData.masterVariant.prices[0].discounted ? (
                          <Grid item xs={2}>
                            <Typography sx={{ color: 'red' }} variant='h5'>
                              {'$' + prodData.masterVariant.prices[0].discounted?.value.centAmount / 100}
                            </Typography>
                          </Grid>
                        ) : null
                      ) : null}

                      <Grid item xs={2}>
                        {prodData.masterVariant.prices ? (
                          prodData.masterVariant.prices[0].discounted ? (
                            <Typography sx={{ color: 'grey', textDecoration: 'line-through' }} variant='h5'>
                              {prodData.masterVariant.prices ? '$' + prodData.masterVariant.prices[0].value.centAmount / 100 : null}
                            </Typography>
                          ) : (
                            <Typography variant='h5'>{prodData.masterVariant.prices ? prodData.masterVariant.prices[0].value.centAmount / 100 + '$' : null}</Typography>
                          )
                        ) : (
                          ''
                        )}
                      </Grid>

                      <Grid item xs={6}>
                        <Rating
                          name='simple-controlled'
                          value={value}
                          sx={{ display: 'flex', justifyContent: 'end' }}
                          onChange={(event, newValue) => {
                            setValue(newValue);
                          }}
                        />
                      </Grid>
                    </Grid>
                  </>
                </Grid>
                <Grid item xs={12}>
                  <>
                    <Grid container alignItems='center' justifyContent='center'>
                      <Grid item xs={2}>
                        <TextField
                          sx={{ marginRight: '1rem' }}
                          id='standard-number'
                          label='Amount'
                          type='number'
                          value={amount}
                          onChange={(e) => handleChange(+e.target.value)}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          variant='standard'
                        />
                      </Grid>
                      <Grid item xs={10}>
                        <AddToCartBtn
                          disabled={isProdInCart}
                          handleClick={() => {
                            onAddProductClick();
                          }}
                        />

                        <span style={{ marginRight: '1rem' }}></span>

                        <RemoveFromCartBtn
                          disabled={!isProdInCart}
                          handleClick={() => {
                            onRemoveProductClick();
                          }}
                        />
                      </Grid>
                    </Grid>
                  </>
                </Grid>

                <Grid item xs={12} sx={{ height: '20vh', marginTop: '1rem' }}>
                  <Typography variant='h5'>Description</Typography>
                  <Typography variant='h6' data-testid='description'>
                    {prodData.description ? Object.values(prodData.description) : '1231'}
                  </Typography>
                </Grid>
              </Grid>
            </>
          )}
        </>
      )}
    </Grid>
  );
}
