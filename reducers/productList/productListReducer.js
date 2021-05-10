import {
  GET_PRODUCT_LIST_SUCCESS,
  GET_PRODUCT_LIST_FAIL,
  UPDATE_PAGE_INDEX,
  UPDATE_CALLING_API_STATUS_WHILE_SCROLLING,
  RESET_PRODUCT_LIST_SUCCESS,
  UPDATE_LOADER,
  UPDATE_SCROLLING_LOADER,
  UPDATE_SLUG,
  INITIAL_PRODUCT_LIST
} from "../../actions/actions-types";

const productListInitialState = {
  language: 2,
  status: null,
  message: "",
  products: [],
  pageIndex: 1,
  pageSize: 9,
  stopCallingApiWhileScrollig: true,
  loading: true,
  scrollingLoader: true,
  dataCategorySlug: {},
  productsLength: 0
};

export default function(state = productListInitialState, action) {
  switch (action.type) {
    case GET_PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        status: action.payload.status,
        products: [...state.products, ...action.payload.products],
        stopCallingApiWhileScrollig: false,
        loading: false,
        scrollingLoader: false,
        productsLength: action.payload.products.length
      };
    case GET_PRODUCT_LIST_FAIL:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message,
        loading: false
      };
    case UPDATE_PAGE_INDEX:
      return {
        ...state,
        pageIndex: action.newPageIndex
      };
    case UPDATE_CALLING_API_STATUS_WHILE_SCROLLING:
      return {
        ...state,
        stopCallingApiWhileScrollig: action.flag,
        // loading: false,
        scrollingLoader: false
      };
    case RESET_PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        status: action.payload.status,
        products: action.payload.products,
        stopCallingApiWhileScrollig: false,
        productsLength: action.payload.products.length
        // loading: false
      };
    case UPDATE_LOADER:
      return {
        ...state,
        loading: action.loading
      };
    case UPDATE_SCROLLING_LOADER:
      return {
        ...state,
        scrollingLoader: action.scrollingLoader
      };
    case UPDATE_SLUG:
      return {
        ...state,
        dataCategorySlug: action.query
      };
    case INITIAL_PRODUCT_LIST:
      return {
        ...state,
        language: 2,
        status: null,
        message: "",
        products: [],
        pageIndex: 1,
        pageSize: 9,
        stopCallingApiWhileScrollig: true,
        loading: true,
        scrollingLoader: true,
        dataCategorySlug: {},
        productsLength: 0
      };
    default:
      return state;
  }
}
