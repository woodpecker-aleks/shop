import { Avatar, Badge, CircularProgress, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Popover, Tooltip, Typography } from "@material-ui/core";
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import clsx from 'clsx';
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import Scrollbars from "react-custom-scrollbars";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { POST } from "../../constants";
import useGlobalStyles from '../../globalClasses';
import { useHttp } from '../../hooks/http.hook';
import { disslikeProduct, clearNotifications } from "../../redux/reducers/appLikedProductsCardReducer";
import { useStyles } from "./LikedProductsModalClasses";
import BackspaceSharpIcon from '@material-ui/icons/BackspaceSharp';

function LikedProductsModal() {
  const { likedProductsNotifications, likedProductIds, isAuth } = useSelector(store => ({
    likedProductsNotifications: store.likedProductsCard.notifications,
    likedProductIds: store.likedProductsCard.likedProducts,
    isAuth: store.appAuth.isAuth,
  }));
  const dispatch = useDispatch();
  const [modalAnchor, setModalEnchor] = useState(null);
  const classes = useStyles();
  const glClasses = useGlobalStyles();
  const { request, status } = useHttp();
  const [products, setProducts] = useState([]);
  const scrollbarsStyles = useMemo(() => ({ width: '20vw', height: '50vh' }), []);

  const notifications = useMemo(() => {
    if (likedProductsNotifications > 0) return likedProductsNotifications;
    else return 0;
  }, [likedProductsNotifications]); 

  useEffect(() => {
    if (isAuth && modalAnchor) request('/api/products', POST, {
      filter: {},
      ids: likedProductIds
    })
    .then(products => setProducts(products));
  }, [isAuth, likedProductIds, modalAnchor, request]);
  
  const handleOpenModal = useCallback(event => {
    setModalEnchor(event.currentTarget);
    dispatch( clearNotifications() );
  }, [setModalEnchor, dispatch]);

  const handleCloseModal = useCallback(() => setModalEnchor(null), [setModalEnchor]);

  let likedProducts = null;
  if (!status.isSuccess) likedProducts = (
    <CircularProgress color="secondary" className={classes.progress} />
  )
  else if (!products.length) likedProducts = (
    <Typography
      variant="button"
      className={classes.notFoundText}
    >
      No liked products
    </Typography>
  )
  else likedProducts = (
    products.map(product => (
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
            onClick={() => dispatch( disslikeProduct(product._id, dispatch) )}
            className={classes.deleteBtn}
          >
            <BackspaceSharpIcon fontSize="small" />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ))
  )

  if (!isAuth) return null;

  return (<>
    <Tooltip
      title="Liked"
      placement="bottom"
    >
      <IconButton
          color="inherit"
          className={clsx(classes.iconButton, glClasses.iconButton)}
          onClick={handleOpenModal}
        >
          <Badge
            badgeContent={notifications}
            color="secondary"
            classes={{
              badge: classes.changesDot
            }}
          >
            <FavoriteBorderOutlinedIcon />
          </Badge>
        </IconButton>
      </Tooltip>
      <Popover
        onClose={handleCloseModal}
        open={Boolean(modalAnchor)}
        anchorEl={modalAnchor}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Scrollbars style={scrollbarsStyles}>
          <List className={classes.likedProductsList}>
            {likedProducts}
          </List>
        </Scrollbars>
      </Popover>
  </>)
}

export default memo(LikedProductsModal);