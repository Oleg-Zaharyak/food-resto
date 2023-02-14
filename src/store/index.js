import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import currentUserSlice from "./slices/currentUserSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    currentUser: currentUserSlice,
  },
});

