import { combineReducers } from "redux";
import authReducer from "./authReducer";
import ProductReducer from "./productReducer";
import CartReducer from "./cartReducer";
const rootReducer = combineReducers({
  auth: authReducer,
  products: ProductReducer,
  cart: CartReducer,
});

export default rootReducer;
