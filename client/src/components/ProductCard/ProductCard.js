import { Badge, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Divider, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useStyles } from './ProductCardClasses';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Rating, Skeleton } from '@material-ui/lab';
import ProductCardTimer from './ProductCardTimer';
import { SUCCESS } from '../../constants';
import { memo, useMemo } from 'react';

function ProductCard(props) {
  const classes = useStyles(props);
  const { card, status, className } = props;
  const rating = useMemo(() => {
    if (!card.rating?.length) return 0;
    else return card.rating.reduce((accum, curr) => (accum + curr), 0);
  }, [card.rating]);
  
  return (
    <Card
      classes={{
        root: className
      }}
      className={classes.card}
    >
      {(card.sale) && (
        <ProductCardTimer sale={card.sale} />
      )}
      {(status === SUCCESS) && (
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
        to={`/product/${card.url}`}
      >
        {(status !== SUCCESS) ? (
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
          {(status !== SUCCESS) ? (<>
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
            {(card.sale) ? (<>
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

export default memo(ProductCard);