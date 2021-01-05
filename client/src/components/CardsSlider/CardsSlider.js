import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay, Keyboard } from 'swiper';
import 'swiper/swiper-bundle.css';
import ProductCard from '../ProductCard/ProductCard';
import { useStyles } from './CardsSliderClasses';
import '../../css/swiper.css';
import { useEffect, useState, memo, useMemo } from 'react'
import { useHttp } from '../../hooks/http.hook';

SwiperCore.use([Navigation, Pagination, Autoplay, Keyboard]);

function CardsSlider({ filter, ...props }) {
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

  return (<>
    <Swiper
      className={classes.slider}
      tag="section"
      wrapperTag="ul"
      loop={(cards.length >= 4) ? true : false}
      speed={800}
      pagination={(cards.length >= 4) ? {
        clickable: true,
      } : false}
      spaceBetween={0}
      slidesPerView={4}
      keyboard={{
        enabled: true,
        onlyInViewport: true,
        pageUpDown: true,
      }}
      {...swiperConfig}
    >
      {cards.map((card, index) => (
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
      ))}
    </Swiper>
  </>)
}
export default memo(CardsSlider);
