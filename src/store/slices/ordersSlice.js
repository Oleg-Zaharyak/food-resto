import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allOrders: [],
  userOrders: [],
  countOrder: 0,
};

const ordersSlice = createSlice({
  name: "userOrder",
  initialState,
  reducers: {
    setUserOrder(state, action) {
      state.userOrders = action.payload;
    },
    setCountOrders(state, action) {
      state.countOrder = action.payload;
    },
    setAllOrders(state, action) {
      state.allOrders = action.payload;
    },
  },
});

export const { setUserOrder, setCountOrders, setAllOrders } =
  ordersSlice.actions;

export default ordersSlice.reducer;
