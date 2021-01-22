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
import { useMemo, useState, memo, useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { DOLLAR, EU, RUB, UAH, ZL } from "../../constants";
import { closeAppMenu } from "../../redux/reducers/appMenuReducer";
import { toggleAppTheme } from "../../redux/reducers/appThemeReducer";
import AppMenuTab from '../AppMenuTab/AppMenuTab';
import Select from "../Select/Select";
import { useStyles } from './AppMenuClasses';
import { switchCurrency } from '../../redux/reducers/appCurrencyReducer';

function AppMenu() {
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState('');

  const { isOpenAppMenu, theme, auth, currency } = useSelector(store => ({
    isOpenAppMenu: store.appMenu.isOpen,
    theme: store.appTheme.type,
    auth: store.appAuth,
    currency: store.appCurrency
  }));
  const dispatch = useDispatch();

  const currencyItems = useMemo(() => ([
    { label: '€', value: EU },
    { label: '₴', value: UAH },
    { label: '$', value: DOLLAR },
    { label: '₽', value: RUB },
    { label: 'zł', value: ZL }
  ]), []);

  const dispatchChangeCurrency = useCallback(newValue => dispatch( switchCurrency(newValue) ), [dispatch]);
  const dispatchToggleTheme = useCallback(() => dispatch( toggleAppTheme() ), [dispatch]);
  const dispatchCloseMenu = useCallback(() => dispatch( closeAppMenu() ), [dispatch]);

  const drawerClasses = useMemo(() => ({
    paper: classes.paper,
  }), [classes.paper]);

  const switchClasses = useMemo(() => ({
    thumb: classes.switchThumb,
  }), [classes.switchThumb]);

  const openTab = event => {
    const value = event.currentTarget.getAttribute('value');

    if (activeTab === value) setActiveTab('');
    else setActiveTab(value);
  }

  const handleBackdropClick = useCallback(event => {
    if (event.target.classList?.contains('MuiBackdrop-root')) dispatchCloseMenu();
  }, [dispatchCloseMenu]);

  const MenuInterface = useMemo(() => ([
    {
      tabIcon: <AccountCircleOutlinedIcon fontSize="large" />,
      tabPrimaryText: 'Profile',
      tabSecondaryText: 'Check your profile',
      condition: auth.isAuth,
      onClick: dispatchCloseMenu,
      linkTo: '/profile',
      afterBody: (
        <Divider />
      ),
    },
    {
      tabIcon: <NotificationsNoneOutlinedIcon />,
      tabPrimaryText: 'Notifications',
      onClick: dispatchCloseMenu,
      linkTo: '/notifications'
    },
    {
      tabIcon: <ShoppingCartOutlinedIcon />,
      tabPrimaryText: 'Cart',
      onClick: dispatchCloseMenu,
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
          onClick: dispatchCloseMenu,
          linkTo: '/mobile',
        },
        {
          tabIcon: <LaptopIcon />,
          tabPrimaryText: 'Laptop',
          onClick: dispatchCloseMenu,
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
              checked={theme === 'dark' ? true : false}
              edge="end"
              onClick={dispatchToggleTheme}
              classes={switchClasses}
            />
          ),
        },
        {
          tabIcon: <EuroSymbolIcon />,
          tabPrimaryText: 'Switch currency',
          body: (
            <Select
              defaultValue={currency}
              items={currencyItems}
              onChange={dispatchChangeCurrency}
            />
          )
        },
      ]
    },
  ]), [
    auth.isAuth,
    theme,
    dispatchChangeCurrency,
    currency,
    currencyItems,
    dispatchCloseMenu,
    dispatchToggleTheme,
    switchClasses
  ]);

  return (
    <Backdrop
      open={isOpenAppMenu}
      onClick={handleBackdropClick}
      className={classes.backdrop}
    >
      <Drawer
        className={classes.root}
        classes={drawerClasses}
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