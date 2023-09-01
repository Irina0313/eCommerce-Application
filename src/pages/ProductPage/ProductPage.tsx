import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, Grid, Rating, TextField, Typography } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import Lightbox from 'yet-another-react-lightbox';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import { Carousel } from 'react-responsive-carousel';
import { returnProductByKey } from '../../api/Product';
import { ProductData } from '@commercetools/platform-sdk';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setProd } from '../../store/productSlice';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import './style.scss';
import { useNavigate, useParams } from 'react-router-dom';
import GoHomeBth from '../../components/GoHomeBtn/GoHomeBth';

export function ProductPage() {
  const prodTemplate = useAppSelector((state) => state.productReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<number | null>(4);
  const [amount, setAmount] = React.useState<number | null>(1);

  const [prodData, setProdData] = useState<ProductData>(prodTemplate);
  const [isError, setIsError] = useState<boolean>(true);

  const { productKey } = useParams();

  useEffect(() => {
    returnProductByKey(productKey ? productKey : '1')
      .then(({ body }) => {
        setProdData(body.masterData.current);
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

  return (
    <Grid container spacing={2} justifyContent={'center'}>
      {isError ? (
        <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography sx={{ marginBottom: '1rem' }} variant='h2'>
            Sorry, we can&apos;t upload the product...
          </Typography>
          <GoHomeBth />
        </Grid>
      ) : (
        <>
          {prodData.masterVariant.key === '...123abc' ? (
            <CircularProgress />
          ) : (
            <>
              <Grid sx={{ textAlign: 'left' }} item xs={12}>
                <Typography variant='h4'>{Object.values(prodData.name)[0]}</Typography>
              </Grid>

              <Grid item md={6} xs={12} sx={{ height: '60vh', justifyContent: 'center', justifyItems: 'center', position: 'relative', marginBottom: '10vh' }}>
                <ZoomInIcon sx={{ position: 'absolute', top: '0', right: '15%' }} onClick={() => setOpen(true)} />
                <Carousel showArrows={false} dynamicHeight={false} showStatus={false}>
                  {prodData.masterVariant.images?.map((image) => (
                    <div key={image.url}>
                      <img src={image.url}></img>
                    </div>
                  ))}
                </Carousel>
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
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <Grid item xs={12} sx={{ height: 'max-content' }}>
                  <>
                    <Grid container justifyContent={'space-between'}>
                      {prodData.masterVariant.prices ? (
                        prodData.masterVariant.prices[0].discounted ? (
                          <Grid item xs={2}>
                            <Typography sx={{ color: 'red' }} variant='h5'>
                              {prodData.masterVariant.prices[0].discounted?.value.centAmount / 100 + '$'}
                            </Typography>
                          </Grid>
                        ) : null
                      ) : null}

                      <Grid item xs={2}>
                        {prodData.masterVariant.prices ? (
                          prodData.masterVariant.prices[0].discounted ? (
                            <Typography sx={{ color: 'grey', textDecoration: 'line-through' }} variant='h5'>
                              {prodData.masterVariant.prices ? prodData.masterVariant.prices[0].value.centAmount / 100 + '$' : null}
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
                        {prodData.masterVariant.key === '...123abc' ? (
                          <Button onClick={() => console.log(amount)} disabled variant='contained' sx={{ margin: ' 1rem 0' }}>
                            <AddShoppingCartIcon></AddShoppingCartIcon>
                            Add to cart
                          </Button>
                        ) : (
                          <Button onClick={() => console.log(amount)} variant='contained' sx={{ margin: ' 1rem 0' }}>
                            <AddShoppingCartIcon></AddShoppingCartIcon>
                            Add to cart
                          </Button>
                        )}
                      </Grid>
                    </Grid>
                  </>
                </Grid>

                <Grid item xs={12} sx={{ height: '20vh', marginTop: '1rem' }}>
                  <Typography variant='h5'>Description</Typography>
                  <Typography variant='h6'>{prodData.description ? Object.values(prodData.description) : '1231'}</Typography>
                </Grid>
              </Grid>
            </>
          )}
        </>
      )}
    </Grid>
  );
}
