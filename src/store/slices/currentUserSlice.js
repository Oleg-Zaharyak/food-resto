import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userProfile: {},
};

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      state.userProfile = action.payload;
    },
  },
});

export const { setCurrentUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;
