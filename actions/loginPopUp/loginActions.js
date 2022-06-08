import fetch from "isomorphic-unfetch";
import Router from "next/router";
export const TOGGLE_LOGIN_POPUP = "TOGGLE_LOGIN_POPUP";
export const LOGIN__REQUEST = "LOGIN__REQUEST";
export const LOGIN_REQUEST_SUCCESS = "LOGIN_REQUEST_SUCCESS";
export const LOGIN_REQUEST_FAIL = "LOGIN_REQUEST_FAIL";
export const GENERATE_CODE_SUCCESS = "GENERATE_CODE_SUCCESS";
export const GENERATE_CODE_FAIL = "GENERATE_CODE_FAIL";
export const VERIFY_CODE_POPUP = "VERIFY_CODE_POPUP";
export const VERIFY_CODE_SUCCESS = "VERIFY_CODE_SUCCESS";
export const VERIFY_CODE_FAIL = "VERIFY_CODE_FAIL";
export const STORE_EMAIL = "STORE_EMAIL";
export const UPDATE_TOKEN = "UPDATE_TOKEN";
export const CHANGE_ITHOOB_COOKIE = "CHANGE_ITHOOB_COOKIE";
export const RESET_ERROR_MSG = "RESET_ERROR_MSG";
export const SIGN_OUT = "SIGN_OUT";
export const STORE_PASSWORD = "STORE_PASSWORD";
export const TOGGLE_CLOSE_POPUP = "TOGGLE_CLOSE_POPUP";
export const UPDATE_SOCIAL_MEDIA_MSG = "UPDATE_SOCIAL_MEDIA_MSG";
export const RESET_RESPONSE_MSGS ="RESET_RESPONSE_MSGS";
export const IS_EMAIL = "IS_EMAIL";

import {
  emailSignupPopUpToggle,
  storeUserData
} from "../../actions/signupPopUp/signupActions";
import { addToCartAuth1 } from "../../actions/customizationsPage/fabricsActions";
import { deleteCartItemsFromLocalStorage } from "../myCart/myCartActions";
import { deletePartnerDiscountLocalStorage } from "../myCart/getCode";
import { saveMeasurement } from "../addMeasurement/saveMeasurement";

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};

export const toggleClosePopup = value => {
  return {
    type: TOGGLE_CLOSE_POPUP,
    value
  };
};

export const reserErrorMsg = () => {
  return {
    type: RESET_ERROR_MSG
  };
};
export const updateToken = () => {
  return {
    type: UPDATE_TOKEN
  };
};
export const storeEmail = email => {
  return {
    type: STORE_EMAIL,
    email
  };
};
export const verifyCode = (email, code) => dispatch => {
  return fetch(process.env.endpoint + "/api/verify-code", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
      // 'JsonStub-User-Key': '3a323f5e-e6ee-4554-ba9c-6213cf6272d1',
      // 'JsonStub-Project-Key': '495ea768-7e38-409f-9b22-d571a8b24c9e'
    },
    body: JSON.stringify({
      email: email,
      code: code
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === true) {
        dispatch(verifyCodeSuccess(data, code));
        //close verify code from login pop up  status(false)
        dispatch(verifyCodePopUp(false));
        dispatch(emailSignupPopUpToggle(true));
      } else {
        dispatch(verifyCodeFail(data));
      }
    });
};
export const verifyCodeSuccess = (data, code) => {
  return {
    type: VERIFY_CODE_SUCCESS,
    data,
    code
  };
};
export const verifyCodeFail = data => {
  return {
    type: VERIFY_CODE_FAIL,
    data
  };
};
export const verifyCodePopUp = (status, fromSignUp) => {
  return {
    type: VERIFY_CODE_POPUP,
    status,
    fromSignUp
  };
};
export const generateCode = (email, secondTime, param) => dispatch => {
  return fetch(process.env.endpoint + "/api/generate-code", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
      // 'JsonStub-User-Key': '3a323f5e-e6ee-4554-ba9c-6213cf6272d1',
      // 'JsonStub-Project-Key': '495ea768-7e38-409f-9b22-d571a8b24c9e'
    },
    body:
      param !== undefined
        ? JSON.stringify({
            email: email,
            secondTime: secondTime,
            type: param
          })
        : param !== undefined && secondTime === true
        ? JSON.stringify({
            email: email,
            secondTime: secondTime
          })
        : JSON.stringify({
            email: email
          })
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === true) {
        if (
          data.message === "code sent successfully to your email" ||
          data.message === "code sent successfully to your mobile"
        ) {
          dispatch(loginPopUpStatusToggle(false));
          //open verify code from login pop up ,status(true), fromsignup(false)
          dispatch(storeEmail(email));
          dispatch(verifyCodePopUp(true, false));
        }
        dispatch(generateCodeSuccess(data));
      } else {
        dispatch(generateCodeFail(data));
      }
    });
};
export const generateCodeSuccess = data => {
  return {
    type: GENERATE_CODE_SUCCESS,
    data
  };
};
export const generateCodeFail = data => {
  return {
    type: GENERATE_CODE_FAIL,
    data
  };
};

