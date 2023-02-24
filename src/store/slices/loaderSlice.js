import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

const loaderSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoadStete(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { setLoadStete } = loaderSlice.actions;

export default loaderSlice.reducer;
