import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  deliveryInformation: [],
};

const informationSlice = createSlice({
  name: "information",
  initialState,
  reducers: {
    setDeliveryInfo(state, action) {
      state.deliveryInformation = action.payload;
    },
  },
});

export const { setDeliveryInfo } = informationSlice.actions;

export default informationSlice.reducer;
