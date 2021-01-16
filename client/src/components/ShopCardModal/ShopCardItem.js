<<<<<<< HEAD
import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText, Menu, MenuItem } from "@material-ui/core";
=======
import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Menu, MenuItem } from "@material-ui/core";
>>>>>>> 3fdf54a64d164a4164d1823d2da6c8e267874d56
import MoreVertSharpIcon from '@material-ui/icons/MoreVertSharp';
import { memo, useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { transferCurrency } from "../../functions";
import { removeProductFromCard, setProductCountFromCard } from "../../redux/reducers/appShopCardReducer";
import Carousel from "../Carousel/Carousel";
import { useStyles } from "./ShopCardModalClasses";
<<<<<<< HEAD
import BackspaceSharpIcon from '@material-ui/icons/BackspaceSharp';
import PlusOneSharpIcon from '@material-ui/icons/PlusOneSharp';
import ExposureNeg1SharpIcon from '@material-ui/icons/ExposureNeg1Sharp';
=======
>>>>>>> 3fdf54a64d164a4164d1823d2da6c8e267874d56

function ShopCardItem({ product, deleteItem, ...props }) {
  const { currency, shopCardProducts } = useSelector(store => ({
    shopCardProducts: store.appShopCard.products,
    currency: store.appCurrency
  }));
<<<<<<< HEAD

  const classes = useStyles();
  
  const dispatch = useDispatch();

  const dispatchRemoveProductFromCart = useCallback(() => {
=======
  const classes = useStyles();
  const dispatch = useDispatch();

  const dispatchRemoveProductFromCard = useCallback(() => {
>>>>>>> 3fdf54a64d164a4164d1823d2da6c8e267874d56
    dispatch( removeProductFromCard(product._id) );
    deleteItem();
  }, [product._id, dispatch, deleteItem]);

<<<<<<< HEAD
  const dispatchIncrementProductCountFromCart = useCallback(() => {
    dispatch( setProductCountFromCard({ productId: product._id, count: shopCardProducts.find(prod => prod.id === product._id)?.count + 1 }));
  }, [product._id, shopCardProducts, dispatch]);

  const dispatchDecrementProductCountFromCart = useCallback(() => {
=======
  const dispatchIncrementProductCountFromCard = useCallback(() => {
    dispatch( setProductCountFromCard({ productId: product._id, count: shopCardProducts.find(prod => prod.id === product._id)?.count + 1 }));
  }, [product._id, shopCardProducts, dispatch]);

  const dispatchDecrementProductCountFromCard = useCallback(() => {
>>>>>>> 3fdf54a64d164a4164d1823d2da6c8e267874d56
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
<<<<<<< HEAD
          <MenuItem onClick={dispatchRemoveProductFromCart}>
            <ListItemIcon className={classes.menuItemIcon}>
              <BackspaceSharpIcon fontSize="small" />
            </ListItemIcon>
            Remove
          </MenuItem>
          <MenuItem onClick={dispatchIncrementProductCountFromCart}>
            <ListItemIcon className={classes.menuItemIcon}>
              <PlusOneSharpIcon fontSize="small" />
            </ListItemIcon>
            Increment
          </MenuItem>
          <MenuItem onClick={dispatchDecrementProductCountFromCart}>
            <ListItemIcon className={classes.menuItemIcon}>
              <ExposureNeg1SharpIcon fontSize="small" />
            </ListItemIcon>
            Decrement
          </MenuItem>
=======
          <MenuItem onClick={dispatchRemoveProductFromCard}>Remove</MenuItem>
          <MenuItem onClick={dispatchIncrementProductCountFromCard}>Increment</MenuItem>
          <MenuItem onClick={dispatchDecrementProductCountFromCard}>Decrement</MenuItem>
>>>>>>> 3fdf54a64d164a4164d1823d2da6c8e267874d56
        </Menu>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

<<<<<<< HEAD
export default memo(ShopCardItem);
=======
export default memo(ShopCardItem, (prevProps, nextProps) => {
  if (prevProps.product._id !== nextProps.product._id) return false;
  if (prevProps.product.price !== nextProps.product.price) return false;
});
>>>>>>> 3fdf54a64d164a4164d1823d2da6c8e267874d56
