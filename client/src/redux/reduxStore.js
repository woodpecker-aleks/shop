import { configureStore } from "@reduxjs/toolkit";
import appMenuReducer from './reducers/appMenuReducer';
import appThemeReducer from './reducers/appThemeReducer';
import appAuthReducer from './reducers/appAuthReducer';
import appUserReducer from './reducers/appUserReducer';

export default configureStore({
  reducer: {
    appMenu: appMenuReducer,
    appTheme: appThemeReducer,
    appAuth: appAuthReducer,
    appUser: appUserReducer,
  }
});