import { createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { setCurrentUser } from "../slices/currentUserSlice";
import { db } from "./../../firebase";

const getCurrentUser = createAsyncThunk(
  "users/getCurrentUser",
  async (arg, thunkAPI) => {
    const {
      user: { id },
    } = thunkAPI.getState();
    try {
      //   thunkAPI.dispatch(toggleLoading(true));
      const docRef = await doc(db, "users", id);
      const data = await getDoc(docRef);
      thunkAPI.dispatch(setCurrentUser(data.data()));
    } catch (err) {
      console.log(err);
    } finally {
      //   thunkAPI.dispatch(toggleLoading(false));
    }
  }
);

export { getCurrentUser };
