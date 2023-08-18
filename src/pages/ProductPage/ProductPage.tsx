import React from 'react';
import { Button, Grid, Rating, TextField, Typography } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

export function ProductPage() {
  type ProdData = { prodName: string; images: Array<string>; currency: string; price: number; discount: number; rating: number; description: string };
  const prodData: ProdData = {
    prodName: 'Name',
    images: ['https://content2.onliner.by/catalog/device/main/22fc0ac02fb3675ab8f8b0ce67d596aa.jpeg', 'https://content2.onliner.by/catalog/device/main/fa9532355959b1f3002920219d7a978e.jpeg', 'https://content2.onliner.by/catalog/device/main/7e40dc244081b54a20e3a7cd894e4221.jpeg'],
    currency: '$',
    price: 15,
    discount: 12,
    rating: 4,
    description: 'Description',
  };
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<number | null>(prodData.rating);
  const [ammount, setAmmount] = React.useState<number | null>(1);
  const handleChange = (am: number | null) => {
    setAmmount(am);
  };

  return (
    <Grid container spacing={2}>
      <Grid sx={{ textAlign: 'left' }} item xs={12}>
        <Typography variant='h2'>Prod Name</Typography>
      </Grid>

      <Grid item md={6} xs={12} sx={{ height: '60vh' }} justifyContent='center' alignItems='center'>
        <Typography onClick={() => setOpen(true)} sx={{ height: '100%', width: '100%', bgcolor: 'grey', borderRadius: '1rem' }}>
          image
        </Typography>
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          render={
            prodData.images.length <= 1
              ? {
                  buttonPrev: () => null,
                  buttonNext: () => null,
                }
              : undefined
          }
          slides={[
            {
              src: prodData.images[0],
              alt: 'image 1',
              width: 3840,
              height: 2560,
            },
            {
              src: prodData.images[1],
              alt: 'image 1',
              width: 3840,
              height: 2560,
            },
            {
              src: prodData.images[2],
              alt: 'image 1',
              width: 3840,
              height: 2560,
            },
            // ...
          ]}
        />
      </Grid>

      <Grid item md={6} xs={12}>
        <Grid item xs={12} sx={{ height: 'max-content' }}>
          <>
            <Grid container>
              <Grid item xs={2}>
                <Typography sx={{ color: 'red' }} variant='h5'>
                  {prodData.currency + prodData.discount}
                </Typography>
              </Grid>

              <Grid item xs={2}>
                <Typography sx={{ color: 'grey', textDecoration: 'line-through' }} variant='h5'>
                  {prodData.currency + prodData.price}
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
              <Grid item xs={1}>
                <TextField
                  sx={{ marginRight: '1rem' }}
                  id='standard-number'
                  label='Ammount'
                  type='number'
                  value={ammount}
                  onChange={(e) => handleChange(+e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant='standard'
                />
              </Grid>
              <Grid item xs={11}>
                <Button onClick={() => console.log(ammount)} variant='contained' sx={{ margin: ' 1rem 0' }}>
                  <AddShoppingCartIcon></AddShoppingCartIcon>
                  Add to cart
                </Button>
              </Grid>
            </Grid>
          </>
        </Grid>

        <Grid item xs={12} sx={{ height: '20vh', marginTop: '1rem' }}>
          <Typography variant='h5'>Description</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
