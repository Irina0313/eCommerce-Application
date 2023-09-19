import React from 'react';
import { Container, Typography } from '@mui/material';
import PromoCodeListView from '../../components/PromoCodes/PromoCodesListView';
import SimpleSlider from '../../components/UI-components/Slider/Slider';
import { getProducts } from '../../api/Client';
import { siteLocale } from '../../api/BuildClient';
import summerImg from '../../assets/summer4x.png';

export function MainPage() {
  const [imageUrls, setImageUrls] = React.useState<string[]>([]);

  React.useEffect(() => {
    getProducts(undefined, '', '', `name.${siteLocale} asc`, '50', '0').then((resp) => {
      if (resp && resp.body && resp.body.results) {
        const results = resp.body.results;

        const urls = results
          .map((result) => {
            if (result.masterVariant.images) {
              return result.masterVariant.images[0].url;
            }
          })
          .filter((url) => url !== undefined) as string[];

        setImageUrls(urls);
      }
    });
  }, []);
  return (
    <>
      <Container
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '2rem',
          margin: '4rem',
          '@media (max-width: 1200px)': {
            flexDirection: 'column',
          },
        }}
      >
        <Container
          sx={{
            width: '35%',
            '@media (max-width: 1200px)': {
              width: '100%',
            },
          }}
        >
          <Typography variant='h2' mt={7} color={'#FF4242'} textAlign={'center'}>
            Welcome to IKK SHOP!
          </Typography>
          <Typography variant='h5' mt={4} color={'#424551'} textAlign={'center'}>
            Here, you&apos;ll find fashionable and stylish outfits for all occasions and seasons. We take pride in offering high-quality products, a variety of styles, and affordable prices to help you express your individuality through fashion.
          </Typography>
          <Typography variant='h5' mt={4} color={'#424551'} textAlign={'center'}>
            Immerse yourself in the world of fashion with IKK SHOP and update your wardrobe today!
          </Typography>
        </Container>

        <Container
          sx={{
            width: '60%',
            '@media (max-width: 1200px)': {
              width: '80vw',
            },
          }}
        >
          <SimpleSlider imageUrls={imageUrls} />
        </Container>
      </Container>

      <Container
        sx={{
          display: 'flex',
          '@media (max-width: 1200px)': {
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          },
        }}
      >
        <Container
          sx={{
            padding: '0',
            width: '35%',
            height: '300px',
            backgroundImage: `url(${summerImg})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            '@media (max-width: 1200px)': {
              width: '100%',
            },
            '@media (max-width: 500px)': {
              backgroundSize: 'cover',

              width: '100%',
              height: '200px',
            },
          }}
        />
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: '0',
            width: '60%',
            minHeight: '300px',
            '@media (max-width: 1200px)': {
              width: '100%',
            },
          }}
        >
          <Typography variant='h2' mt={3} mb={3} color={'#424551'} textAlign={'center'}>
            Use Promo Codes!
          </Typography>
          <PromoCodeListView />
        </Container>
      </Container>
    </>
  );
}
