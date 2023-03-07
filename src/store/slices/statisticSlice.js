import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mostOrderDishes: [],
};

const statisticSlice = createSlice({
  name: "statistic",
  initialState,
  reducers: {
    setMostOrderDishes(state, action) {
      state.mostOrderDishes = action.payload
    },
   
  },
});

export const { setMostOrderDishes} = statisticSlice.actions;

export default statisticSlice.reducer;
