const initialState = {
  cart: {
    content: [],
    cartTotal: 0,
  },
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: {
          ...state.cart,
          content: [...state.cart.content, action.payload],
          cartTotal: state.cart.cartTotal + action.payload.prezzo,
        },
      };
    case "REMOVE_FROM_CART": {
      const removedProduct = state.cart.content[action.payload];
      return {
        ...state,
        cart: {
          ...state.cart,
          content: state.cart.content.filter((_, i) => i !== action.payload),
          cartTotal: state.cart.cartTotal - (removedProduct ? removedProduct.prezzo : 0),
        },
      };
    }

    default:
      return state;
  }
};

export default cartReducer;
