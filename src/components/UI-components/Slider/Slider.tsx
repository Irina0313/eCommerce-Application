import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles.css';

interface SimpleSliderProps {
  imageUrls: string[];
}

class SimpleSlider extends React.Component<SimpleSliderProps> {
  render() {
    const { imageUrls } = this.props;
    const settings = {
      dots: false,
      infinite: true,
      autoplay: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplaySpeed: 3000,
      fade: true,
      pauseOnHover: true,
    };

    return (
      <div>
        <Slider {...settings}>
          {imageUrls.map((imageUrl, index) => (
            <div key={index} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div style={{ maxWidth: '100%', maxHeight: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img style={{ display: 'block', width: '100%', height: 'auto' }} src={imageUrl} alt={`Slide ${index + 1}`} />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}

export default SimpleSlider;
