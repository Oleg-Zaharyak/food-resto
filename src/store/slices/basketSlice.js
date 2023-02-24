import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  basketData: [],
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addItem(state, action) {
      if (state.basketData.length > 0) {
        // state.basketData.find(el => el.name === )
        const index = state.basketData
          .map((element) => element.name)
          .indexOf(action.payload.name);
        index >= 0
          ? (state.basketData[index].count += action.payload.count)
          : (state.basketData = [...state.basketData, action.payload]);
      } else {
        state.basketData = [...state.basketData, action.payload];
      }
    },
    changeCount(state, action) {
      const index = state.basketData
        .map((element) => element.name)
        .indexOf(action.payload.name);
      action.payload.increment
        ? (state.basketData[index].count += 1)
        : (state.basketData[index].count -= 1);
    },
    removeItem(state, action) {
      let index = state.basketData.map((el) => el.name).indexOf(action.payload);
      state.basketData.splice(index, 1);
    },
    cleanBasket(state) {
      state.basketData = [];
    },
  },
});

export const { addItem, removeItem, cleanBasket, changeCount } =
  basketSlice.actions;

export default basketSlice.reducer;
