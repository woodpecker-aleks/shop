import { Button, IconButton, Tooltip } from "@material-ui/core";
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import clsx from 'clsx';
import { memo, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import useGlobalStyles from '../../globalClasses';
import AuthModal from '../AuthModal/AuthModal';
import LikedProductsModal from "../LikedProductsModal/LikedProductsModal";
import ProfileModal from "../ProfileModal/ProfileModal";
import ShopCardModal from "../ShopCardModal/ShopCardModal";
import { useStyles } from './HeaderClasses';

function HeaderToolBar() {
  const classes = useStyles();
  const glClasses = useGlobalStyles();
  const isAuth = useSelector(store => store.appAuth.isAuth);
  const [authModalIsOpen, setAuthModalIsOpen] = useState(false);
  const closeAuthModal = useCallback(() => setAuthModalIsOpen(false), [setAuthModalIsOpen]);
  const openAuthModal = useCallback(() => setAuthModalIsOpen(true), [setAuthModalIsOpen]);

  return (<>
    <LikedProductsModal />
    <Tooltip
      title="Notification"
      placement="bottom"
    >
      <IconButton
        color="inherit"
        className={clsx(classes.iconButton, glClasses.iconButton)}
      >
        <NotificationsNoneOutlinedIcon />
      </IconButton>
    </Tooltip>
    <ShopCardModal />
    {(isAuth) ? (
      <ProfileModal />
    ) : (
      <>
        <Button
          variant="outlined"
          color="inherit"
          className={classes.loginButton}
          onClick={openAuthModal}
        >
          Sing In
        </Button>
        <AuthModal
          open={authModalIsOpen}
          onClose={closeAuthModal}
        />
      </>
    )}
  </>)
}

export default memo(HeaderToolBar);