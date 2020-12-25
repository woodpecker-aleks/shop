import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay, Keyboard } from 'swiper';
import 'swiper/swiper-bundle.css';
import ProductCard from '../ProductCard/ProductCard';
import { useHttp } from '../../hooks/http.hook';
import { useState, useEffect } from 'react';
import { useStyles } from './CardsSliderClasses';
import '../../css/swiper.css';

SwiperCore.use([Navigation, Pagination, Autoplay, Keyboard]);

function CardsSlider() {
  const classes = useStyles();
  const { loading, request } = useHttp();
  const [cards, setCards] = useState([1,2,3,4,5,6]);

  useEffect(() => {
    document.title = 'Home Page';

    request('/api/products', 'POST', {
      filter: {},
      length: 8
    }).then(data => setCards(data));
    console.log(123);
  }, [request]);

  return <>
    <Swiper
      className={classes.slider}
      id="main"
      tag="section"
      wrapperTag="ul"
      loop="true"
      speed={800}
      navigation
      pagination={{
        clickable: true,
      }}
      spaceBetween={0}
      slidesPerView={4}
      autoplay={{
        delay: 1500,
        disableOnInteraction: false,
      }}
      keyboard={{
        enabled: true,
        onlyInViewport: true,
        pageUpDown: true,
      }}
    >
      {cards.map((card, index) => (
        <SwiperSlide
          className={classes.slide}
          key={index}
          tag="li"
          style={{ listStyle: 'none' }}
        >
          <ProductCard className={classes.slideCard} card={card} loading={loading} />
        </SwiperSlide>
      ))}
    </Swiper>
  </>
}
export default CardsSlider;
