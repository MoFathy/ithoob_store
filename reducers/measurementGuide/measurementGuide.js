import {
  GET_MEASUREMENT_SUCCESS,
  GET_MEASUREMENT_FAIL
} from "../../actions/actions-types";

const measurmentsInitialState = {
  language: 2,
  status: false,
  message: "",
  categories: [],
  isLoading: true
};

export default function(state = measurmentsInitialState, action) {
  switch (action.type) {
    case GET_MEASUREMENT_SUCCESS:
      return {
        ...state,
        status: action.payload.status,
        categories: action.payload.cats,
        isLoading: false
      };
    case GET_MEASUREMENT_FAIL:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message,
        isLoading: false
      };
    default:
      return state;
  }
}
