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
  setChangeItem,
  setItems,
  setTypeDelivery,
  setTypeDishes,
} from "../slices/itemsSlice";
import { setLoadStete } from "../slices/loaderSlice";
// import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const getItems = createAsyncThunk("items/getItems", async (arg, thunkAPI) => {
  try {
    thunkAPI.dispatch(setLoadStete(true));
    const q = query(
      collection(db, "dishes"),
      where("typeDishes", "==", arg),
      where("typeDelivery", "==", "Dine In")
    );
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
      thunkAPI.dispatch(setItems(result));
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

const addNewDishes = createAsyncThunk(
  "item/addNewDishes",
  async (arg, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoadStete(true));
      await addDoc(collection(db, "dishes"), arg);
      thunkAPI.dispatch(getAllItems());
    } catch (err) {
      console.log(err);
    } finally {
      thunkAPI.dispatch(setLoadStete(false));
    }
  }
);
const deleteDishes = createAsyncThunk(
  "item/deleteDishes",
  async (arg, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoadStete(true));
      await deleteDoc(doc(db, "dishes", arg));
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

// const uploadPhoto = createAsyncThunk(
//   "item/updateDishes",
//   async (arg, thunkAPI) => {
//     try {
//       const storage = getStorage();
//       thunkAPI.dispatch(setLoadStete(true));
//       const imagesRef = ref(storage, `Dishes/${image.name}`);
//       await uploadBytes(imagesRef, image).then(() => {
//         getDownloadURL(imagesRef).then((url) => {});
//       });
//       thunkAPI.dispatch(getAllItems());
//     } catch (err) {
//       console.log(err);
//     } finally {
//       thunkAPI.dispatch(setLoadStete(false));
//     }
//   }
// );

export {
  getItems,
  getAllItems,
  getTypeDishes,
  addNewDishes,
  deleteDishes,
  getDishesById,
  updateDishes,
  getTypeDelivery,
  // uploadPhoto,
};
