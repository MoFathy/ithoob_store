import {
  TOGGLE_SIGNUP_POPUP,
  TOGGLE_EMAILSIGNUP_POPUP,
  GET_COUNTRIES_SUCCESS,
  SIGNUP_REQUEST_SUCCESS,
  SIGNUP_REQUEST_FAIL,
  RESET_RETURNED_RESPONSE,
  STORE_USER_DATA,
  CONFIRM_USER_FAIL,
  CONFIRM_USER_SUCCESS,
  TOGGLE_DISCOUNT_POPUP,
  SIGNUP_GOO_REQUEST_SUCCESS,
  SIGNUP_TWI_REQUEST_SUCCESS,
  SIGNUP_FB_REQUEST_SUCCESS,
  SIGNUP_FB_REQUEST_FAIL,
  SIGNUP_TWI_REQUEST_FAIL,
  SIGNUP_GOO_REQUEST_FAIL,
  RESET_ANY_USERDATA,
  SIGNUP_SUCCESS_FROM_MYCART_POPUP,
  SIGNUP_FROM_PAYMENT_BTN,
  ADD_USER_MOBILE
} from "../../actions/signupPopUp/signupActions";
import {
  VERIFY_CODE_SUCCESS,
  VERIFY_CODE_FAIL,
  STORE_PASSWORD,
  VERIFY_CODE_POPUP,
  GENERATE_CODE_SUCCESS,
  UPDATE_SOCIAL_MEDIA_MSG
} from "../../actions/loginPopUp/loginActions";

const signupInitialState = {
  signupPopUpStatus: false,
  emailSignUpPopUp: false,
  countries: {},
  signupMsg: "",
  signupRequestStatus: "",
  signupFbRequestStatus: "",
  signupTwiRequestStatus: "",
  signupGooRequestStatus: "",
  userSignupData: {},
  discountPopUp: false,
  discount: "",
  codeConfirmUser: "",
  successSignupFromMycart: false,
  fromMycart: false,
  signPaymentBtn: false,
  socialMediaMsg: "",
  confirmUserState: "",
  existingUser: false,
  wasFoundByEmail: false,
  verifyCodeState: "",
  userMobile: ""
};

export default function (state = signupInitialState, action) {
  switch (action.type) {
    case GENERATE_CODE_SUCCESS:
      return { ...state, confirmUserState: "" };
    case SIGNUP_FROM_PAYMENT_BTN:
      return { ...state, signPaymentBtn: action.value };
    case SIGNUP_SUCCESS_FROM_MYCART_POPUP:
      return { ...state, successSignupFromMycart: action.value };
    case STORE_PASSWORD:
      return { ...state, codeConfirmUser: action.pw };
    case VERIFY_CODE_SUCCESS:
      return { ...state, codeConfirmUser: action.code, signupMsg: "" };
    case VERIFY_CODE_FAIL:
      return { ...state, verifyCodeState: action.data.status };
    case VERIFY_CODE_POPUP:
      return {
        ...state,
        confirmUserState: action.status === false ? "" : state.confirmUserState,
        signupMsg: action.status === false ? "" : state.signupMsg
      };
    case RESET_RETURNED_RESPONSE:
      return {
        ...state,
        signupRequestStatus: "",
        signupMsg: "",
        signUpIthoobCookie: -1
      };
    case TOGGLE_SIGNUP_POPUP:
      return { ...state, signupPopUpStatus: action.value };
    case TOGGLE_EMAILSIGNUP_POPUP:
      return {
        ...state,
        emailSignUpPopUp: action.value,
        signupMsg: action.value === false ? "" : state.signupMsg
      };
    case GET_COUNTRIES_SUCCESS:
      return { ...state, countries: action.data.countries };
    case SIGNUP_REQUEST_SUCCESS:
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
        signupRequestStatus: action.data.status,
        existingUser: action.data.existingUser,
        signupMsg: action.data.message
      };

    case SIGNUP_GOO_REQUEST_SUCCESS:
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
        signupGooRequestStatus: action.data.status,
        socialMediaMsg: action.data.message
      };
    case SIGNUP_TWI_REQUEST_SUCCESS:
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
        signupTwiRequestStatus: action.data.status,
        socialMediaMsg: action.data.message
      };
    case SIGNUP_FB_REQUEST_SUCCESS:
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
        signupFbRequestStatus: action.data.status,
        socialMediaMsg: action.data.message
      };
    case SIGNUP_GOO_REQUEST_FAIL:
      return {
        ...state,
        signupGooRequestStatus: action.data.status,
        socialMediaMsg: action.data.message
      };
    case SIGNUP_TWI_REQUEST_FAIL:
      return {
        ...state,
        signupTwiRequestStatus: action.data.status,
        socialMediaMsg: action.data.message
      };
    case SIGNUP_FB_REQUEST_FAIL:
      return {
        ...state,
        signupFbRequestStatus: action.data.status,
        socialMediaMsg: action.data.message
      };
    case SIGNUP_REQUEST_FAIL:
      return {
        ...state,
        signupMsg: action.data.message,
        signupRequestStatus: action.data.status,
        existingUser: action.data.existingUser,
        wasFoundByEmail: action.data.wasFoundByEmail
      };
    case STORE_USER_DATA:
      return { ...state, userSignupData: action.object };
    case CONFIRM_USER_SUCCESS:
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
        codeConfirmUser: "",
        userSignupData: {},
        discount: action.data.discount,
        signUpIthoobCookie: document.cookie.indexOf("ithoobUser"),
        confirmUserState: action.data.status
      };
    case CONFIRM_USER_FAIL:
      return { ...state, confirmUserState: action.data.status };
    case TOGGLE_DISCOUNT_POPUP:
      return {
        ...state,
        discountPopUp: action.value,
        fromMycart: action.fromwhere
      };
    case RESET_ANY_USERDATA:
      return {
        ...state,
        userSignupData: {},
        codeConfirmUser: "",
        signupMsg: "",
        confirmUserState: ""
      };
    case UPDATE_SOCIAL_MEDIA_MSG:
      return {
        ...state,
        socialMediaMsg: "",
        signupGooRequestStatus: ""
      };
    case ADD_USER_MOBILE:
      return {
        ...state,
        userMobile: action.value
      }
    default:
      return state;
  }
}
