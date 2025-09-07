import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers } from "@reduxjs/toolkit";

import favouritesReducer from "./slicers/FavouritesSlice";
import uiReducer from "./slicers/UISlice";

const reducers = combineReducers({
  ui: uiReducer,
  favourites: favouritesReducer,
});

const persistConfig = {
  key: "primary",
  version: 0,
  timeout: undefined,
  storage: AsyncStorage,
  // whitelist: ["favourites"],
  blacklist: ["ui", "favourites"],
};

export { persistConfig, reducers };
