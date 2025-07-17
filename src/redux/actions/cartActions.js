// redux/cartActions.js

import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

// ✅ Fetch cart (realtime)
export const listenToCart = () => (dispatch) => {
  dispatch({ type: "FETCH_CART_REQUEST" });

  try {
    const unsubscribe = onSnapshot(
      collection(db, "cart"),
      (snapshot) => {
        const cartItems = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        dispatch({
          type: "FETCH_CART_SUCCESS",
          payload: cartItems,
        });
      },
      (error) => {
        dispatch({
          type: "FETCH_CART_FAILURE",
          payload: error.message,
        });
      }
    );

    return unsubscribe;
  } catch (error) {
    dispatch({
      type: "FETCH_CART_FAILURE",
      payload: error.message,
    });
  }
};

// ✅ Add to cart
export const addToCart = (product) => async (dispatch) => {
  dispatch({ type: "ADD_TO_CART_REQUEST" });

  try {
    const cartRef = collection(db, "cart");
    const q = query(cartRef, where("id", "==", product.id));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      // Product not in Firestore cart → add with quantity 1
      await addDoc(cartRef, { ...product, quantity: 1 });
    } else {
      const docRef = querySnapshot.docs[0].ref;
      const existingData = querySnapshot.docs[0].data();

      await updateDoc(docRef, {
        quantity: existingData.quantity + 1,
      });
      // If it exists, you may want to update quantity instead of doing nothing
      // Optional: implement update logic here
    }

    // Local state updated via snapshot listener elsewhere
  } catch (error) {
    dispatch({
      type: "ADD_TO_CART_FAILURE",
      payload: error.message,
    });
  }
};
// ✅ Increment quantity
export const incrementQuantity =
  (cartItemId, currentQuantity) => async (dispatch) => {
    console.log(cartItemId, currentQuantity);

    dispatch({ type: "INCREMENT_QUANTITY_REQUEST" });
    try {
      const itemRef = doc(db, "cart", cartItemId);
      await updateDoc(itemRef, { quantity: currentQuantity + 1 });
      // snapshot listener will handle update
    } catch (error) {
      dispatch({
        type: "INCREMENT_QUANTITY_FAILURE",
        payload: error.message,
      });
    }
  };

// ✅ Decrement quantity
export const decrementQuantity =
  (cartItemId, currentQuantity) => async (dispatch) => {
    dispatch({ type: "DECREMENT_QUANTITY_REQUEST" });

    try {
      if (currentQuantity > 1) {
        const itemRef = doc(db, "cart", cartItemId);
        await updateDoc(itemRef, { quantity: currentQuantity - 1 });
      }
    } catch (error) {
      dispatch({
        type: "DECREMENT_QUANTITY_FAILURE",
        payload: error.message,
      });
    }
  };

// ✅ Remove from cart
export const removeFromCart = (cartItemId) => async (dispatch) => {
  dispatch({ type: "REMOVE_FROM_CART_REQUEST" });

  try {
    await deleteDoc(doc(db, "cart", cartItemId));
  } catch (error) {
    dispatch({
      type: "REMOVE_FROM_CART_FAILURE",
      payload: error.message,
    });
  }
};

// ✅ Clear cart
export const clearCart = () => async (dispatch, getState) => {
  dispatch({ type: "CLEAR_CART_REQUEST" });

  try {
    const { cartItems } = getState().cart;
    const deletePromises = cartItems.map((item) =>
      deleteDoc(doc(db, "cart", item.id))
    );

    await Promise.all(deletePromises);
  } catch (error) {
    dispatch({
      type: "CLEAR_CART_FAILURE",
      payload: error.message,
    });
  }
};
