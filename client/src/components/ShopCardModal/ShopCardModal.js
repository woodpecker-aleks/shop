import { Badge, IconButton, Popover, Tooltip } from "@material-ui/core";
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import clsx from 'clsx';
import { memo, useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import useGlobalStyles from '../../globalClasses';
import { clearNotifications } from "../../redux/reducers/appShopCardReducer";
import ShopCardList from './ShopCardList';
import { useStyles } from "./ShopCardModalClasses";

function ShopCardModal() {
  const classes = useStyles();
<<<<<<< HEAD

  const { shopCardNotifications, shopCardProducts } = useSelector(store => ({
    shopCardNotifications: store.appShopCard.notifications,
    shopCardProducts: store.appShopCard.products
  }));

  const badgeClasses = useMemo(() => ({ badge: classes.changesDot }), [classes.changesDot]);

=======
  const { shopCardNotifications, shopCardProducts } = useSelector(store => ({
    shopCardNotifications: store.appShopCard.notifications,
    shopCardProducts: store.appShopCard.products,
  }));
  const badgeClasses = useMemo(() => ({ badge: classes.changesDot }), [classes.changesDot]);
>>>>>>> 3fdf54a64d164a4164d1823d2da6c8e267874d56
  const popoverAnchorOrigin = useMemo(() => ({
    vertical: 'bottom',
    horizontal: 'right',
  }), []);
<<<<<<< HEAD

=======
>>>>>>> 3fdf54a64d164a4164d1823d2da6c8e267874d56
  const popoverTransformOrigin = useMemo(() => ({
    vertical: 'top',
    horizontal: 'right',
  }), []);
<<<<<<< HEAD

  const dispatch = useDispatch();

  const [modalAnchor, setModalEnchor] = useState(null);

  const glClasses = useGlobalStyles();

  const productIds = useMemo(() => shopCardProducts.map(product => product.id), [shopCardProducts]);

  const notifications = useMemo(() => shopCardNotifications > 0 ? shopCardNotifications : 0, [shopCardNotifications]);
  
=======
  const dispatch = useDispatch();
  const [modalAnchor, setModalEnchor] = useState(null);
  const glClasses = useGlobalStyles();
  const productIds = useMemo(() => shopCardProducts.map(product => product.id), [shopCardProducts]);
  const notifications = useMemo(() => shopCardNotifications > 0 ? shopCardNotifications : 0, [shopCardNotifications]);
>>>>>>> 3fdf54a64d164a4164d1823d2da6c8e267874d56
  const handleCloseModal = useCallback(() => setModalEnchor(null), [setModalEnchor]);

  const handleOpenModal = useCallback(event => {
    setModalEnchor(event.currentTarget);
    dispatch( clearNotifications() );
  }, [setModalEnchor, dispatch]);

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
            classes={badgeClasses}
          >
            <ShoppingCartOutlinedIcon />
          </Badge>
        </IconButton>
      </Tooltip>
      <Popover
        onClose={handleCloseModal}
        open={Boolean(modalAnchor)}
        anchorEl={modalAnchor}
        anchorOrigin={popoverAnchorOrigin}
        transformOrigin={popoverTransformOrigin}
      >
        <ShopCardList productIds={productIds} />
      </Popover>
  </>)
}

export default memo(ShopCardModal);