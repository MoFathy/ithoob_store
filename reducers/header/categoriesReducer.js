import {
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAIL,
  SET_ACTIVE_MENU,
} from "../../actions/actions-types";

const menuInitialState = {
  language: 2,
  categories: [],
  status: false,
  message: "",
  activeMenu: "",
  isLoading: true,
  siteTitle: "",
  siteDescription: "",
  deliveryPrice: 0,
  sizeManPrice: 0,
};

export default function(state = menuInitialState, action) {
  switch (action.type) {
    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload.categories,
        status: action.payload.status,
        isLoading: false,
        siteTitle: action.payload.siteTitle,
        siteDescription: action.payload.siteDescription,
        deliveryPrice: action.payload.deliveryPrice,
        sizeManPrice: action.payload.sizeManPrice,
      };
    case GET_CATEGORIES_FAIL:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message
      };
      case SET_ACTIVE_MENU:
      return {
        ...state,
        activeMenu: action.url
      }
    default:
      return state;
  }
}
