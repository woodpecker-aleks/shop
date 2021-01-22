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
  
  const { shopCardNotifications, shopCardProducts } = useSelector(store => ({
    shopCardNotifications: store.appShopCard.notifications,
    shopCardProducts: store.appShopCard.products
  }));

  const badgeClasses = useMemo(() => ({ badge: classes.changesDot }), [classes.changesDot]);

  const popoverAnchorOrigin = useMemo(() => ({
    vertical: 'bottom',
    horizontal: 'right',
  }), []);

  const popoverTransformOrigin = useMemo(() => ({
    vertical: 'top',
    horizontal: 'right',
  }), []);

  const dispatch = useDispatch();

  const [modalAnchor, setModalEnchor] = useState(null);

  const glClasses = useGlobalStyles();

  const notifications = useMemo(() => shopCardNotifications > 0 ? shopCardNotifications : 0, [shopCardNotifications]);
  
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
        <ShopCardList products={shopCardProducts} />
      </Popover>
  </>)
}

export default memo(ShopCardModal);