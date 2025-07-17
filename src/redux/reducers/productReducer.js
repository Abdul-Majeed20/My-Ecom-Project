const initialState = {
  products: [],
  loading: false,
  error: null,
};

const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_PRODUCT_REQUEST":
    case "ADD_PRODUCT_REQUEST":
    case "UPDATE_PRODUCT_REQUEST":
    case "DELETE_PRODUCT_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };

    case "FETCH_PRODUCT_SUCCESS":
      return {
        ...state,
        loading: false,
        products: action.payload,
      };

    case "ADD_PRODUCT_SUCCESS":
      return {
        ...state,
        loading: false,
        products: [...state.products, action.payload],
      };

    case "UPDATE_PRODUCT_SUCCESS":
      return {
        ...state,
        loading: false,
        products: state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        ),
      };

    case "DELETE_PRODUCT_SUCCESS":
      return {
        ...state,
        loading: false,
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
      };

    case "FETCH_PRODUCT_FAILURE":
    case "ADD_PRODUCT_FAILURE":
    case "UPDATE_PRODUCT_FAILURE":
    case "DELETE_PRODUCT_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default ProductReducer;
