import { createAsyncThunk } from "@reduxjs/toolkit";
import { setLoadStete } from "../slices/loaderSlice";
import { setDeliveryInfo } from "../slices/informationSlice";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase";

const getDeliveryInfo = createAsyncThunk(
  "information/getDeliveryInfo",
  async (arg, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoadStete(true));
      const q = query(collection(db, "infoDelivery"));
      const querySnapshot = await getDocs(q);
      const result = [];
      querySnapshot.forEach((doc) => result.push(doc.data()));
      thunkAPI.dispatch(setDeliveryInfo(result));
    } catch (err) {
      console.log(err);
    } finally {
      thunkAPI.dispatch(setLoadStete(false));
    }
  }
);

export { getDeliveryInfo };
