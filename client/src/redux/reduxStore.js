import { configureStore } from "@reduxjs/toolkit";
import appMenuReducer from './reducers/appMenuReducer';
import appThemeReducer from './reducers/appThemeReducer';
import appAuthReducer from './reducers/appAuthReducer';
import appUserReducer from './reducers/appUserReducer';
import appCurrencyReducer from "./reducers/appCurrencyReducer";
import counterReducer from './reducers/counterReducer';
import appAlertReducer from './reducers/appAlertReducer';

export default configureStore({
  reducer: {
    appMenu: appMenuReducer,
    appTheme: appThemeReducer,
    appAuth: appAuthReducer,
    appUser: appUserReducer,
    appCurrency: appCurrencyReducer,
    counter: counterReducer,
    alert: appAlertReducer
  }
});