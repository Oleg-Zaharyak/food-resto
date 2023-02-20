import { collection, getDocs } from "firebase/firestore";
import { db } from "./../../firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setItems } from "../slices/itemsSlice";

const getItems = createAsyncThunk("items/getItems", async (arg, thunkAPI) => {
  try {
    //   thunkAPI.dispatch(toggleLoading(true));

    const querySnapshot = await getDocs(collection(db, arg));
    const result = [];
    querySnapshot.forEach((doc) => result.push(doc.data()));
    // console.log(result);
    thunkAPI.dispatch(setItems(result));
  } catch (err) {
    console.log(err);
  } finally {
    //   thunkAPI.dispatch(toggleLoading(false));
  }
});

export { getItems };
