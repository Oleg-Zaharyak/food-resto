import { createAsyncThunk } from "@reduxjs/toolkit";
import { query, collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { setLoadStete } from "../slices/loaderSlice";
import {
  setAllOrderedDishes,
  setAllOrdersCount,
  setMostOrderDishes,
  setTotalRevenue,
  setTypeOfOrders,
} from "../slices/statisticSlice";

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
const getTypeOfOrder = createAsyncThunk(
  "statistic/getTypeOfOrder",
  async (arg, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoadStete(true));
      const docRef = doc(db, "Statistic", "typeOfOrder");
      const docSnap = await getDoc(docRef);
      const result = docSnap.data();
      thunkAPI.dispatch(setTypeOfOrders(result));
    } catch (err) {
      console.log(err);
    } finally {
      thunkAPI.dispatch(setLoadStete(false));
    }
  }
);
const getTotalRevenue = createAsyncThunk(
  "statistic/getTotalRevenue",
  async (arg, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoadStete(true));
      const docRef = doc(db, "Statistic", "totalRevenue");
      const docSnap = await getDoc(docRef);
      const result = docSnap.data();
      thunkAPI.dispatch(setTotalRevenue(result.count));
    } catch (err) {
      console.log(err);
    } finally {
      thunkAPI.dispatch(setLoadStete(false));
    }
  }
);
const getAllOrderedDishes = createAsyncThunk(
  "statistic/getAllOrderedDishes",
  async (arg, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoadStete(true));
      const docRef = doc(db, "Statistic", "totalOrderedDishes");
      const docSnap = await getDoc(docRef);
      const result = docSnap.data();
      thunkAPI.dispatch(setAllOrderedDishes(result.count));
    } catch (err) {
      console.log(err);
    } finally {
      thunkAPI.dispatch(setLoadStete(false));
    }
  }
);
const getAllOrdersCount = createAsyncThunk(
  "statistic/getAllOrdersCount",
  async (arg, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoadStete(true));
      const q = query(collection(db, "allOrders"));
      const querySnapshot = await getDocs(q);
      const result = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        data.id = doc.id;
        result.push(data);
      });
      thunkAPI.dispatch(setAllOrdersCount(result.length));
    } catch (err) {
      console.log(err);
    } finally {
      thunkAPI.dispatch(setLoadStete(false));
    }
  }
);

export {
  getMostOrderDishes,
  getTypeOfOrder,
  getTotalRevenue,
  getAllOrderedDishes,
  getAllOrdersCount,
};
