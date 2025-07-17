const intialState = {
  isAuthenticated: false,
  user: null,
};

const authReducer = (state = intialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user || null,
        loading: action.payload.loading || false,
        error: action.payload.error || null,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    case "REGISTER":
      return {
        ...state,
        user: action.payload.user || null,
        loading: action.payload.loading || false,
        error: action.payload.error || null,
      };

    default:
      return state;
  }
};

export default authReducer;
