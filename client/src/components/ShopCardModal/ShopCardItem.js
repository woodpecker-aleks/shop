import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText, Menu, MenuItem } from "@material-ui/core";
import MoreVertSharpIcon from '@material-ui/icons/MoreVertSharp';
import { memo, useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { transferCurrency } from "../../functions";
import { removeProductFromCart, setProductCountFromCart } from "../../redux/reducers/appShopCartReducer";
import Carousel from "../Carousel/Carousel";
import { useStyles } from "./ShopCardModalClasses";
import BackspaceSharpIcon from '@material-ui/icons/BackspaceSharp';
import PlusOneSharpIcon from '@material-ui/icons/PlusOneSharp';
import ExposureNeg1SharpIcon from '@material-ui/icons/ExposureNeg1Sharp';

function ShopCardItem({ product, deleteItem, ...props }) {
  const { currency, shopCartProducts } = useSelector(store => ({
    shopCartProducts: store.appShopCart.products,
    currency: store.appCurrency
  }));
  const classes = useStyles();
  const dispatch = useDispatch();

  const dispatchRemoveProductFromCart = useCallback(() => {
    dispatch( removeProductFromCart(product._id) );
    deleteItem();
  }, [product._id, dispatch, deleteItem]);

  const dispatchIncrementProductCountFromCart = useCallback(() => {
    dispatch( setProductCountFromCart({ productId: product._id, count: shopCartProducts.find(prod => prod.id === product._id)?.count + 1 }));
  }, [product._id, shopCartProducts, dispatch]);

  const dispatchDecrementProductCountFromCart = useCallback(() => {
    dispatch( setProductCountFromCart({ productId: product._id, count: shopCartProducts.find(prod => prod.id === product._id)?.count - 1 }));
  }, [product._id, shopCartProducts, dispatch]);

  const price = useMemo(() => transferCurrency(product.price, currency), [product.price, currency]);
  const count = useMemo(() => shopCartProducts.find(prod => prod.id === product._id)?.count, [shopCartProducts, product._id]);
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
        </Menu>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export default memo(ShopCardItem);