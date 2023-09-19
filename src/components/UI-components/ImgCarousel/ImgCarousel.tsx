import React from 'react';
import { Grid } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';

import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import './style.scss';
interface PropsType {
  imgUrls: Array<string>;
  zoomIcon?: JSX.Element;
  lightBox?: JSX.Element;
}

export function ImgCarousel({ imgUrls, zoomIcon, lightBox }: PropsType) {
  return (
    <Grid
      item
      md={6}
      xs={12}
      sx={{
        height: zoomIcon ? '60vh' : '200px',
        width: zoomIcon ? '' : '200px',
        justifyContent: 'center',
        justifyItems: 'center',
        position: 'relative',
        marginBottom: zoomIcon ? '10vh' : '0',
        '@media (max-width: 1200px)': {
          marginBottom: zoomIcon ? '1vh' : '0',
          height: zoomIcon ? '40vh' : '200px',
        },
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {zoomIcon}
      <Carousel data-testid='carousel' showArrows={false} dynamicHeight={false} showStatus={false} showThumbs={zoomIcon ? true : false} className={zoomIcon ? '' : 'aa'}>
        {imgUrls?.map((image) => (
          <div key={image}>
            <img src={image}></img>
          </div>
        ))}
      </Carousel>
      {lightBox}
    </Grid>
  );
}
