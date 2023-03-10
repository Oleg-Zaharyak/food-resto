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
  setAllOrders,
  setAvailablePromoCod,
  setOrderById,
  // setCountOrders,
  setPromoCod,
  setRestourantsAddress,
  setUserOrder,
} from "../slices/ordersSlice";
import { setUserMostOrder } from "../slices/statisticSlice";

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

      //................ most type of order .................
      thunkAPI.dispatch(
        saveTypeOfOrder({
          delivery: dataItem.typeDelivery,
          payment: dataItem.typePayment,
        })
      );
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
              src: arg[i].src,
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
const saveTypeOfOrder = createAsyncThunk(
  "orders/changeTotalRelevant",
  async (arg, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoadStete(true));
      const data = await getDoc(doc(db, "Statistic", "typeOfOrder"));
      let typeDelivery;
      let typePayment;
      if (arg.delivery === "Доставка") {
        typeDelivery = "typeDelivery";
      }
      if (arg.delivery === "Самовивіз") {
        typeDelivery = "typeOut";
      }
      if (arg.payment === "Готівка") {
        typePayment = "typeCash";
      }
      if (arg.payment === "Онлайн") {
        typePayment = "typeOnline";
      }
      if (arg.payment === "Карткою") {
        typePayment = "typeCard";
      }
      const resultPayment = data.data()[typePayment] + 1;
      const resultDelivery = data.data()[typeDelivery] + 1;

      const oldCount = doc(db, "Statistic", "typeOfOrder");
      await updateDoc(oldCount, {
        [typeDelivery]: resultDelivery,
        [typePayment]: resultPayment,
      });
    } catch (err) {
      console.log(err);
    } finally {
      thunkAPI.dispatch(setLoadStete(false));
    }
  }
);

const getUserOrder = createAsyncThunk(
  "orders/getUserOrder",
  async ({ id }, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoadStete(true));
      const docRef = await doc(db, "users", id);
      const data = await getDoc(docRef);
      const q = query(collection(db, "allOrders"));
      const querySnapshot = await getDocs(q);
      const result = [];
      querySnapshot.forEach((doc) => {
        const userPhoneNumber = data.data().phoneNumber;
        const searchPhoneNumber = doc.data().phoneNumber;
        if (searchPhoneNumber.indexOf(userPhoneNumber) !== -1) {
          const data = doc.data();
          data.id = doc.id;
          result.push(data);
        }
      });
      result.sort((a, b) => {
        let res1 = Date.parse(a.timeOrder);
        let res2 = Date.parse(b.timeOrder);
        return res2 - res1;
      });
      thunkAPI.dispatch(setUserOrder(result));
    } catch (err) {
      console.log(err);
    } finally {
      thunkAPI.dispatch(setLoadStete(false));
    }
  }
);
const getUserMostOrder = createAsyncThunk(
  "orders/getUserMostOrder",
  async ({ id }, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoadStete(true));
      const docRef = await doc(db, "users", id);
      const data = await getDoc(docRef);
      const q = query(collection(db, "allOrders"));
      const querySnapshot = await getDocs(q);
      const result = [];
      querySnapshot.forEach((doc) => {
        const userPhoneNumber = data.data().phoneNumber;
        const searchPhoneNumber = doc.data().phoneNumber;
        let dataMap = [];
        dataMap = [...dataMap, doc.data()];
        if (searchPhoneNumber.indexOf(userPhoneNumber) !== -1) {
          dataMap.forEach((doc) => doc.menu.forEach((el) => result.push(el)));
        }
      });
      thunkAPI.dispatch(setUserMostOrder(result));
    } catch (err) {
      console.log(err);
    } finally {
      thunkAPI.dispatch(setLoadStete(false));
    }
  }
);

const getAllOrders = createAsyncThunk(
  "orders/AllOrder",
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
      result.sort((a, b) => {
        let res1 = Date.parse(a.timeOrder);
        let res2 = Date.parse(b.timeOrder);
        return res2 - res1;
      });
      thunkAPI.dispatch(setAllOrders(result));
    } catch (err) {
      console.log(err);
    } finally {
      thunkAPI.dispatch(setLoadStete(false));
    }
  }
);

const getOrderById = createAsyncThunk(
  "orders/orderById",
  async (arg, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoadStete(true));
      const docRef = doc(db, "allOrders", arg);
      const docSnap = await getDoc(docRef);
      thunkAPI.dispatch(setOrderById(docSnap.data()));
    } catch (err) {
      console.log(err);
    } finally {
      thunkAPI.dispatch(setLoadStete(false));
    }
  }
);

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
  getAllOrders,
  getOrderById,
  getUserOrder,
  getUserMostOrder,
  // getCountOrder,
  // setCountOrder,
  getRestourantsAddress,
  checkPromoCod,
};
