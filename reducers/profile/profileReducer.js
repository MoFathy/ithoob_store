import {
  GET_Profile_Info_SUCCESS,
  GET_Profile_Info_FAIL,
  UPDATE_Profile_Info_SUCCESS,
  UPDATE_Profile_Info_FAIL,
  CHANG_PASSWORD_SUCCESS,
  CHANG_PASSWORD_FAIL,
  DELETE_MASSAGE,
  UPDATE_SUBMIT_STATUS
} from "../../actions/actions-types";

const profileInitialState = {
  language: 2,
  status: false,
  message: "",
  isLoading: true,

  personalInfo: {},
  contactInfo: {},

  submitStatus: false,
  submitMessage: "",

  changePasswordStatus: false,
  changePasswordMessage: ""
};

export default function(state = profileInitialState, action) {
  switch (action.type) {
    case GET_Profile_Info_SUCCESS:
      return {
        ...state,
        status: action.payload.status,
        isLoading: false,
        personalInfo: action.payload.personalInfo,
        contactInfo: action.payload.contactInfo
      };
    case GET_Profile_Info_FAIL:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message,
        isLoading: false
      };
    case UPDATE_Profile_Info_SUCCESS:
      return {
        ...state,
        submitStatus: action.payload.status,
        isLoading: false
      };
    case UPDATE_Profile_Info_FAIL:
      return {
        ...state,
        submitStatus: action.payload.status,
        submitMessage: action.payload.message,
        isLoading: false
      };

    case CHANG_PASSWORD_SUCCESS:
      return {
        ...state,
        changePasswordStatus: action.payload.status,
        isLoading: false
      };
    case CHANG_PASSWORD_FAIL:
      return {
        ...state,
        changePasswordStatus: action.payload.status,
        changePasswordMessage: action.payload.message,
        isLoading: false
      };
      case DELETE_MASSAGE:
      return{
        ...state,
        changePasswordMessage: ""
      }
      case UPDATE_SUBMIT_STATUS: 
      return{
        ...state,
        submitStatus: action.status
      }
    default:
      return state;
  }
}
