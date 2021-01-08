import { configureStore } from "@reduxjs/toolkit";
import appMenuReducer from './reducers/appMenuReducer';
import appThemeReducer from './reducers/appThemeReducer';
import appAuthReducer from './reducers/appAuthReducer';
import appUserReducer from './reducers/appUserReducer';
import appCurrencyReducer from "./reducers/appCurrencyReducer";
import appAlertReducer from './reducers/appAlertReducer';
import appLikedProductsCardReducer from './reducers/appLikedProductsCardReducer';

export default configureStore({
  reducer: {
    appMenu: appMenuReducer,
    appTheme: appThemeReducer,
    appAuth: appAuthReducer,
    appUser: appUserReducer,
    appCurrency: appCurrencyReducer,
    alert: appAlertReducer,
    likedProductsCard: appLikedProductsCardReducer
  }
});