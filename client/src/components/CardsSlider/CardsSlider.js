import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay, Keyboard } from 'swiper';
import 'swiper/swiper-bundle.css';
import ProductCard from '../ProductCard/ProductCard';
import { useStyles } from './CardsSliderClasses';
import '../../css/swiper.css';
import { useEffect, useState, memo, useMemo } from 'react'
import { useHttp } from '../../hooks/http.hook';
import clsx from 'clsx';
import { Typography } from '@material-ui/core';

SwiperCore.use([Navigation, Pagination, Autoplay, Keyboard]);

function CardsSlider({ className, filter, ...props }) {
  const classes = useStyles();
  const slideStyles = { listStyle: 'none' }
  const [cards, setCards] = useState([1,2,3,4]);
  const { request, status } = useHttp();
  const swiperConfig = useMemo(() => {
    if (cards.length >= 4) return { navigation: true }
    else return {}
  }, [cards.length]);

  useEffect(() => {
    request('/api/products', 'POST', filter).then(data => setCards(data));
  }, [request, filter]);

  let slides;
  if (cards.length) slides = (
    cards.map((card, index) => (
      <SwiperSlide
        className={classes.slide}
        key={card._id ?? index}
        tag="li"
        style={slideStyles}
      >
        <ProductCard
          className={classes.slideCard}
          product={card}
          status={status}
        />
      </SwiperSlide>
  )))
  else slides = (
    <SwiperSlide
        className={classes.slide}
        tag="li"
        style={slideStyles}
    >
      <Typography
        variant="button"
        className={classes.noCardsTitle}
      >
        No products
      </Typography>
    </SwiperSlide>
  )

  return (<>
    <Swiper
      className={clsx(classes.slider, className)}
      tag="section"
      wrapperTag="ul"
      loop={(cards.length >= 4) ? true : false}
      speed={800}
      pagination={cards.length >= 4 ? {
        clickable: true,
      } : false}
      spaceBetween={0}
      slidesPerView={(cards.length) ? 4 : 1}
      keyboard={{
        enabled: true,
        onlyInViewport: true,
        pageUpDown: true,
      }}
      {...swiperConfig}
    >
      {slides}
    </Swiper>
  </>)
}
export default memo(CardsSlider);
