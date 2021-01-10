import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Menu, MenuItem } from "@material-ui/core";
import MoreVertSharpIcon from '@material-ui/icons/MoreVertSharp';
import { memo, useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { transferCurrency } from "../../functions";
import { removeProductFromCard, setProductCountFromCard } from "../../redux/reducers/appShopCardReducer";
import Carousel from "../Carousel/Carousel";
import { useStyles } from "./ShopCardModalClasses";

function ShopCardItem({ product, deleteItem, ...props }) {
  const { currency, shopCardProducts } = useSelector(store => ({
    shopCardProducts: store.appShopCard.products,
    currency: store.appCurrency
  }));
  const classes = useStyles();
  const dispatch = useDispatch();

  const dispatchRemoveProductFromCard = useCallback(() => {
    dispatch( removeProductFromCard(product._id) );
    deleteItem();
  }, [product._id, dispatch, deleteItem]);

  const dispatchIncrementProductCountFromCard = useCallback(() => {
    dispatch( setProductCountFromCard({ productId: product._id, count: shopCardProducts.find(prod => prod.id === product._id)?.count + 1 }));
  }, [product._id, shopCardProducts, dispatch]);

  const dispatchDecrementProductCountFromCard = useCallback(() => {
    dispatch( setProductCountFromCard({ productId: product._id, count: shopCardProducts.find(prod => prod.id === product._id)?.count - 1 }));
  }, [product._id, shopCardProducts, dispatch]);

  const price = useMemo(() => transferCurrency(product.price, currency), [product.price, currency]);
  const count = useMemo(() => shopCardProducts.find(prod => prod.id === product._id)?.count, [shopCardProducts, product._id]);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const handleCloseMenu = useCallback(() => setMenuAnchorEl(null), []);
  const handleOpenMenu = useCallback(event => setMenuAnchorEl(event.currentTarget), []);

  return (
    <ListItem
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
      <ListItemText
        classes={{ primary: classes.primaryText }}
        primary={<Carousel className={classes.carousel} active={true}><span className={classes.carouselContent}>{product.name}</span></Carousel>}
        secondary={`price: ${price} count: ${count}`}
      />
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="more"
          onClick={handleOpenMenu}
          className={classes.deleteBtn}
        >
          <MoreVertSharpIcon />
        </IconButton>
        <Menu
          anchorEl={menuAnchorEl}
          keepMounted
          open={Boolean(menuAnchorEl)}
          onClose={handleCloseMenu}
        >
          <MenuItem onClick={dispatchRemoveProductFromCard}>Remove</MenuItem>
          <MenuItem onClick={dispatchIncrementProductCountFromCard}>Increment</MenuItem>
          <MenuItem onClick={dispatchDecrementProductCountFromCard}>Decrement</MenuItem>
        </Menu>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export default memo(ShopCardItem, (prevProps, nextProps) => {
  if (prevProps.product._id !== nextProps.product._id) return false;
  if (prevProps.product.price !== nextProps.product.price) return false;
});