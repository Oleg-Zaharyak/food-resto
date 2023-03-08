import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mostOrderDishes: [],
  typeOfOrders: {},
  totalRevenue: 0,
  allOrderedDishes: 0,
  allOrdersCount: 0,
};

const statisticSlice = createSlice({
  name: "statistic",
  initialState,
  reducers: {
    setMostOrderDishes(state, action) {
      state.mostOrderDishes = action.payload;
    },
    setTypeOfOrders(state, action) {
      state.typeOfOrders = action.payload;
    },
    setTotalRevenue(state, action) {
      state.totalRevenue = action.payload;
    },
    setAllOrderedDishes(state, action) {
      state.allOrderedDishes = action.payload;
    },
    setAllOrdersCount(state, action) {
      state.allOrdersCount = action.payload;
    },
  },
});

export const {
  setMostOrderDishes,
  setTypeOfOrders,
  setTotalRevenue,
  setAllOrderedDishes,
  setAllOrdersCount,
} = statisticSlice.actions;

export default statisticSlice.reducer;
