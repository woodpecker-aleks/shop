import { Button, CardActions } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { memo, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { disslikeProduct, likedProductSelector, likeProduct } from '../../redux/reducers/appLikedProductsCardReducer';
import { useStyles } from "./ProductCardClasses";
import FavoriteIcon from '@material-ui/icons/Favorite';
import { addProductToCard } from '../../redux/reducers/appShopCardReducer';

function ProductCardActions({ product, status, ...props }) {
  const classes = useStyles();
  const { isLiked, isAuth } = useSelector(store => ({
    isLiked: likedProductSelector(store, product._id),
    isAuth: store.appAuth.isAuth
  }));
  const dispatch = useDispatch();

  const dispatchAddToShopCard = useCallback(() => {
    dispatch( addProductToCard(product._id) );
  }, [product._id, dispatch]);
  
  const dispatchLikeProduct = useCallback(() => {
    dispatch( likeProduct(product._id) );
  }, [product._id, dispatch]);
  
  const dispatchDisslikeProduct = useCallback(() => {
    dispatch( disslikeProduct(product._id) );
  }, [product._id, dispatch]);

  return (
    <CardActions className={classes.cardFooter}>
      <Button
        startIcon={<ShoppingCartOutlinedIcon />}
        onClick={dispatchAddToShopCard}
      >
        Buy
      </Button>
      <Button
        startIcon={isLiked 
          ? <FavoriteIcon className={classes.activeLikeIcon} /> 
          : <FavoriteBorderOutlinedIcon />
        }
        onClick={isLiked ? dispatchDisslikeProduct : dispatchLikeProduct}
        disabled={!isAuth}
      >
        Like
      </Button>
      <Button
        component={Link}
        to={`/product/${product.url}`}
        startIcon={<ExpandMoreIcon />}
      >
        More
      </Button>
    </CardActions>
  )
}

export default memo(ProductCardActions);