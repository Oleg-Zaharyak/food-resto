import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allOrders: [],
  userOrders: [],
  countOrder: 0,
  availablePromoCod: null,
  promoCod: { note: null, count: 0, sale: 0, id: null },
};

const ordersSlice = createSlice({
  name: "userOrder",
  initialState,
  reducers: {
    setUserOrder(state, action) {
      state.userOrders = action.payload;
    },
    // setCountOrders(state, action) {
    //   state.countOrder = action.payload;
    // },
    // setAllOrders(state, action) {
    //   state.allOrders = action.payload;
    // },
    setPromoCod(state, action) {
      state.promoCod = action.payload;
    },
    setAvailablePromoCod(state, action) {
      state.availablePromoCod = action.payload;
    },
    cleanPromoOrder(state) {
      state.promoCod = { name: null, count: 0, sale: 0, id: null };
      state.availablePromoCod = null;
    },
  },
});

export const {
  setUserOrder,
  setCountOrders,
  setAllOrders,
  setPromoCod,
  setAvailablePromoCod,
} = ordersSlice.actions;

export default ordersSlice.reducer;
