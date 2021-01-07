import { memo, useEffect, useRef, useState } from 'react';
import { useStyles } from './CarouselClasses';
import clsx from 'clsx';
import { setRecursiveTimeout } from '../../functions';

function Carousel({ active = true, speed = 5000, className, children, ...props }) {
  const classes = useStyles();
  const carouselRef = useRef(null);
  const innerCarouselRef = useRef(null);
  const [longer, setLonger] = useState(false);
  const [carouselStyles, setCarouselStyles] = useState({
    transition: `transform ${speed}ms linear`,
    display: 'inline-block'
  });

  useEffect(() => {
    const carousel = carouselRef.current;
    let intervalId;
    
    if (carousel.clientWidth < carousel.scrollWidth && active) {
      setLonger(true);
      intervalId = setRecursiveTimeout(() => {
        setCarouselStyles({
          transform: 'translateX(0)',
          display: 'inline-block'
        });
        setCarouselStyles({
          transform: `translateX(-${innerCarouselRef.current?.clientWidth / 2}px)`,
          transition: `transform ${speed}ms linear`,
          display: 'inline-block'
        });
      }, speed);
    }

    return () => clearTimeout(intervalId);
  }, [carouselRef, carouselRef.current?.clientWidth, speed, active]);
  
  return (
    <div
      ref={carouselRef}
      className={clsx(classes.root, className)}
    >
      <div
        style={carouselStyles}
        ref={innerCarouselRef}
      >
        {children}
        {longer && children}
      </div>
    </div>
  )
}

export default memo(Carousel);