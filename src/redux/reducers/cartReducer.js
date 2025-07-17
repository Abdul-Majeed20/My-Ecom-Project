// redux/cartReducer.js

const initialState = {
  cartItems: [],
  loading: false,
  error: null,
};

const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_CART_REQUEST":
    case "ADD_TO_CART_REQUEST":
    case "INCREMENT_QUANTITY_REQUEST":
    case "DECREMENT_QUANTITY_REQUEST":
    case "REMOVE_FROM_CART_REQUEST":
    case "CLEAR_CART_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };

    case "FETCH_CART_SUCCESS":
      return {
        ...state,
        loading: false,
        cartItems: action.payload,
      };

    case "ADD_TO_CART_SUCCESS":
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        // If product is already in cart, increase quantity
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        // If product is new, add with quantity 1
        return {
          ...state,
          cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
        };
      }

    case "INCREMENT_QUANTITY_SUCCESS":
    case "DECREMENT_QUANTITY_SUCCESS":
      return {
        ...state,
        loading: false,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };

    case "REMOVE_FROM_CART_SUCCESS":
      return {
        ...state,
        loading: false,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };

    case "CLEAR_CART_SUCCESS":
      return {
        ...state,
        loading: false,
        cartItems: [],
      };

    case "FETCH_CART_FAILURE":
    case "ADD_TO_CART_FAILURE":
    case "INCREMENT_QUANTITY_FAILURE":
    case "DECREMENT_QUANTITY_FAILURE":
    case "REMOVE_FROM_CART_FAILURE":
    case "CLEAR_CART_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default CartReducer;
