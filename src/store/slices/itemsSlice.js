import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  allItem: [],
  typeDishes: [],
  typeDelivery: [],
  deleteItem: "",
  changeItem: {
    nameItem: "",
    src: "",
    imagePath: "",
    description: "",
    price: "",
    typeDishes: "Тип їжі",
    typeDelivery: "Тип доставки",
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
    setAllItems(state, action) {
      state.allItem = action.payload;
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
        imagePath: "",
        description: "",
        price: "",
        typeDishes: "Тип їжі",
        typeDelivery: "Тип доставки",
      };
    },
  },
});

export const {
  setItems,
  setAllItems,
  setTypeDishes,
  setDeleteItemId,
  setChangeItem,
  setTypeDelivery,
  serClearChangeItem,
} = itemsSlice.actions;

export default itemsSlice.reducer;
