import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, EffectFade, Autoplay, Keyboard } from 'swiper';
import 'swiper/swiper-bundle.css';
import '../../css/swiper.css';
import { Paper } from '@material-ui/core';
import { useMemo, memo } from 'react';

SwiperCore.use([Navigation, EffectFade, Autoplay, Keyboard]);

function BannerSlider(props) {
  const images = useMemo(() => ([
    '/images/banners/banner1.jpg',
    '/images/banners/banner2.jpg',
    '/images/banners/banner3.jpg',
    '/images/banners/banner4.jpg',
    '/images/banners/banner5.jpg'
  ]), []);

  return (<>
    <Paper className={props.className}>
      <Swiper
        id="main"
        tag="section"
        wrapperTag="ul"
        loop='true'
        spaceBetween={10}
        slidesPerView={1}
        speed={1000}
        keyboard={{
          enabled: true,
          onlyInViewport: true,
          pageUpDown: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
        {images.map(src => (
          <SwiperSlide
            key={src}
            tag="li"
            style={{ listStyle: 'none' }}
          >
            <div
              style={{ width: '100%', height: '100%', backgroundImage: `url(${src})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}
            >
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Paper>
  </>)
}
export default memo(BannerSlider);
