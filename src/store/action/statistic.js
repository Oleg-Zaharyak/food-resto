import { createAsyncThunk } from "@reduxjs/toolkit";
import { query, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { setLoadStete } from "../slices/loaderSlice";
import { setMostOrderDishes } from "../slices/statisticSlice";

const getMostOrderDishes = createAsyncThunk(
  "statistic/getMostOrderDishes",
  async (arg, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoadStete(true));
      const data = query(
        collection(db, "Statistic/totalOrderedDishes/AllCountDishes")
      );
      const finalData = await getDocs(data);
      const result = [];
      finalData.forEach((doc) => {
        const data = doc.data();
        result.push(data);
      });
      result
        .sort((a, b) => {
          return b.count - a.count;
        })
        .splice(4);
      thunkAPI.dispatch(setMostOrderDishes(result));
    } catch (err) {
      console.log(err);
    } finally {
      thunkAPI.dispatch(setLoadStete(false));
    }
  }
);

export { getMostOrderDishes };
