import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Divider, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useStyles } from './ProductCardClasses';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { If } from '../../jsxOperators';
import { Skeleton } from '@material-ui/lab';
import clsx from 'clsx';

function ProductCard(props) {
  const classes = useStyles(props);
  const { card, loading, className } = props;
  
  return (
    <Card
        classes={{
          root: className
        }}
        className={clsx(classes.card, className)}
      >
        <CardActionArea
          component={Link}
          to={`/product/${card.url}`}
        >
          {If(loading)(() => (
            <Skeleton className={classes.imageSkelet} width="100%" height="100%">
            </Skeleton>
          ))
          .Else(() => (
            <CardMedia
              className={classes.cardMedia}
              image={`/images/products/${card.mainImage}`}
              title={card.name}
            />
          ))}
          <CardContent className={classes.cardBody}>
            {If(loading)(() => (<>
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
            </>))
            .Else(() => (<>
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
                <li>{ card.count ? 'Are available' : 'Not available' }</li>
                <li>Free shipping</li>
                <li>Discount</li>
              </Typography>
            </>))}
            <div className={classes.cardPrice}>
              {If(card.sale)(() => (<>
                <Typography
                  variant="h6"
                  component="span"
                  className={classes.cardNewPrice}
                >
                  {card.sale.price}$
                </Typography>
                <Typography
                  variant="h6"
                  component="strike"
                  className={classes.cardOldPrice}
                >
                  {card.price}
                </Typography>
              </>))
              .Else(() => (
                <Typography
                  variant="h6"
                  component="span"
                  className={classes.cardNewPrice}
                >
                  {card.price}$
                </Typography>
              ))}
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