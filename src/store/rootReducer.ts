import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers } from "@reduxjs/toolkit";

import favouritesReducer from "./slicers/FavouritesSlice";

const reducers = combineReducers({
  favourites: favouritesReducer,
});

const persistConfig = {
  key: "primary",
  version: 0,
  timeout: undefined,
  storage: AsyncStorage,
  whitelist: ["favourites"],
};

export { persistConfig, reducers };
