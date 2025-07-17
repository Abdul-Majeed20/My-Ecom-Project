import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
// make sure auth and db are correctly imported

export const registerUser = (formData) => {
  return async (dispatch) => {
    dispatch({
      type: "REGISTER",
      payload: { loading: true, user: null, error: null },
    });

    try {
      // 1. Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      // 2. Remove password from formData before saving to Firestore
      const { password, ...userData } = formData;

      // 3. Save additional user data to Firestore
      const docRef = await addDoc(collection(db, "users"), {
        ...userData,
        uid: user.uid, // link Firestore user to Firebase Auth user
        createdAt: new Date(),
      });

      const userWithId = {
        ...userData,
        uid: user.uid,
        id: docRef.id,
      };

      // 4. Dispatch success
      dispatch({
        type: "REGISTER",
        payload: {
          loading: false,
          user: userWithId,
          error: null,
        },
      });
    } catch (err) {
      // Dispatch error
      dispatch({
        type: "REGISTER",
        payload: {
          loading: false,
          user: null,
          error: err.message,
        },
      });
    }
  };
};

export const loginUser = ({ email, password }) => {
  return async (dispatch) => {
    // Dispatch loading = true
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: {
        loading: true,
        user: null,
        error: null,
      },
    });
    try {
      // 1. Authenticate user with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // 2. Fetch user data from Firestore using the uid
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const userData = { ...doc.data(), id: doc.id };

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("user", JSON.stringify(userData));

        // 3. Dispatch success
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            loading: false,
            user: userData,
            error: null,
          },
        });
      } else {
        // No user found
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            loading: false,
            user: null,
            error: "Invalid email or password",
          },
        });
      }
    } catch (err) {
      // Dispatch error
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          loading: false,
          user: null,
          error: err.message,
        },
      });
    }
  };
};

export const logout = () => ({
  type: "LOGOUT",
});
