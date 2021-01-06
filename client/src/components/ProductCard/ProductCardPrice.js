import { Badge, Typography } from '@material-ui/core';
import { memo, useMemo } from "react";
import { useSelector } from 'react-redux';
import { transferCurrency } from '../../functions';
import { useStyles } from "./ProductCardClasses";
import { Skeleton } from '@material-ui/lab';

function ProductCardPrice({ product, status, ...props }) {
  const classes = useStyles();
  const currency = useSelector(store => store.appCurrency);

  const price = useMemo(() => {
    if (product.price) return transferCurrency(product.price, currency);
    else return 0;
  }, [product.price, currency]);

  const salePrice = useMemo(() => {
    if (product.sale?.price) return transferCurrency(product.sale.price, currency);
    else return 0;
  }, [product.sale?.price, currency]);

  let productPrice;

  if (status.isLoading) productPrice = (
    <Skeleton
      variant="text"
      className={classes.cardPrice}
      width="50%"
      height="26px"
    />
  )
  else if (product.sale) productPrice = (<>
    <Badge
      badgeContent="%"
      color="primary"
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <Typography
        variant="h6"
        component="span"
        className={classes.cardNewPrice}
      >
        {salePrice}
      </Typography>
    </Badge>
    <Typography
      variant="h6"
      component="strike"
      className={classes.cardOldPrice}
    >
      {price}
    </Typography>
  </>)
  else productPrice = (
    <Typography
      variant="h6"
      component="span"
      className={classes.cardNewPrice}
    >
      {price}
    </Typography>
  )

  return (
    <div className={classes.cardPrice}>
      {productPrice}
    </div>
  )
}

export default memo(ProductCardPrice);