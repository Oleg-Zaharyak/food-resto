import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  typeDishes: [],
  typeDelivery: [],
  deleteItem: "",
  changeItem: {
    nameItem: "",
    src: "",
    bowls: "",
    price: "",
    typeDishes: "Choose Dishes",
    typeDelivery: "Choose Delivery",
  },
};

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
    setTypeDishes(state, action) {
      state.typeDishes = action.payload;
    },
    setTypeDelivery(state, action) {
      state.typeDelivery = action.payload;
    },
    setDeleteItemId(state, action) {
      state.deleteItem = action.payload;
    },
    setChangeItem(state, action) {
      state.changeItem = action.payload;
    },
    serClearChangeItem(state) {
      state.changeItem = {
        nameItem: "",
        src: "",
        bowls: "",
        price: "",
        typeDishes: "Choose Dishes",
        typeDelivery: "Choose Delivery",
      };
    },
  },
});

export const {
  setItems,
  setTypeDishes,
  setDeleteItemId,
  setChangeItem,
  setTypeDelivery,
  serClearChangeItem,
} = itemsSlice.actions;

export default itemsSlice.reducer;
