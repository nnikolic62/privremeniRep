import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { dialogSlice } from "./dialogSlice";
import { loginSlice } from "./loginSlice";
import { storeSlice } from "./storeSlice";
import { mockApi } from "../api/mockApi";

const rootReducer = combineReducers({
  store: storeSlice.reducer,
  dialog: dialogSlice.reducer,
  login: loginSlice.reducer,
  [mockApi.reducerPath]: mockApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      mockApi.middleware
    ),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
