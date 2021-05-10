import {
  GET_PRODUCT_DETAILS_SUCCESS,
  GET_PRODUCT_DETAILS_FAIL,
  UPDATE_QUANTITY,
  GET_DEFAULT_IDS,
  ADD_SELECTED_ID,
  UPDATE_MAX_QUANTITY,
  UPDATE_COLOR,
  UPDATE_SHOES_SIZE_STATUS
} from "../../actions/actions-types";
const productDetailsInitialState = {
  language: 2,
  productDetails: {},
  policies: [],
  status: null,
  message: "",
  quantity: 1,
  SelectedIds: [],
  SelectedColorId: null,
  defaultIds: [],
  maxQuantity: 0,
  isLoading: true,
  shoesSizeStatuse: true
};

export default function(state = productDetailsInitialState, action) {
  switch (action.type) {
    case GET_PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        status: action.payload.status,
        productDetails: action.payload.productDetails,
        policies: action.payload.policies,
        isLoading: false
      };
    case GET_PRODUCT_DETAILS_FAIL:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message,
        isLoading: false
      };
    case UPDATE_QUANTITY:
      return {
        ...state,
        quantity: action.newQuantity
      };
    case UPDATE_COLOR:
      return {
        ...state,
        SelectedColorId: action.colorId
      };
    case GET_DEFAULT_IDS:
      return {
        ...state,
        defaultIds: [...action.defaultIds]
      };
    case ADD_SELECTED_ID:
      return {
        ...state,
        SelectedIds: [
          ...state.SelectedIds.filter(item => !action.others.includes(item)),
          action.id
        ]
      };

    case UPDATE_MAX_QUANTITY:
      return {
        ...state,
        maxQuantity: action.maxQuantity
      };
    case UPDATE_SHOES_SIZE_STATUS:
      return {
        ...state,
        shoesSizeStatuse: action.status
      };
    default:
      return state;
  }
}
