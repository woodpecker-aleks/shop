import { Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { memo } from "react";
import { useStyles } from "./ProductCardClasses";

function ProductCardInfo({ product, status, ...props }) {
  const classes = useStyles();

  if (!status.isSuccess) return (<>
    <Skeleton width="100%">
      <Typography
        gutterBottom
        variant="h5"
        component="h4"
        className={classes.cardTitle}
      >
        ...
      </Typography>
    </Skeleton>
    <Skeleton width="100%">
      <Typography
        variant="body1"
        color="textSecondary"
        component="ul"
        className={classes.descriptionList}
      >
        <li>...</li>
        <li>...</li>
        <li>...</li>
      </Typography>
    </Skeleton>
  </>)
  else return (<>
    <Typography
      gutterBottom
      variant="h5"
      component="h4"
      className={classes.cardTitle}
    >
      {product.name}
    </Typography>
    <Typography
      variant="body1"
      color="textSecondary"
      component="ul"
      className={classes.descriptionList}
    >
      <li className={product.count ? classes.positive : classes.negative}>
        { product.count ? 'Are available' : 'Not available' }
      </li>
      <li>Free shipping</li>
      <li>{product.options && product.options.find(opt => opt.name === 'Brand').value}</li>
    </Typography>
  </>)
}

export default memo(ProductCardInfo);