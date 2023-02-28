import { configureStore } from "@reduxjs/toolkit";
import { dialogSlice } from "./dialogSlice";
import { storeSlice } from "./storeSlice";

const store = configureStore({
  reducer: { store: storeSlice.reducer, dialog: dialogSlice.reducer },
});

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
