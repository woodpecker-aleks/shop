import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText } from "@material-ui/core";
import BackspaceSharpIcon from '@material-ui/icons/BackspaceSharp';
import { memo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { disslikeProduct } from "../../redux/reducers/appLikedProductsCardReducer";
import { useStyles } from "./LikedProductsModalClasses";

function LikedProductsItem({ product, deleteProduct, ...props }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const removeProduct = useCallback(() => {
    dispatch( disslikeProduct(product._id) );
    deleteProduct();
  }, [product._id, dispatch, deleteProduct]);

  return (
    <ListItem
      key={product._id}
      button
      component={Link}
      to={`/product/${product.url}`}
    >
      <ListItemAvatar>
        <Avatar
          alt={product.name}
          src={`/images/products/${product.mainImage}`}
          variant="rounded"
          classes={{
            img: classes.productAvatar
          }}
        />
      </ListItemAvatar>
      <ListItemText primary={product.name} />
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="remove"
          onClick={removeProduct}
          className={classes.deleteBtn}
        >
          <BackspaceSharpIcon fontSize="small" />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export default memo(LikedProductsItem, (prevProps, nextProps) => prevProps.product._id !== nextProps.product._id);