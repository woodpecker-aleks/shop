import { Badge, IconButton, Popover, Tooltip } from "@material-ui/core";
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import clsx from 'clsx';
import { memo, useCallback, useMemo, useState } from "react";
import Scrollbars from "react-custom-scrollbars";
import { useDispatch, useSelector } from "react-redux";
import useGlobalStyles from '../../globalClasses';
import { clearNotifications } from "../../redux/reducers/appLikedProductsCardReducer";
import LikedProductsList from "./LikedProductsList";
import { useStyles } from "./LikedProductsModalClasses";

function LikedProductsModal() {
  const { likedProductsNotifications, likedProductIds } = useSelector(store => ({
    likedProductsNotifications: store.likedProductsCard.notifications,
    likedProductIds: store.likedProductsCard.likedProducts,
  }));

  const dispatch = useDispatch();
  const [modalAnchor, setModalEnchor] = useState(null);
  const classes = useStyles();
  const glClasses = useGlobalStyles();
  const scrollbarsStyles = useMemo(() => ({ width: '20vw', height: '50vh' }), []);

  const notifications = useMemo(() => {
    if (likedProductsNotifications > 0) return likedProductsNotifications;
    else return 0;
  }, [likedProductsNotifications]); 

  const handleOpenModal = useCallback(event => {
    setModalEnchor(event.currentTarget);
    dispatch( clearNotifications() );
  }, [setModalEnchor, dispatch]);

  const handleCloseModal = useCallback(() => setModalEnchor(null), [setModalEnchor]);

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
          <LikedProductsList productIds={likedProductIds} />
        </Scrollbars>
      </Popover>
  </>)
}

export default memo(LikedProductsModal);