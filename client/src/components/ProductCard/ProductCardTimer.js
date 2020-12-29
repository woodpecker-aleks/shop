import { useEffect, useState, memo } from 'react';
import { useStyles } from './ProductCardClasses';

function ProductCardTimer({ sale }) {
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
          setSaleTime(`${saleTime.getDate()}:${saleTime.getHours()}:${saleTime.getMinutes()}:${saleTime.getSeconds()}`);
        } else timer = null;
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  });

  let saleTimer = null;
  if (saleTime) saleTimer = <div className={classes.cardSaleTimer}>LEFT {saleTime}</div>

  return saleTimer;
}

export default memo(ProductCardTimer);