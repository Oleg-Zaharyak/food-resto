import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./../../firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  setAllItems,
  setChangeItem,
  setItems,
  setTypeDelivery,
  setTypeDishes,
  setTypePayment,
} from "../slices/itemsSlice";
import { setLoadStete } from "../slices/loaderSlice";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";

const getItems = createAsyncThunk("items/getItems", async (arg, thunkAPI) => {
  try {
    thunkAPI.dispatch(setLoadStete(true));
    const q = query(collection(db, "dishes"), where("typeDishes", "==", arg));
    const querySnapshot = await getDocs(q);
    const result = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      data.id = doc.id;
      result.push(data);
    });
    thunkAPI.dispatch(setItems(result));
  } catch (err) {
    console.log(err);
  } finally {
    thunkAPI.dispatch(setLoadStete(false));
  }
});

const searchItem = createAsyncThunk(
  "items/searchItem",
  async (arg, thunkAPI) => {
    try {
      // thunkAPI.dispatch(setLoadStete(true));
      const result = [];
      const q = query(collection(db, "dishes"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const lowerName = data.nameItem.toLowerCase();
        const lowerSearch = arg.toLowerCase();
        if (lowerName.indexOf(lowerSearch) !== -1) {
          result.push(data);
        }
      });
      thunkAPI.dispatch(setItems(result));
    } catch (err) {
      console.log(err);
    } finally {
      // thunkAPI.dispatch(setLoadStete(false));
    }
  }
);

const getAllItems = createAsyncThunk(
  "items/getAllItems",
  async (arg, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoadStete(true));
      const q = query(collection(db, "dishes"));
      const querySnapshot = await getDocs(q);
      const result = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        data.id = doc.id;
        result.push(data);
      });
      thunkAPI.dispatch(setAllItems(result));
    } catch (err) {
      console.log(err);
    } finally {
      thunkAPI.dispatch(setLoadStete(false));
    }
  }
);

const getTypeDishes = createAsyncThunk(
  "items/getTypeDishes",
  async (arg, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoadStete(true));
      const q = query(collection(db, "typeDishes"));
      const querySnapshot = await getDocs(q);
      const result = [];
      querySnapshot.forEach((doc) => result.push(doc.data()));
      thunkAPI.dispatch(setTypeDishes(result));
    } catch (err) {
      console.log(err);
    } finally {
      thunkAPI.dispatch(setLoadStete(false));
    }
  }
);
const getTypeDelivery = createAsyncThunk(
  "items/getTypeDelivery",
  async (arg, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoadStete(true));
      const q = query(collection(db, "typeDelivery"));
      const querySnapshot = await getDocs(q);
      const result = [];
      querySnapshot.forEach((doc) => result.push(doc.data()));
      thunkAPI.dispatch(setTypeDelivery(result));
    } catch (err) {
      console.log(err);
    } finally {
      thunkAPI.dispatch(setLoadStete(false));
    }
  }
);
const getTypePayment = createAsyncThunk(
  "items/getTypePayment",
  async (arg, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoadStete(true));
      const q = query(collection(db, "typePayment"));
      const querySnapshot = await getDocs(q);
      const result = [];
      querySnapshot.forEach((doc) => result.push(doc.data()));
      thunkAPI.dispatch(setTypePayment(result));
    } catch (err) {
      console.log(err);
    } finally {
      thunkAPI.dispatch(setLoadStete(false));
    }
  }
);

const addNewDishes = createAsyncThunk(
  "item/addNewDishes",
  async (arg, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoadStete(true));
      await addDoc(collection(db, "dishes"), arg);
    } catch (err) {
      console.log(err);
    } finally {
      thunkAPI.dispatch(setLoadStete(false));
    }
  }
);
const deleteDishes = createAsyncThunk(
  "item/deleteDishes",
  async ({ id, imagePath }, thunkAPI) => {
    try {
      const storage = getStorage();
      thunkAPI.dispatch(setLoadStete(true));
      await deleteDoc(doc(db, "dishes", id));
      if (imagePath) {
        const desertRef = ref(storage, imagePath);
        await deleteObject(desertRef);
      }
      thunkAPI.dispatch(getAllItems());
    } catch (err) {
      console.log(err);
    } finally {
      thunkAPI.dispatch(setLoadStete(false));
    }
  }
);

const getDishesById = createAsyncThunk(
  "item/deleteDishes",
  async (arg, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoadStete(true));
      const docRef = doc(db, "dishes", arg);
      const docSnap = await getDoc(docRef);
      thunkAPI.dispatch(setChangeItem(docSnap.data()));
    } catch (err) {
      console.log(err);
    } finally {
      thunkAPI.dispatch(setLoadStete(false));
    }
  }
);

const updateDishes = createAsyncThunk(
  "item/updateDishes",
  async ({ id, data }, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoadStete(true));
      const washingtonRef = doc(db, "dishes", id);
      await updateDoc(washingtonRef, data);
      thunkAPI.dispatch(getAllItems());
    } catch (err) {
      console.log(err);
    } finally {
      thunkAPI.dispatch(setLoadStete(false));
    }
  }
);

const uploadPhoto = createAsyncThunk(
  "item/updateDishes",
  async ({ image, callbeck }, thunkAPI) => {
    try {
      if (image) {
        const storage = getStorage();
        thunkAPI.dispatch(setLoadStete(true));
        const path = `Dishes/${image.name}`;
        const imagesRef = ref(storage, path);
        await uploadBytes(imagesRef, image).then(() => {
          getDownloadURL(imagesRef).then((url) => {
            callbeck({ url: url, path: path });
          });
        });
      }
      if (!image) {
        callbeck(null);
      }
      thunkAPI.dispatch(getAllItems());
    } catch (err) {
      console.log(err);
    } finally {
      thunkAPI.dispatch(setLoadStete(false));
    }
  }
);

export {
  getItems,
  searchItem,
  getAllItems,
  getTypeDishes,
  addNewDishes,
  deleteDishes,
  getDishesById,
  updateDishes,
  getTypeDelivery,
  getTypePayment,
  uploadPhoto,
};