export const getLoginSuccess = (data, email) => {
  return {
    type: LOGIN_REQUEST_SUCCESS,
    data,
    email
  };
};
export const getLoginFail = data => {
  return {
    type: LOGIN_REQUEST_FAIL,
    data
  };
};
export const loginRequest = (
  email,
  password,
  query,
  redirectToChechout,
  allSizesComplete,
  language,
  fromProductDetails,
  slug,
  fromMyCart
) => dispatch => {
  // console.log("password sent from action");

  const loginEmail = email;
  const loginPassword = password;
  return fetch(process.env.endpoint + "/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email,
      password: password,
      language: language
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === true) {
        if (data.access_token) {
          dispatch(loginPopUpStatusToggle(false));
          if ("uc" in localStorage) {
            let cart = JSON.parse(localStorage.getItem("uc"));
            if ("pd" in localStorage) {
              let productCodeObejct = JSON.parse(localStorage.getItem("pd"));
              var partnerCodeId = productCodeObejct.partnerdiscountId;
              dispatch(
                addToCartAuth1(
                  language,
                  cart,
                  data.access_token,
                  partnerCodeId,
                  query
                )
              );
            } else {
              dispatch(
                addToCartAuth1(
                  language,
                  cart,
                  data.access_token,
                  undefined,
                  query
                )
              );
            }
          }
          dispatch(deleteCartItemsFromLocalStorage());
          // dispatch(deletePartnerDiscountLocalStorage());

          if (redirectToChechout == true && allSizesComplete == true) {
            Router.push("/checkout");
          }
          if (query != undefined && query.includes("add-measurement")) {
            // Router.push("/customizations");
            // console.log('Router.push("/customizations");');

            dispatch(
              saveMeasurement(
                language,
                data.access_token,
                $("#sizeTitle").val(),
                $("#val1").val(),
                $("#val2").val(),
                $("#val3").val(),
                $("#val4").val(),
                $("#val5").val(),
                $("#val6").val(),
                $("#val7").val(),
                $("#val8").val(),
                $("#val9").val(),
                $("#val10").val(),
                $("#val11").val(),
                $("#val12").val(),
                fromProductDetails,
                slug,
                fromMyCart
              )
            );
          }
          // Router.push("/my-cart");
        }
        if (data.type === "oldSystem") {
          // console.log("email send to store email req");
          dispatch(storeEmail(loginEmail));
        }
        if (data.type === "oldSystemAuthed") {
          var name, email, mobile, area, address, password;
          if (data.userData.name) {
            name = data.userData.name;
          } else {
            name = "";
          }
          if (data.userData.email) {
            email = data.userData.email;
          } else {
            email = "";
          }
          if (data.userData.mobile) {
            mobile = data.userData.mobile;
          } else {
            mobile = "";
          }
          if (data.userData.area) {
            area = data.userData.area;
          } else {
            area = "";
          }
          if (data.userData.address) {
            address = data.userData.address;
          } else {
            address = "";
          }

          //save password as code
          dispatch(storeCode(loginPassword));
          //there is no password here
          dispatch(storeUserData(name, email, password, mobile, area, address));
          //open email sign up form for authenticated user to comlete his info signup
          dispatch(emailSignupPopUpToggle(true));
        }
        dispatch(getLoginSuccess(data, loginEmail));
        if (query === "/my-cart") {
          Router.push("/my-cart");
        }
      } else {
        dispatch(getLoginFail(data));
      }
    });
};
export const storeCode = pw => {
  return {
    type: STORE_PASSWORD,
    pw
  };
};
export const loginPopUpStatusToggle = value => {
  return {
    type: TOGGLE_LOGIN_POPUP,
    value
  };
};

export const changeIthoobCookie = ithoobCookie => {
  return {
    type: CHANGE_ITHOOB_COOKIE,
    ithoobCookie
  };
};

export const updateSocialMediaMsg = () => dispatch => {
  return dispatch({
    type: UPDATE_SOCIAL_MEDIA_MSG
  });
};
export const resetResponseMsgs = () => {
  return {
    type: RESET_RESPONSE_MSGS
  };
};

export const toggleIsEmail = value => {
  return {
    type: IS_EMAIL,
    value
  }
}
