import React, { useState, memo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Thumbs } from 'swiper';
import 'swiper/swiper-bundle.css';
import '../../css/swiper.css'
import { Divider } from '@material-ui/core';

SwiperCore.use([Navigation, Pagination, Thumbs]);

function ThumbsSlider({ slides, ...props }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (<>
    <Swiper
      style={{ height: 'calc(80% - 24px)', width: '100%', marginBottom: '24px', padding: '16px', paddingBottom: '0', color: '#115293' }}
      tag="section"
      wrapperTag="ul"
      speed={1000}
      thumbs={{
        swiper: thumbsSwiper
      }}
      navigation
      spaceBetween={0}
      slidesPerView={1}
    >
      {slides.map((src, index) => (
        <SwiperSlide
          key={index}
          tag="li"
          style={{ listStyle: 'none' }}
        >
          <div
            style={{ width: '100%', height: '100%', backgroundImage: `url(/images/products/${src})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', borderRadius: '5px' }}
          >
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
    <Divider />
    <Swiper
      style={{ height: '20%', padding: '16px' }}
      speed={800}
      spaceBetween={10}
      slidesPerView={4}
      onSwiper={setThumbsSwiper}
    >
      {slides.map((src, index) => (
        <SwiperSlide
          key={index}
          tag="li"
          style={{ listStyle: 'none' }}
        >
          <div
            style={{ width: '100%', height: '100%', backgroundImage: `url(/images/products/${src})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', borderRadius: '5px' }}
          >
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </>)
}

export default memo(ThumbsSlider);
