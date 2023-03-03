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
        const index = state.basketData
          .map((element) => element.id)
          .indexOf(action.payload.id);
        index >= 0
          ? (state.basketData[index].count += action.payload.count)
          : (state.basketData = [...state.basketData, action.payload]);
      } else {
        state.basketData = [...state.basketData, action.payload];
      }
    },
    changeCount(state, action) {
      const index = state.basketData
        .map((element) => element.id)
        .indexOf(action.payload.id);
      action.payload.increment
        ? (state.basketData[index].count += 1)
        : (state.basketData[index].count -= 1);
    },
    addNoteToState(state, action) {
      const index = state.basketData
        .map((element) => element.id)
        .indexOf(action.payload.id);
      state.basketData[index].note = action.payload.note;
    },
    removeItem(state, action) {
      let index = state.basketData.map((el) => el.id).indexOf(action.payload);
      state.basketData.splice(index, 1);
    },
    cleanBasket(state) {
      state.basketData = [];
    },
  },
});

export const { addItem, removeItem, cleanBasket, changeCount, addNoteToState } =
  basketSlice.actions;

export default basketSlice.reducer;
