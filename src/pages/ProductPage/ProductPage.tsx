import React, { useEffect, useState } from 'react';
import { CircularProgress, Grid, Rating, TextField, Typography } from '@mui/material';
import { Lightbox } from 'yet-another-react-lightbox';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import { returnProductByKey } from '../../api/Product';
import { ProductData } from '@commercetools/platform-sdk';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { useNavigate, useParams } from 'react-router-dom';
import GoHomeBth from '../../components/UI-components/GoHomeBtn/GoHomeBth';
import { ImgCarousel } from '../../components/UI-components/ImgCarousel/ImgCarousel';
import AddToCartBtn from '../../components/UI-components/AddToCartBtn/AddToCartBtn';
import RemoveFromCartBtn from '../../components/UI-components/RemoveFromCartBtn/RemoveFromCartBtn';
import { addProductToCart, changeLineItemQuantity } from '../../api/Client';
import { cartFetchingSuccess } from '../../store/cartSlice';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';

export function ProductPage() {
  const { cart } = useAppSelector((state) => state.cartReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [isLoad, setIsLoad] = React.useState(true);
  const [value, setValue] = React.useState<number | null>(4);
  const [amount, setAmount] = React.useState<number | null>(1);
  const [showApiLoader, setShowApiLoader] = React.useState(false);

  const [prodData, setProdData] = useState<ProductData>();
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
        setIsLoad(false);
        setProdData(body.masterData.current);
        setprodId(body.id);
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
    prodData?.masterVariant.images?.forEach((image) => {
      arr.push({ src: image.url });
    });
    return arr;
  };

  const imageUrlsArr = () => {
    const arr: Array<string> = [];
    prodData?.masterVariant.images?.forEach((image) => {
      arr.push(image.url);
    });
    return arr;
  };

  const onAddProductClick = async () => {
    setShowApiLoader(true);
    addProductToCart(cart, prodId, amount || 1)
      .then((res) => {
        console.log('addProductToCart : ', amount, prodId, res);
        dispatch(cartFetchingSuccess(res.body));
      })
      .catch((e) => {
        console.warn(e); // TODO
      })
      .finally(() => {
        setShowApiLoader(false);
      });
  };

  const onRemoveProductClick = async () => {
    const lineId = cart?.lineItems.find((item) => item.productId === prodId)?.id;
    if (!lineId) return console.log('onDeleteProductClick: lineId not found');

    setShowApiLoader(true);
    changeLineItemQuantity(cart, lineId, 0)
      .then((res) => {
        console.log('delete product from cart : ', lineId, res);
        dispatch(cartFetchingSuccess(res.body));
      })
      .catch((e) => {
        console.warn(e); // TODO
      })
      .finally(() => {
        setShowApiLoader(false);
      });
  };

  return (
    <Grid
      container
      spacing={2}
      justifyContent={'center'}
      data-testid={'catalog'}
      marginTop={'2rem'}
      maxWidth={'1200px'}
      sx={{
        '@media (max-width: 700px)': {
          marginTop: '4rem',
        },
        '@media (max-width: 500px)': {
          marginTop: '7rem',
        },
      }}
    >
      {isError ? (
        <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography sx={{ marginBottom: '1rem' }} variant='h2'>
            Sorry, we can&apos;t get information about the product...
          </Typography>
          <GoHomeBth />
        </Grid>
      ) : (
        <>
          {isLoad ? (
            <CircularProgress />
          ) : (
            <>
              <Grid sx={{ textAlign: 'center' }} item xs={12}>
                <Typography data-testid='prodName' variant='h3' color={'#424551'} my={3}>
                  {Object.values(prodData ? prodData.name : [])[0]}
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
                      prodData?.masterVariant.images
                        ? prodData?.masterVariant.images.length <= 1
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
                      {prodData?.masterVariant.prices ? (
                        prodData?.masterVariant.prices[0].discounted ? (
                          <Grid item xs={2}>
                            <Typography sx={{ color: 'red' }} variant='h5'>
                              {'$' + (prodData.masterVariant.prices[0].discounted?.value.centAmount / 100).toFixed(2)}
                            </Typography>
                          </Grid>
                        ) : null
                      ) : null}

                      <Grid item xs={2}>
                        {prodData?.masterVariant.prices ? (
                          prodData?.masterVariant.prices[0].discounted ? (
                            <Typography sx={{ color: 'grey', textDecoration: 'line-through' }} variant='h5'>
                              {prodData?.masterVariant.prices ? '$' + (prodData.masterVariant.prices[0].value.centAmount / 100).toFixed(2) : null}
                            </Typography>
                          ) : (
                            <Typography variant='h5'>{prodData.masterVariant.prices ? '$' + (prodData.masterVariant.prices[0].value.centAmount / 100).toFixed(2) : null}</Typography>
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
                <Grid item xs={12} marginTop={'1.5rem'}>
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

                        {showApiLoader && <CircularProgress size={24} sx={{ color: 'red' }} />}
                      </Grid>
                    </Grid>
                  </>
                </Grid>

                <Grid item xs={12} sx={{ height: '20vh', marginTop: '1rem' }}>
                  <Typography variant='h4' marginTop={'2rem'} color={'#1E212C'}>
                    Description
                  </Typography>
                  <Typography variant='h6' data-testid='description' marginTop={'1rem'} color={'#424551'}>
                    {prodData?.description ? Object.values(prodData.description) : '1231'}
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
