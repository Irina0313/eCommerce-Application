import React, { useEffect, useState } from 'react';
import { Button, Grid, Rating, TextField, Typography } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import Lightbox from 'yet-another-react-lightbox';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import { Carousel } from 'react-responsive-carousel';
import { returnProductByKey } from '../../api/Product';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import './style.scss';
import { ProductData } from '@commercetools/platform-sdk';

export function ProductPage() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<number | null>(4);
  const [amount, setAmount] = React.useState<number | null>(1);
  const [prodData, setProdData] = useState<ProductData>({
    name: {
      'en-US': 'Common product',
    },
    description: {
      'en-US': 'Some description',
    },
    categories: [],
    categoryOrderHints: {},
    slug: {
      'en-US': 'slug',
    },
    metaTitle: {
      'en-US': 'metaTitle',
    },
    metaDescription: {
      'en-US': 'MetaDescription',
    },
    masterVariant: {
      id: 1,
      key: 'key',
      prices: [
        {
          id: 'anyId',
          value: {
            type: 'centPrecision',
            currencyCode: 'USD',
            centAmount: 1200,
            fractionDigits: 2,
          },
          key: '132',
          tiers: [
            {
              minimumQuantity: 1,
              value: {
                type: 'centPrecision',
                currencyCode: 'USD',
                centAmount: 1200,
                fractionDigits: 2,
              },
            },
          ],
        },
      ],
      images: [
        {
          url: 'https://cdn.linenclub.com/media/catalog/product/cache/41d32663a01600992c99bcd3aa36f0e1/c/o/comshck08270-g4_0_1.jpg',
          dimensions: {
            w: 1117,
            h: 1400,
          },
        },
      ],
      attributes: [
        {
          name: 'size',
          value: {
            key: 'Medium',
            label: 'Medium',
          },
        },
        {
          name: 'color',
          value: {
            key: 'Green',
            label: 'Green',
          },
        },
      ],
      assets: [],
    },
    variants: [],
    searchKeywords: {},
  });
  useEffect(() => {
    returnProductByKey('CAVALLO_BY_LINEN_CLUB')
      .then(({ body }) => {
        setProdData(body.masterData.current);
        if (prodData.description) {
          console.log(Object.values(prodData.description));
        }
      })
      .catch(console.error);
  }, []);

  const handleChange = (amount: number | null) => {
    if (amount) {
      if (amount < 100 && amount > 1) {
        setAmount(amount);
      } else if (amount < 1) {
        setAmount(1);
      } else if (amount > 99) {
        setAmount(99);
      }
    }
  };

  const imageSrcArr = () => {
    const arr: Array<{ src: string }> = [];
    prodData.masterVariant.images?.map((image) => {
      arr.push({ src: image.url });
    });
    return arr;
  };

  return (
    <Grid container spacing={2}>
      <Grid sx={{ textAlign: 'left' }} item xs={12}>
        <Typography variant='h2'>Prod Name</Typography>
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
            <Grid container>
              <Grid item xs={2}>
                <Typography sx={{ color: 'red' }} variant='h5'>
                  {prodData.masterVariant.prices ? prodData.masterVariant.prices[0].value.centAmount / 100 + '$' : null}
                </Typography>
              </Grid>

              <Grid item xs={2}>
                <Typography sx={{ color: 'grey', textDecoration: 'line-through' }} variant='h5'>
                  {prodData.masterVariant.prices ? (prodData.masterVariant.prices[0].discounted ? prodData.masterVariant.prices[0].discounted?.value.centAmount / 100 + '$' : null) : null}
                </Typography>
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
                <Button onClick={() => console.log(amount)} variant='contained' sx={{ margin: ' 1rem 0' }}>
                  <AddShoppingCartIcon></AddShoppingCartIcon>
                  Add to cart
                </Button>
              </Grid>
            </Grid>
          </>
        </Grid>

        <Grid item xs={12} sx={{ height: '20vh', marginTop: '1rem' }}>
          <Typography variant='h5'>Description</Typography>
          <Typography variant='h6'>{prodData.description ? Object.values(prodData.description) : '1231'}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
