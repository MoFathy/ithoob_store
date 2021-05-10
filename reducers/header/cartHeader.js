import { UPDATE_CART_HEADER } from "../../actions/header/cartHeader";

const cartHeaderInitialState = {
  cartCount: 0,
  cartItems: [],
  allSizesComplete: false,
  outOfCoverage:false,
  hasUnavailableItem: false
};

export default function(state = cartHeaderInitialState, action) {
  switch (action.type) {
    case UPDATE_CART_HEADER:
      return {
        ...state,
        cartCount: action.cart.cartItemsDetails
          ? action.cart.cartItemsDetails.length
          : action.cart.length,
        cartItems: action.cart.cartItemsDetails
          ? action.cart.cartItemsDetails
          : action.cart.items
          ? action.cart.items
          : action.cart,
        allSizesComplete: action.cart.allSizesComplete
          ? action.cart.allSizesComplete
          : false,
        outOfCoverage:action.cart.outOfCoverage,
        hasUnavailableItem:action.cart.hasUnavailableItem
      };
    default:
      return state;
  }
}
