import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc, // ❗️ You missed importing this
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

// ✅ FETCH PRODUCTS (From DummyJSON if Firestore is empty)
export const listenToProducts = () => (dispatch) => {
  dispatch({ type: "FETCH_PRODUCT_REQUEST" });

  try {
    const unsubscribe = onSnapshot(
      collection(db, "products"),
      (snapshot) => {
        const products = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        dispatch({
          type: "FETCH_PRODUCT_SUCCESS",
          payload: products,
        });
      },
      (error) => {
        dispatch({
          type: "FETCH_PRODUCT_FAILURE",
          payload: error.message,
        });
      }
    );

    return unsubscribe; // return for cleanup
  } catch (error) {
    dispatch({
      type: "FETCH_PRODUCT_FAILURE",
      payload: error.message,
    });
  }
};
// ✅ ADD PRODUCT

// ADD PRODUCT (no need to dispatch success, snapshot listener will update state)
export const addProduct = (productData) => {
  return async (dispatch) => {
    dispatch({ type: "ADD_PRODUCT_REQUEST" });

    try {
      await addDoc(collection(db, "products"), productData);

      // ❌ REMOVE: Manual dispatch of ADD_PRODUCT_SUCCESS
      // ✅ Firestore's onSnapshot will automatically pick this up
    } catch (error) {
      dispatch({
        type: "ADD_PRODUCT_FAILURE",
        payload: error.message,
      });
    }
  };
};

// UPDATE PRODUCT
export const updateProduct = (id, updatedProduct) => {
  return async (dispatch) => {
    dispatch({ type: "UPDATE_PRODUCT_REQUEST" });

    try {
      const productDoc = doc(db, "products", id);
      await updateDoc(productDoc, updatedProduct);

      // ❌ REMOVE: Manual dispatch of UPDATE_PRODUCT_SUCCESS
    } catch (error) {
      dispatch({
        type: "UPDATE_PRODUCT_FAILURE",
        payload: error.message,
      });
    }
  };
};

// DELETE PRODUCT
export const deleteProduct = (id) => {
  return async (dispatch) => {
    dispatch({ type: "DELETE_PRODUCT_REQUEST" });

    try {
      const productDoc = doc(db, "products", id);
      await deleteDoc(productDoc);

      // ❌ REMOVE: Manual dispatch of DELETE_PRODUCT_SUCCESS
    } catch (error) {
      dispatch({
        type: "DELETE_PRODUCT_FAILURE",
        payload: error.message,
      });
    }
  };
};
