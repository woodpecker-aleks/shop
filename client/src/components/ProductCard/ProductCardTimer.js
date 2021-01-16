import { useEffect, useState, memo, useCallback } from 'react';
import { useStyles } from './ProductCardClasses';
import moment from 'moment';
import clsx from 'clsx';
import { clearGlobalInterval, setGlobalInterval } from '../../functions';

function ProductCardTimer({ sale, className }) {
  const classes = useStyles();
  const [saleTime, setSaleTime] = useState(null);

  const updateTime = useCallback(() => {
    const saleEndTime = new Date(sale?.end);
    const currentTime = Date.now();

    if (saleEndTime > currentTime) {
      const saleTime = new Date(saleEndTime - currentTime);
      setSaleTime( moment(saleTime).format('[in] DD:hh:mm:ss') );
    }
  }, [sale?.end]);

  useEffect(() => {
    let timer;
    
    if (sale) {
      timer = setGlobalInterval(updateTime, 1000);
    }

    return () => clearGlobalInterval(timer);
  }, [sale, updateTime]);

  if (saleTime) return <div className={clsx(classes.cardSaleTimer, className)}>{saleTime}</div>
  else return null;
}

export default memo(ProductCardTimer);