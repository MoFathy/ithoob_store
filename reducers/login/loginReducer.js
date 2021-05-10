import {
  TOGGLE_LOGIN_POPUP,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAIL,
  VERIFY_CODE_POPUP,
  GENERATE_CODE_FAIL,
  GENERATE_CODE_SUCCESS,
  VERIFY_CODE_SUCCESS,
  VERIFY_CODE_FAIL,
  STORE_EMAIL,
  UPDATE_TOKEN,
  CHANGE_ITHOOB_COOKIE,
  RESET_ERROR_MSG,
  SIGN_OUT,
  IS_EMAIL
} from "../../actions/loginPopUp/loginActions";
import {
  RESET_ANY_USERDATA,
  CONFIRM_USER_FAIL
} from "../../actions/signupPopUp/signupActions";

const loginInitialState = {
  loginPopUpStatus: false,
  loginRequestStatus: "",
  loginMsg: "",
  ithoobCookie: -1,
  usertype: "",
  userEmail: "",
  verifyCodePopUpwStatus: false,
  gcSuccessMsg: "",
  gcStatus: false,
  gcFailMsg: "",
  userData: {},
  fromSignUp: false,
  ithoobUser: -1,
  isEmail: true
};

export default function(state = loginInitialState, action) {
  switch (action.type) {
    case CONFIRM_USER_FAIL:
      return { ...state, gcStatus: false, gcFailMsg: action.data.message };
    case RESET_ANY_USERDATA:
      return { ...state, userData: {} };
    case SIGN_OUT:
      return { ...state, ithoobCookie: -1 };
    case RESET_ERROR_MSG:
      return { ...state, loginMsg: "" };
    case UPDATE_TOKEN:
      return { ...state, ithoobCookie: document.cookie.indexOf("ithoobUser") };
    case STORE_EMAIL:
      return { ...state, userEmail: action.email };
    case TOGGLE_LOGIN_POPUP:
      return { ...state, loginPopUpStatus: action.value, loginMsg: "" };
    case LOGIN_REQUEST_SUCCESS:
      if (action.data.access_token) {
        document.cookie =
          "ithoobUser=" +
          JSON.stringify({
            authenticationToken: action.data.access_token
          }) +
          ";path=/";
      }
      return {
        ...state,
        loginRequestStatus: action.data.status,
        userEmail: action.email,
        loginMsg: action.data.message,
        usertype: action.data.type,
        ithoobCookie: document.cookie.indexOf("ithoobUser")
      };
    case CHANGE_ITHOOB_COOKIE:
      return { ...state, ithoobCookie: action.ithoobCookie };
    case LOGIN_REQUEST_FAIL:
      return {
        ...state,
        loginRequestStatus: action.data.status,
        loginMsg: action.data.message
      };
    case VERIFY_CODE_POPUP:
      return {
        ...state,
        verifyCodePopUpwStatus: action.status,
        fromSignUp: action.fromSignUp !== undefined ? action.fromSignUp : false
      };
    case VERIFY_CODE_FAIL:
      return { ...state, gcStatus: false };
    case GENERATE_CODE_SUCCESS:
      return {
        ...state,
        gcStatus: action.data.status,
        gcSuccessMsg: action.data.message
      };
    case VERIFY_CODE_SUCCESS:
      return { ...state, userData: action.data.userData };
    case IS_EMAIL:
      return {...state, isEmail: action.data};
    default:
      return state;
  }
}
