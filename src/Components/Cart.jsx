// components/Cart.jsx
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} from "../redux/actions/cartActions"; // ✅ correct import path (based on your new structure)
import { db } from "../firebase/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { listenToCart } from "../redux/actions/cartActions";
const Cart = () => {
  const { cartItems, loading } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [checkoutMsg, setCheckoutMsg] = useState("");
  const [placingOrder, setPlacingOrder] = useState(false);
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false); // 🚨 NEW state to block rendering until auth checked
  useEffect(() => {
    dispatch(listenToCart());
  }, [dispatch]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const user = JSON.parse(localStorage.getItem("user"));

    if (!isLoggedIn || !user) {
      navigate("/login");
    } else {
      dispatch({ type: "LOGIN_SUCCESS", payload: user });
    }

    setAuthChecked(true); // ✅ Allow render after auth check
  }, [dispatch, navigate]);

  if (!authChecked) return null;

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    setPlacingOrder(true);
    try {
      const order = {
        items: cartItems,
        total,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "orders"), order);
      dispatch(clearCart());
      setCheckoutMsg("✅ Order placed successfully!");
    } catch (err) {
      console.error(err);
      setCheckoutMsg("❌ Failed to place order.");
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* Cart Icon Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Shopping Cart</h1>
        <div className="relative">
          <FaShoppingCart size={28} />
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {cartItems.length}
          </span>
        </div>
      </div>

      {checkoutMsg && (
        <p className="mb-4 text-green-600 font-semibold">{checkoutMsg}</p>
      )}

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li key={item.id} className="flex items-center border-b pb-2">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-16 h-16 object-cover mr-4"
                />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-sm text-gray-600">
                    Price: ${item.price.toFixed(2)}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() =>
                        dispatch(decrementQuantity(item.id, item.quantity))
                      }
                      className="px-2 py-1 bg-gray-300 rounded"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        dispatch(incrementQuantity(item.id, item.quantity))
                      }
                      className="px-2 py-1 bg-gray-300 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-red-500 hover:underline ml-4"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 text-right">
            <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
            <button
              onClick={handleCheckout}
              disabled={placingOrder}
              className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              {placingOrder ? "Placing Order..." : "Checkout"}
            </button>
            <button
              onClick={() => dispatch(clearCart())}
              className="ml-2 mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
