import { configureStore } from "@reduxjs/toolkit";
import toggleSlice from "./slice/toggleSlice";
import userSlice from "./slice/user";

export const store = configureStore({
  reducer: {
    toggle: toggleSlice,
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
