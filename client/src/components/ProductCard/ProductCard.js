import { Badge, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Divider, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useStyles } from './ProductCardClasses';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Rating, Skeleton } from '@material-ui/lab';
import { useEffect, useState } from 'react';

function ProductCard(props) {
  const classes = useStyles(props);
  const { card, loading, className } = props;
  const [saleTime, setSaleTime] = useState(null);
  const rating = (!card.rating?.length) ? 0 :
    card.rating.reduce((accum, curr) => (accum + curr), 0) / card.rating.length;

  useEffect(() => {
    let timer = null;

    if (card.sale) {
      const saleEndTime = new Date(card.sale.end);

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
  if (saleTime) saleTimer = <div className={classes.cardSaleTimer}>Left {saleTime}</div>

  return (
    <Card
      classes={{
        root: className
      }}
      className={classes.card}
    >
      {saleTimer}
      {(!loading && (
        <Rating
          className={classes.cardRating}
          name="rating"
          readOnly
          value={rating}
          size="small"
        />
      ))}
      <CardActionArea
        component={Link}
        to={`/product/${card.url}`}
      >
        {(loading) ? (
          <Skeleton
            className={classes.imageSkelet}
            width="100%"
            height="180px"
          />
        ) : (
          <CardMedia
            className={classes.cardMedia}
            image={`/images/products/${card.mainImage}`}
            title={card.name}
          />
        )}
        <CardContent className={classes.cardBody}>
          {(loading) ? (<>
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
          </>) : (<>
            <Typography
              gutterBottom
              variant="h5"
              component="h4"
              className={classes.cardTitle}
            >
              {card.name}
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              component="ul"
              className={classes.descriptionList}
            >
              <li className={card.count ? classes.positive : classes.negative}>{ card.count ? 'Are available' : 'Not available' }</li>
              <li>Free shipping</li>
              <li>{card.options && card.options.find(opt => opt.name === 'Brand').value}</li>
            </Typography>
          </>)}
          <div className={classes.cardPrice}>
            {(saleTime) ? (<>
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
                  {card.sale.price}$
                </Typography>
              </Badge>
              <Typography
                variant="h6"
                component="strike"
                className={classes.cardOldPrice}
              >
                {card.price}$
              </Typography>
            </>) : (
              <Typography
                variant="h6"
                component="span"
                className={classes.cardNewPrice}
              >
                {card.price}$
              </Typography>
            )}
          </div>
          </CardContent>
        <Divider />
      </CardActionArea>
      <CardActions className={classes.cardFooter}>
        <Button startIcon={<ShoppingCartOutlinedIcon />}>
          Buy
        </Button>
        <Button startIcon={<FavoriteBorderOutlinedIcon />}>
          Like
        </Button>
        <Button
          component={Link}
          to={`/product/${card.url}`}
          startIcon={<ExpandMoreIcon />}
        >
          More
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;