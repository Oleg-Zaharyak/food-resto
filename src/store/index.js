import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import currentUserSlice from "./slices/currentUserSlice";
import itemsSlice from "./slices/itemsSlice";
import basketSlice from "./slices/basketSlice";
import loaderSlice from "./slices/loaderSlice";
import ordersSlice from "./slices/ordersSlice";
import statisticSlice from "./slices/statisticSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    currentUser: currentUserSlice,
    items: itemsSlice,
    basket: basketSlice,
    loading: loaderSlice,
    orders: ordersSlice,
    statistic: statisticSlice,
  },
});
