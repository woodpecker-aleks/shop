import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay, Keyboard } from 'swiper';
import 'swiper/swiper-bundle.css';
import ProductCard from '../ProductCard/ProductCard';
import { useStyles } from './CardsSliderClasses';
import '../../css/swiper.css';


SwiperCore.use([Navigation, Pagination, Autoplay, Keyboard]);

function CardsSlider({ cards, loading }) {
  const classes = useStyles();

  return (<>
    <Swiper
      className={classes.slider}
      tag="section"
      wrapperTag="ul"
      loop={(cards.length >= 4) ? true : false}
      speed={800}
      navigation
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
    >
      {cards.map((card, index) => (
        <SwiperSlide
          className={classes.slide}
          key={card._id ?? index}
          tag="li"
          style={{ listStyle: 'none' }}
        >
          <ProductCard className={classes.slideCard} card={card} loading={loading} />
        </SwiperSlide>
      ))}
    </Swiper>
  </>)
}
export default CardsSlider;
