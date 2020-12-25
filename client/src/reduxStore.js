import { configureStore } from "@reduxjs/toolkit";
import appMenuReducer from './reducers/appMenuReducer';
import appThemeReducer from './reducers/appThemeReducer';
import appAuthReducer from './reducers/appAuthReducer';
import appUserReducer from './reducers/appUserReducer';

//import { compose, createStore } from "redux";
//import rootReducer from './reducers/rootReducer';

export default configureStore({
  reducer: {
    appMenu: appMenuReducer,
    appTheme: appThemeReducer,
    appAuth: appAuthReducer,
    appUser: appUserReducer,
  }
});

//export default createStore(rootReducer, compose(
//  window?.__REDUX_DEVTOOLS_EXTENSION__()
//));