import { useEffect, useState, memo } from 'react';
import { useStyles } from './ProductCardClasses';
import moment from 'moment';
import clsx from 'clsx';

function ProductCardTimer({ sale, className }) {
  const classes = useStyles();
  const [saleTime, setSaleTime] = useState(null);

  useEffect(() => {
    let timer = null;
    
    if (sale) {
      const saleEndTime = new Date(sale.end);

      timer = setInterval(() => {
        const currentTime = Date.now();

        if (saleEndTime > currentTime) {
          const saleTime = new Date(saleEndTime - currentTime);
          setSaleTime(moment(saleTime).format('[in] DD:hh:mm:ss'));
        } else timer = null;
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [sale]);

  let saleTimer = null;
  if (saleTime) saleTimer = <div className={clsx(classes.cardSaleTimer, className)}>{saleTime}</div>

  return saleTimer;
}

export default memo(ProductCardTimer);