import {
  GET_MEASUREMENT_LIST_SUCCESS,
  GET_MEASUREMENT_LIST_FAIL,
  UPDATE_DEFAULT_MEASUREMENT_SUCCESS,
  UPDATE_DEFAULT_MEASUREMENT_FAIL,
  RESET_DEFAULT_MEASUREMENT
} from "../../actions/actions-types";

const measurmentListInitialState = {
  language: 2,
  status: false,
  message: "",
  generalItems: [],
  isLoading: true,
  makeDefaultState: false,
  makeDefaultMessage: ""
};

export default function(state = measurmentListInitialState, action) {
  switch (action.type) {
    case GET_MEASUREMENT_LIST_SUCCESS:
      return {
        ...state,
        status: action.payload.status,
        generalItems: action.payload.generalItems,
        isLoading: false
      };
    case GET_MEASUREMENT_LIST_FAIL:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message,
        isLoading: false
      };
    case UPDATE_DEFAULT_MEASUREMENT_SUCCESS:
      return {
        ...state,
        makeDefaultState: action.payload.status
      };
    case UPDATE_DEFAULT_MEASUREMENT_FAIL:
      return {
        ...state,
        makeDefaultState: action.payload.status,
        makeDefaultMessage: action.payload.message
      };
    case RESET_DEFAULT_MEASUREMENT:
      return {
        ...state,
        makeDefaultState: action.stasus
      };
    default:
      return state;
  }
}
