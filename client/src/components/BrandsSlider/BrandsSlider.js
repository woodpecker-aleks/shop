import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay, Keyboard } from 'swiper';
import 'swiper/swiper-bundle.css';
import '../../css/swiper.css';
import { useStyles } from './BrandsSliderClasses';
import { Paper } from '@material-ui/core';
import { memo } from 'react';

SwiperCore.use([Navigation, Pagination, Autoplay, Keyboard]);

function BransSlider({ cards }) {
  const classes = useStyles();

  return (<>
    <Paper className={classes.root}>
      <Swiper
        className={classes.slider}
        tag="section"
        wrapperTag="ul"
        loop={(cards.length >= 4) ? true : false}
        speed={800}
        spaceBetween={0}
        slidesPerView={5}
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
        {cards.map((card, index) => (
          <SwiperSlide
            className={classes.slide}
            key={card._id ?? index}
            tag="li"
            style={{ listStyle: 'none' }}
          >
            <div
              style={{ backgroundImage: `url(${card})` }}
              className={classes.slideImg}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Paper>
  </>)
}
export default memo(BransSlider);