import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";

import { persistConfig, reducers } from "./rootReducer";

const persistedReducer = persistReducer(persistConfig, reducers);

let reactotronMiddleware: any = null;
if (__DEV__) {
  const reactotron = require("../../config/ReactotronConfig").default as any;
  reactotronMiddleware = reactotron.createEnhancer();
}
const enhancersMiddleware = [] as any[];
if (reactotronMiddleware) {
  enhancersMiddleware.push(reactotronMiddleware);
}

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  enhancers: (getDefaultEnhancers) => {
    const defaultEnhancers = getDefaultEnhancers();
    return reactotronMiddleware ? defaultEnhancers.concat(reactotronMiddleware) : defaultEnhancers;
  },
});

const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export { persistor, store };
