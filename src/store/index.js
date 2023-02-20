import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import currentUserSlice from "./slices/currentUserSlice";
import itemsSlice from "./slices/itemsSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    currentUser: currentUserSlice,
    items: itemsSlice,
  },
});

