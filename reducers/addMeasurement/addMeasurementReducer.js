import {
  GET_ADD_MEASUREMENT_SUCCESS,
  GET_ADD_MEASUREMENT_FAIL,
  UPDATE_ACTIVE_ITEM_ID,
  SAVE_MEASUREMENT_SUCCESS,
  SAVE_MEASUREMENT_FAIL,
  UPDATE_DATA_IS_CHANGED_STATUS,
  UPDATE_CONFIRMATION_MODAL,
  UPDATE_SIZE_NAME_MODAL,
  UPDATE_SUCCESS_MODAL,
  UPDATE_SIZE_FILE_NAME,
  GET_MEASUREMENT_DETAILS_SUCCESS,
  GET_MEASUREMENT_DETAILS_FAIL,
  UPDATE_SIZE_NAME,
  UPDATE_CARRUNT_VALUES,
  UPDATE_FROM_PRODUCT_DETAILS,
  GET_FROM_PRODUCT_DETAILS
} from "../../actions/actions-types";

const addMeasurmentInitialState = {
  language: 2,
  status: false,
  message: "",
  name: "",
  items: [],
  isLoading: true,
  activeItemId: 0,
  activeImg: 0,
  activeFooter: 0,
  saveMeasurementStatus: false,
  saveMeasurementMessage: "",
  dataIsChanged: false,

  showConfirmationModal: false,
  showSizeNameModal: false,
  showSuccessModal: false,
  measurementDetailsStatus: false,
  measurementDetailsMessage: "",
  profileDetails: {},
  profileId: 0,
  value1: "",
  value2: "",
  value3: "",
  value4: "",
  value5: "",
  value6: "",
  value7: "",
  value8: "",
  value9: "",
  value10: "",
  value11: "",
  value12: "",
  currentVal: "",
  minVal: "",
  maxVal: "",
  fromProductDetails: false,
  query: "",
  fromMyCart: false
};

export default function(state = addMeasurmentInitialState, action) {
  switch (action.type) {
    case GET_ADD_MEASUREMENT_SUCCESS:
      return {
        ...state,
        status: action.payload.status,
        name: action.payload.name,
        items: action.payload.items,
        isLoading: false
      };
    case GET_ADD_MEASUREMENT_FAIL:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message,
        isLoading: false
      };
    case UPDATE_ACTIVE_ITEM_ID:
      return {
        ...state,
        activeItemId: action.id,
        activeImg: action.id,
        activeFooter: action.id
      };
    case SAVE_MEASUREMENT_SUCCESS:
      return {
        ...state,
        saveMeasurementStatus: action.payload.status
      };
    case SAVE_MEASUREMENT_FAIL:
      return {
        ...state,
        saveMeasurementStatus: action.payload.status,
        saveMeasurementMessage: action.payload.message
      };
    case UPDATE_DATA_IS_CHANGED_STATUS:
      return {
        ...state,
        dataIsChanged: action.status
      };
    case UPDATE_CONFIRMATION_MODAL:
      return {
        ...state,
        showConfirmationModal: action.status
      };
    case UPDATE_SIZE_NAME_MODAL:
      return {
        ...state,
        showSizeNameModal: action.status
      };
    case UPDATE_SUCCESS_MODAL:
      return {
        ...state,
        showSuccessModal: action.status
      };
    case UPDATE_SIZE_FILE_NAME:
      return {
        ...state,
        name: action.name
      };
    case GET_MEASUREMENT_DETAILS_SUCCESS:
      return {
        ...state,
        measurementDetailsStatus: action.payload.status,
        profileDetails: action.payload.profileDetails,
        profileId: action.payload.profileDetails.profileId,
        name: action.payload.profileDetails.name,
        value1: action.payload.profileDetails.value1,
        value2: action.payload.profileDetails.value2,
        value3: action.payload.profileDetails.value3,
        value4: action.payload.profileDetails.value4,
        value5: action.payload.profileDetails.value5,
        value6: action.payload.profileDetails.value6,
        value7: action.payload.profileDetails.value7,
        value8: action.payload.profileDetails.value8,
        value9: action.payload.profileDetails.value9,
        value10: action.payload.profileDetails.value10,
        value11: action.payload.profileDetails.value11,
        value12: action.payload.profileDetails.value12,
      };
    case GET_MEASUREMENT_DETAILS_FAIL:
      return {
        ...state,
        measurementDetailsStatus: action.payload.status,
        measurementDetailsMessage: action.payload.message
      };
    case UPDATE_CARRUNT_VALUES:
      return {
        ...state,
        currentVal: action.currentValues.currentVal,
        minVal: action.currentValues.minVal,
        maxVal: action.currentValues.maxVal
      };
    case UPDATE_FROM_PRODUCT_DETAILS:
    case GET_FROM_PRODUCT_DETAILS:
      return {
        ...state,
        fromProductDetails: action.status,
        query: action.query,
        fromMyCart: action.fromMyCartStatus
      };

    default:
      return state;
  }
}
