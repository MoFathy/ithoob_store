import {
  GET_HOME_PRODUCTS_SUCCESS,
  GET_HOME_PRODUCTS_FAIL
} from "../../actions/actions-types";

const productsInitialState = {
  language: 2,
  athwabCategory: {},
  clothesCategory: {},
  accessoriesCategory: {},
  recommendedCategory: {},
  winterCollectionCategory: {},
  perfumeCategory: {},
  shoesCategory: {},
  status: true,
  message: null
};

export default function(state = productsInitialState, action) {
  switch (action.type) {
    case GET_HOME_PRODUCTS_SUCCESS:
      return {
        ...state,
        athwabCategory: action.payload.athwabCat,
        clothesCategory: action.payload.clothesCategory,
        accessoriesCategory: action.payload.accessoriesCategory,
        recommendedCategory: action.payload.recommendedCategory,
        winterCollectionCategory: action.payload.winterCollectionCategory,
        perfumeCategory: action.payload.perfumeCategory,
        shoesCategory: action.payload.shoesCategory,
        status: action.payload.status
      };
    case GET_HOME_PRODUCTS_FAIL:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message
      };

    default:
      return state;
  }
}
