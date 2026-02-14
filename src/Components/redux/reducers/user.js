const initialState = { login: { token: null, user: null } };
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LOGIN":
      return {
        ...state,
        login: { token: action.payload.token, user: action.payload.user },
      };
    case "LOGOUT":
      return {
        ...state,
        login: { token: null, user: null },
      };
    case "SET_USER": {
      const updatedUser = action.payload;
      return {
        ...state,
        login: {
          ...state.login,
          user: updatedUser,
        },
      };
    }
    default:
      return state;
  }
};

export default userReducer;
