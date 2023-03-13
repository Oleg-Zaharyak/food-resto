import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allOrders: [],
  pendingOrders: [],
  orderById: {},
  userOrders: [],
  countOrder: 0,
  availablePromoCod: null,
  promoCod: { note: null, count: 0, sale: 0, id: null },
  restourantsAddress: [],
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
    setAllOrders(state, action) {
      state.allOrders = action.payload;
    },
    setPendingOrders(state, action) {
      state.pendingOrders = action.payload;
    },
    setOrderById(state, action) {
      state.orderById = action.payload;
    },
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
    setRestourantsAddress(state, action) {
      state.restourantsAddress = action.payload;
    },
  },
});

export const {
  setUserOrder,
  setCountOrders,
  setAllOrders,
  setOrderById,
  setPromoCod,
  setAvailablePromoCod,
  cleanPromoOrder,
  setRestourantsAddress,
  setPendingOrders,
} = ordersSlice.actions;

export default ordersSlice.reducer;
