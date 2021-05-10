import {
  GET_MORE_PRODUCTS_SUCCESS,
  GET_MORE_PRODUCTS_FAIL,
	TOGGLE_PRODUCT_STATUS
} from "../../actions/actions-types";

const moreProductsInitialState = {
  language: 2,
  status: null,
  message: "",
  moreProducts: []
};

export default function(state = moreProductsInitialState, action) {
  switch (action.type) {
    case GET_MORE_PRODUCTS_SUCCESS:
      return {
        ...state,
        status: action.payload.status,
        moreProducts: action.payload.products
      };
    case GET_MORE_PRODUCTS_FAIL:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message
      };
		case TOGGLE_PRODUCT_STATUS:
			return {
        ...state,
        status: action.status,
      };
    default:
      return state;
  }
}
