import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  // addDoc,
  // collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
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
  setRestourantsAddress,
  // setUserOrder,
} from "../slices/ordersSlice";

const createOrder = createAsyncThunk(
  "orders/creteOrder",
  async ({ promoCod, available, dataItem }, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoadStete(true));

      if (available) {
        const washingtonRef = doc(db, "promoCod", promoCod.id);
        await updateDoc(washingtonRef, { count: promoCod.count - 1 });
      }
      if (dataItem.typeDelivery === "Самовивіз") {
        delete dataItem.street;
        delete dataItem.city;
        delete dataItem.buildNumber;
        if (dataItem.typePayment === "Онлайн" || "Карткою") {
          delete dataItem.userCash;
        }
      }
      if (dataItem.typeDelivery === "Доставка") {
        delete dataItem.restourantsAddress;
        if (dataItem.typePayment === "Онлайн" || "Карткою") {
          delete dataItem.userCash;
        }
      }
      await addDoc(collection(db, "allOrders"), dataItem);
      // ............... count total Revenue ..................
      thunkAPI.dispatch(changeTotalRelevant(dataItem.totalPrice));

      // ................ count total Order Dishesh ................
      thunkAPI.dispatch(saveTotalDishes(dataItem.menu));

      // ................ count total all dishes ................
      thunkAPI.dispatch(saveAllDishesCount(dataItem.menu));
    } catch (err) {
      console.log(err);
    } finally {
      thunkAPI.dispatch(setLoadStete(false));
    }
  }
);
const changeTotalRelevant = createAsyncThunk(
  "orders/changeTotalRelevant",
  async (arg, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoadStete(true));
      const data = await getDoc(doc(db, "Statistic", "totalRevenue"));
      const result = data.data().count + arg * 1;
      const oldCount = doc(db, "Statistic", "totalRevenue");
      await updateDoc(oldCount, { count: result });
    } catch (err) {
      console.log(err);
    } finally {
      thunkAPI.dispatch(setLoadStete(false));
    }
  }
);
const saveTotalDishes = createAsyncThunk(
  "orders/saveTotalDishes",
  async (arg, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoadStete(true));
      const data = await getDoc(doc(db, "Statistic", "totalOrderedDishes"));
      const oldCount = data.data().count;
      const totalCountDishes = arg.reduce((sum, el) => sum + el.count, 0);
      const result = oldCount + totalCountDishes;
      const oldCountDishes = doc(db, "Statistic", "totalOrderedDishes");
      await updateDoc(oldCountDishes, { count: result });
    } catch (err) {
      console.log(err);
    } finally {
      thunkAPI.dispatch(setLoadStete(false));
    }
  }
);
const saveAllDishesCount = createAsyncThunk(
  "orders/saveAllDishesCount",
  async (arg, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoadStete(true));
      for (let i = 0; i < arg.length; i++) {
        const frankDocRef = doc(
          db,
          "Statistic/totalOrderedDishes/AllCountDishes",
          arg[i].id
        );
        const docSnap = await getDoc(frankDocRef);
        if (docSnap.exists()) {
          const oldCount = docSnap.data().count;
          const result = oldCount + arg[i].count * 1;
          const frankDocRef = doc(
            db,
            "Statistic/totalOrderedDishes/AllCountDishes",
            arg[i].id
          );
          await updateDoc(frankDocRef, { count: result });
        } else {
          await setDoc(
            doc(db, "Statistic/totalOrderedDishes/AllCountDishes", arg[i].id),
            {
              count: arg[i].count,
              name: arg[i].name,
            }
          );
        }
      }
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

const getRestourantsAddress = createAsyncThunk(
  "items/getTypeDishes",
  async (arg, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoadStete(true));
      const q = query(collection(db, "restourant"));
      const querySnapshot = await getDocs(q);
      const result = [];
      querySnapshot.forEach((doc) => result.push(doc.data()));
      thunkAPI.dispatch(setRestourantsAddress(result));
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
  getRestourantsAddress,
  checkPromoCod,
};
