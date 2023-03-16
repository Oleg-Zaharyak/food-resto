import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mostOrderDishes: [],
  userMostOrder: [],
  typeOfOrders: {},
  totalRevenue: 0,
  allOrderedDishes: 0,
  allOrdersCount: 0,
  defaultStatus: "Очікує",
};

const statisticSlice = createSlice({
  name: "statistic",
  initialState,
  reducers: {
    setMostOrderDishes(state, action) {
      state.mostOrderDishes = action.payload;
    },
    setUserMostOrder(state, action) {
      state.userMostOrder = [];
      action.payload.map((doc) => {
        if (state.userMostOrder.length > 0) {
          const index = state.userMostOrder
            .map((element) => element.name)
            .indexOf(doc.name);
          return index >= 0
            ? (state.userMostOrder[index].count =
                state.userMostOrder[index].count + doc.count)
            : (state.userMostOrder = [...state.userMostOrder, doc]);
        } else {
          return (state.userMostOrder = [...state.userMostOrder, doc]);
        }
      });
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
    setDefaultStatus(state, action) {
      state.defaultStatus = action.payload;
    },
  },
});

export const {
  setMostOrderDishes,
  setUserMostOrder,
  setTypeOfOrders,
  setTotalRevenue,
  setAllOrderedDishes,
  setAllOrdersCount,
  setDefaultStatus,
} = statisticSlice.actions;

export default statisticSlice.reducer;
