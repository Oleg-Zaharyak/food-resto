import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  // addDoc,
  // collection,
  doc,
  getDoc,
  // getDocs,
  // query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { setLoadStete } from "../slices/loaderSlice";
import {
  // setAllOrders,
  setAvailablePromoCod,
  // setCountOrders,
  setPromoCod,
  // setUserOrder,
} from "../slices/ordersSlice";

const createOrder = createAsyncThunk(
  "orders/creteOrder",
  async ({ promoCod, available }, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoadStete(true));
      if (available) {
        const washingtonRef = doc(db, "promoCod", promoCod.id);
        await updateDoc(washingtonRef, { count: promoCod.count - 1 });
      }
      console.log(promoCod, available);
    } catch (err) {
      console.log(err);
    } finally {
      thunkAPI.dispatch(setLoadStete(false));
    }
  }
);

// const getUserOrder = createAsyncThunk(
//   "orders/creteOrder",
//   async ({ id }, thunkAPI) => {
//     try {
//       thunkAPI.dispatch(setLoadStete(true));
//       const q = query(collection(db, `users/${id}/orders`));
//       const querySnapshot = await getDocs(q);
//       const result = [];
//       querySnapshot.forEach((doc) => {
//         const data = doc.data();
//         data.id = doc.id;
//         result.push(data);
//       });
//       thunkAPI.dispatch(setUserOrder(result));
//     } catch (err) {
//       console.log(err);
//     } finally {
//       thunkAPI.dispatch(setLoadStete(false));
//     }
//   }
// );

// const getAllOrders = createAsyncThunk(
//   "orders/AllOrder",
//   async (arg, thunkAPI) => {
//     try {
//       thunkAPI.dispatch(setLoadStete(true));
//       const q = query(collection(db, "allOrders"));
//       const querySnapshot = await getDocs(q);
//       const result = [];
//       querySnapshot.forEach((doc) => {
//         const data = doc.data();
//         data.id = doc.id;
//         result.push(data);
//       });
//       thunkAPI.dispatch(setAllOrders(result));
//     } catch (err) {
//       console.log(err);
//     } finally {
//       thunkAPI.dispatch(setLoadStete(false));
//     }
//   }
// );

// const getCountOrder = createAsyncThunk(
//   "orders/countOrder",
//   async (arg, thunkAPI) => {
//     try {
//       const docRef = await doc(db, "countOrder", "count");
//       const data = await getDoc(docRef);
//       const countOrder = data.data().countOrder;
//       thunkAPI.dispatch(setCountOrders(countOrder));
//       thunkAPI.dispatch(setLoadStete(true));
//     } catch (err) {
//       console.log(err);
//     } finally {
//       thunkAPI.dispatch(setLoadStete(false));
//     }
//   }
// );
// const setCountOrder = createAsyncThunk(
//   "orders/addCountOrder",
//   async (arg, thunkAPI) => {
//     try {
//       thunkAPI.dispatch(setLoadStete(true));
//       const data = await getDoc(doc(db, "countOrder", "count"));
//       const countOrder = data.data().countOrder + 1;
//       const result = { countOrder: countOrder };
//       const washingtonRef = doc(db, "countOrder", "count");
//       await updateDoc(washingtonRef, result);
//       thunkAPI.dispatch(getCountOrder());
//     } catch (err) {
//       console.log(err);
//     } finally {
//       thunkAPI.dispatch(setLoadStete(false));
//     }
//   }
// );

const checkPromoCod = createAsyncThunk(
  "promoCod/checkPromoCod",
  async (arg, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoadStete(true));
      const docRef = doc(db, "promoCod", arg);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const result = docSnap.data();
        result.id = arg;
        if (result.count <= 0) {
          thunkAPI.dispatch(setAvailablePromoCod(false));
        } else {
          thunkAPI.dispatch(setPromoCod(result));
          thunkAPI.dispatch(setAvailablePromoCod(true));
        }
      } else {
        thunkAPI.dispatch(setAvailablePromoCod(false));
      }
    } catch (err) {
      console.log(err);
    } finally {
      thunkAPI.dispatch(setLoadStete(false));
    }
  }
);

export {
  createOrder,
  // getUserOrder,
  // getAllOrders,
  // getCountOrder,
  // setCountOrder,
  checkPromoCod,
};
