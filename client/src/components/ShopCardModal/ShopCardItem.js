import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText, Menu, MenuItem } from "@material-ui/core";
import MoreVertSharpIcon from '@material-ui/icons/MoreVertSharp';
import { memo, useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { transferCurrency } from "../../functions";
import { removeProductFromCard, setProductCountFromCard } from "../../redux/reducers/appShopCardReducer";
import Carousel from "../Carousel/Carousel";
import { useStyles } from "./ShopCardModalClasses";
import BackspaceSharpIcon from '@material-ui/icons/BackspaceSharp';
import PlusOneSharpIcon from '@material-ui/icons/PlusOneSharp';
import ExposureNeg1SharpIcon from '@material-ui/icons/ExposureNeg1Sharp';

function ShopCardItem({ product, deleteItem, ...props }) {
  const currency = useSelector(store => store.appCurrency);
  
  const classes = useStyles();
  const dispatch = useDispatch();

  const dispatchRemoveProductFromCard = useCallback(() => {
    dispatch( removeProductFromCard(product.id) );
    deleteItem();
  }, [product.id, dispatch, deleteItem]);

  const dispatchIncrementProductCountFromCard = useCallback(() => {
    dispatch(setProductCountFromCard({ productId: product.id, count: product.count + 1 }));
  }, [product.id, product.count, dispatch]);

  const dispatchDecrementProductCountFromCard = useCallback(() => {
    dispatch( setProductCountFromCard({ productId: product.id, count: product.count - 1 }));
  }, [product.id, product.count, dispatch]);

  const price = useMemo(() => transferCurrency(product.info.price, currency), [product.info.price, currency]);

  const count = useMemo(() => product.count, [product.count]);

  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const handleCloseMenu = useCallback(() => setMenuAnchorEl(null), []);
  
  const handleOpenMenu = useCallback(event => setMenuAnchorEl(event.currentTarget), []);

  return (
    <ListItem
      button
      component={Link}
      to={`/product/${product.info.url}`}
    >
      <ListItemAvatar>
        <Avatar
          alt={product.info.name}
          src={`/images/products/${product.info.mainImage}`}
          variant="rounded"
          classes={{
            img: classes.productAvatar
          }}
        />
      </ListItemAvatar>
      <ListItemText
        classes={{ primary: classes.primaryText }}
        primary={<Carousel className={classes.carousel} active={true}><span className={classes.carouselContent}>{product.info.name}</span></Carousel>}
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
          <MenuItem onClick={dispatchRemoveProductFromCard}>
            <ListItemIcon className={classes.menuItemIcon}>
              <BackspaceSharpIcon fontSize="small" />
            </ListItemIcon>
            Remove
          </MenuItem>
          <MenuItem onClick={dispatchIncrementProductCountFromCard}>
            <ListItemIcon className={classes.menuItemIcon}>
              <PlusOneSharpIcon fontSize="small" />
            </ListItemIcon>
            Increment
          </MenuItem>
          <MenuItem onClick={dispatchDecrementProductCountFromCard}>
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
