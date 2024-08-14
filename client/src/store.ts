import { configureStore } from "@reduxjs/toolkit";
import toggleSlice from "./slice/toggleSlice";

export const store = configureStore({
  reducer: {
    toggle: toggleSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
