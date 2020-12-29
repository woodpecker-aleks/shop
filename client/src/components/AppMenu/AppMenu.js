import { Backdrop, Divider, Drawer, List, Switch } from "@material-ui/core";
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import Brightness2OutlinedIcon from '@material-ui/icons/Brightness2Outlined';
import CollectionsBookmarkOutlinedIcon from '@material-ui/icons/CollectionsBookmarkOutlined';
import EuroSymbolIcon from '@material-ui/icons/EuroSymbol';
import LaptopIcon from '@material-ui/icons/Laptop';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import PhoneInTalkOutlinedIcon from '@material-ui/icons/PhoneInTalkOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { useMemo, useState, memo } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { closeAppMenu } from "../../redux/reducers/appMenuReducer";
import { toggleAppTheme } from "../../redux/reducers/appThemeReducer";
import AppMenuTab from '../AppMenuTab/AppMenuTab';
import { useStyles } from './AppMenuClasses';

function AppMenu() {
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState('');
  const { isOpenAppMenu, theme, auth } = useSelector(store => ({
    isOpenAppMenu: store.appMenu.isOpen,
    theme: store.appTheme.type,
    auth: store.appAuth
  }));
  const dispatch = useDispatch();

  const openTab = event => {
    const value = event.currentTarget.getAttribute('value');

    if (activeTab === value) setActiveTab('');
    else setActiveTab(value);
  }

  const handleBackdropClick = event => {
    if (event.target.classList.contains('MuiBackdrop-root')) dispatch( closeAppMenu() );
  }

  const MenuInterface = useMemo(() => ([
    {
      tabIcon: <AccountCircleOutlinedIcon fontSize="large" />,
      tabPrimaryText: 'Profile',
      tabSecondaryText: 'Check your profile',
      condition: auth.isAuth,
      onClick() {
        dispatch( closeAppMenu() );
      },
      linkTo: '/profile',
      afterBody: (
        <Divider />
      ),
    },
    {
      tabIcon: <NotificationsNoneOutlinedIcon />,
      tabPrimaryText: 'Notifications',
      onClick() {
        dispatch( closeAppMenu() );
      },
      linkTo: '/notifications'
    },
    {
      tabIcon: <ShoppingCartOutlinedIcon />,
      tabPrimaryText: 'Cart',
      onClick() {
        dispatch( closeAppMenu() );
      },
      linkTo: '/cart'
    },
    {
      tabIcon: <CollectionsBookmarkOutlinedIcon />,
      tabPrimaryText: 'Category',
      innerTabsHeader: 'Category',
      innerTabs: [
        {
          tabIcon: <PhoneAndroidIcon />,
          tabPrimaryText: 'Mobile',
          onClick() {
            dispatch( closeAppMenu() );
          },
          linkTo: '/mobile',
        },
        {
          tabIcon: <LaptopIcon />,
          tabPrimaryText: 'Laptop',
          onClick() {
            dispatch( closeAppMenu() );
          },
          linkTo: '/laptop',
        },
      ]
    },
    {
      tabIcon: <PhoneInTalkOutlinedIcon />,
      tabPrimaryText: 'Contacts',
      innerTabsHeader: 'Contacts',
      innerTabs: [
        {
          tabPrimaryText: '097 415 0897',
        },
        {
          tabPrimaryText: '066 792 3483',
        },
        {
          tabPrimaryText: 'ул. Тополевая 10',
        },
      ]
    },
    {
      tabIcon: <SettingsOutlinedIcon />,
      tabPrimaryText: 'Settings',
      innerTabsHeader: 'Settings',
      innerTabs: [
        {
          tabIcon: <Brightness2OutlinedIcon />,
          tabPrimaryText: 'Switch theme',
          tabSecondaryText: 'Dark/Light theme',
          body: (
            <Switch
              checked={(theme === 'dark') ? true : false}
              edge="end"
              onClick={() => dispatch( toggleAppTheme() )}
              classes={{
                thumb: classes.switchThumb,
              }}
            />
          ),
        },
        {
          tabIcon: <EuroSymbolIcon />,
          tabPrimaryText: 'Switch currency',
        },
      ]
    },
  ]), [auth.isAuth, dispatch, theme, classes.switchThumb]);

  return (
    <Backdrop
      open={isOpenAppMenu}
      onClick={handleBackdropClick}
      className={classes.backdrop}
    >
      <Drawer
        className={classes.root}
        classes={{
          paper: classes.paper,
        }}
        variant="persistent"
        anchor="left"
        open={isOpenAppMenu}
      >
        <List className={classes.menu}>
          {MenuInterface.map(tab => (tab.condition || tab.condition === undefined) && (
            <AppMenuTab
              key={tab.tabPrimaryText}
              tab={tab}
              onClick={[openTab, tab.onClick]}
              dropdown={activeTab}
              value={tab.tabPrimaryText}
            >
              {tab.body}
            </AppMenuTab>
          ))}
        </List>
      </Drawer>
    </Backdrop>
  );
}

export default memo(AppMenu);