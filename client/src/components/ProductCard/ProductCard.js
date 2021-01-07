import { Card, CardActionArea, CardContent, CardMedia, Divider } from '@material-ui/core';
import { Rating, Skeleton } from '@material-ui/lab';
import { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { calcAverageNumOfArray } from '../../functions';
import ProductCardActions from './ProductCardActions';
import { useStyles } from './ProductCardClasses';
import ProductCardInfo from './ProductCardInfo';
import ProductCardPrice from './ProductCardPrice';
import ProductCardTimer from './ProductCardTimer';

function ProductCard({ product, status, className, ...props }) {
  const classes = useStyles(props);
  
  const rating = useMemo(() => {
    if (!product.rating || !product.rating.length) return 0;
    else return calcAverageNumOfArray(product.rating);
  }, [product.rating]);

  const cardClasses = useMemo(() => ({
    root: className
  }), [className]);

  let cardMedia;
  if (!status.isSuccess) cardMedia = (
    <Skeleton
      className={classes.imageSkelet}
      width="100%"
      height="180px"
    />
  )
  else cardMedia = (
    <CardMedia
      className={classes.cardMedia}
      image={`/images/products/${product.mainImage}`}
      title={product.name}
    />
  )

  return (
    <Card
      classes={cardClasses}
      className={classes.card}
      variant="outlined"
    >
      {product.sale && (
        <ProductCardTimer sale={product.sale} />
      )}
      {status.isSuccess && (
        <Rating
          className={classes.cardRating}
          name="rating"
          readOnly
          value={rating}
          size="small"
        />
      )}
      <CardActionArea
        component={Link}
        to={`/product/${product.url}`}
      >
        {cardMedia}
        <CardContent className={classes.cardBody}>
          <ProductCardInfo product={product} status={status} />
          <ProductCardPrice product={product} status={status} />
        </CardContent>
        <Divider />
      </CardActionArea>
      <ProductCardActions product={product} status={status} />
    </Card>
  );
}

export default memo(ProductCard);