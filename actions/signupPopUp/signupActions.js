import fetch from "isomorphic-unfetch";
export const TOGGLE_SIGNUP_POPUP = "TOGGLE_SIGNUP_POPUP";
export const TOGGLE_EMAILSIGNUP_POPUP = "TOGGLE_EMAILSIGNUP_POPUP";
export const GET_COUNTRIES_SUCCESS = "GET_COUNTRIES_SUCCESS";
export const GET_COUNTRIES_FAIL = "GET_COUNTRIES_FAIL";
export const SIGNUP_REQUEST_SUCCESS = "SIGNUP_REQUEST_SUCCESS";
export const SIGNUP_REQUEST_FAIL = "SIGNUP_REQUEST_FAIL";
export const RESET_RETURNED_RESPONSE = "RESET_RETURNED_RESPONSE";
export const STORE_USER_DATA = "STORE_USER_DATA";
export const CONFIRM_USER_SUCCESS = "CONFIRM_USER_SUCCESS";
export const CONFIRM_USER_FAIL = "CONFIRM_USER_FAIL";
export const TOGGLE_DISCOUNT_POPUP = "TOGGLE_DISCOUNT_POPUP";
export const SIGNUP_FB_REQUEST_SUCCESS = "SIGNUP_FB_REQUEST_SUCCESS";
export const SIGNUP_TWI_REQUEST_SUCCESS = "SIGNUP_TWI_REQUEST_SUCCESS";
export const SIGNUP_GOO_REQUEST_SUCCESS = "SIGNUP_GOO_REQUEST_SUCCESS";
export const SIGNUP_FB_REQUEST_FAIL = "SIGNUP_FB_REQUEST_FAIL";
export const SIGNUP_TWI_REQUEST_FAIL = "SIGNUP_TWI_REQUEST_FAIL";
export const SIGNUP_GOO_REQUEST_FAIL = "SIGNUP_GOO_REQUEST_FAIL";
export const RESET_ANY_USERDATA = "RESET_ANY_USERDATA";
export const SIGNUP_SUCCESS_FROM_MYCART_POPUP =
  "SIGNUP_SUCCESS_FROM_MYCART_POPUP";
export const SIGNUP_FROM_PAYMENT_BTN = "SIGNUP_FROM_PAYMENT_BTN";
export const ADD_USER_MOBILE = "ADD_USER_MOBILE";
import Router from "next/router";
import {
  verifyCodePopUp,
  storeEmail,
  updateToken,
  loginPopUpStatusToggle
} from "../loginPopUp/loginActions";
import { addToCartAuth1 } from "../customizationsPage/fabricsActions";
import { deleteCartItemsFromLocalStorage } from "../myCart/myCartActions";
import { deletePartnerDiscountLocalStorage } from "../myCart/getCode";

export const signUpFromPaymentBtn = value => {
  return {
    type: SIGNUP_FROM_PAYMENT_BTN,
    value
  };
};

export const signUpSuccessFromMyCartPopup = value => {
  return {
    type: SIGNUP_SUCCESS_FROM_MYCART_POPUP,
    value
  };
};

export const resetAnyUserData = () => {
  return {
    type: RESET_ANY_USERDATA
  };
};
export const signupGooRequest = (
  name,
  email,
  mobile,
  areaID,
  address,
  socialcookie,
  query,
  signPaymentBtn,
  lang
) => dispatch => {

  return fetch(process.env.endpoint + "/api/completeSignup/google", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "JsonStub-User-Key": "3a323f5e-e6ee-4554-ba9c-6213cf6272d1",
      "JsonStub-Project-Key": "495ea768-7e38-409f-9b22-d571a8b24c9e"
    },
    body:
      mobile !== ""
        ? JSON.stringify({
          email: email,
          name: name,
          mobile: mobile,
          area: areaID,
          address: address,
          access_token: socialcookie
        })
        : JSON.stringify({
          email: email,
          name: name,
          area: areaID,
          address: address,
          access_token: socialcookie
        })
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === true) {
        dispatch(emailSignupPopUpToggle(false));

        dispatch(getSignupGooSuccess(data));
        if (data.access_token) {
          dispatch(updateToken());
          dispatch(loginPopUpStatusToggle(false));
          if ("uc" in localStorage) {
            let cart = JSON.parse(localStorage.getItem("uc"));
            if ("pd" in localStorage) {
              let productCodeObejct = JSON.parse(localStorage.getItem("pd"));
              var partnerCodeId = productCodeObejct.partnerdiscountId;
              dispatch(
                addToCartAuth1(
                  lang,
                  cart,
                  data.access_token,
                  partnerCodeId,
                  query
                )
              );
            } else {
              dispatch(
                addToCartAuth1(lang, cart, data.access_token, undefined, query)
              );
            }
          }
          dispatch(deleteCartItemsFromLocalStorage());
          // dispatch(deletePartnerDiscountLocalStorage());

          if (
            signPaymentBtn != undefined &&
            signPaymentBtn === true &&
            query != undefined &&
            query == "/my-cart"
          ) {
            dispatch(signUpSuccessFromMyCartPopup(true));
          } else if (
            query === "/my-cart" &&
            signPaymentBtn != undefined &&
            signPaymentBtn === false
          ) {
            Router.push("/my-cart");
          }
        }
      } else {
        dispatch(getSignupGooFail(data));
      }
    });
};
export const getSignupGooSuccess = data => {
  return {
    type: SIGNUP_GOO_REQUEST_SUCCESS,
    data
  };
};
export const getSignupGooFail = data => {
  return {
    type: SIGNUP_GOO_REQUEST_FAIL,
    data
  };
};
export const signupTwiRequest = (
  name,
  email,
  mobile,
  areaID,
  address,
  socialcookie,
  secret,
  query,
  signPaymentBtn,
  lang
) => dispatch => {
  return fetch(process.env.endpoint + "/api/completeSignup/twitter", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "JsonStub-User-Key": "3a323f5e-e6ee-4554-ba9c-6213cf6272d1",
      "JsonStub-Project-Key": "495ea768-7e38-409f-9b22-d571a8b24c9e"
    },
    body:
      mobile !== ""
        ? JSON.stringify({
          email: email,
          name: name,
          mobile: mobile,
          area: areaID,
          address: address,
          oauth_token: socialcookie,
          oauth_token_secret: secret
        })
        : JSON.stringify({
          email: email,
          name: name,
          area: areaID,
          address: address,
          oauth_token: socialcookie,
          oauth_token_secret: secret
        })
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === true) {
        dispatch(emailSignupPopUpToggle(false));
        dispatch(getSignupTwiSuccess(data));
        if (data.access_token) {
          dispatch(updateToken());
          dispatch(loginPopUpStatusToggle(false));
          if ("uc" in localStorage) {
            let cart = JSON.parse(localStorage.getItem("uc"));
            if ("pd" in localStorage) {
              let productCodeObejct = JSON.parse(localStorage.getItem("pd"));
              var partnerCodeId = productCodeObejct.partnerdiscountId;
              dispatch(
                addToCartAuth1(
                  lang,
                  cart,
                  data.access_token,
                  partnerCodeId,
                  query
                )
              );
            } else {
              dispatch(
                addToCartAuth1(lang, cart, data.access_token, undefined, query)
              );
            }
          }
          dispatch(deleteCartItemsFromLocalStorage());
          // dispatch(deletePartnerDiscountLocalStorage());

          if (
            signPaymentBtn != undefined &&
            signPaymentBtn === true &&
            query != undefined &&
            query == "/my-cart"
          ) {
            // console.log("page should not reloaded");
            dispatch(signUpSuccessFromMyCartPopup(true));
          } else if (
            query === "/my-cart" &&
            signPaymentBtn != undefined &&
            signPaymentBtn === false
          ) {
            Router.push("/my-cart");
          }
        }
      } else {
        dispatch(getSignupTwiFail(data));
      }
    });
};
export const getSignupTwiSuccess = data => {
  return {
    type: SIGNUP_TWI_REQUEST_SUCCESS,
    data
  };
};
export const getSignupTwiFail = data => {
  return {
    type: SIGNUP_TWI_REQUEST_FAIL,
    data
  };
};
export const signupFbRequest = (
  name,
  email,
  mobile,
  areaID,
  address,
  socialcookie,
  query,
  signPaymentBtn,
  lang
) => dispatch => {
  return fetch(process.env.endpoint + "/api/completeSignup/facebook", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "JsonStub-User-Key": "3a323f5e-e6ee-4554-ba9c-6213cf6272d1",
      "JsonStub-Project-Key": "495ea768-7e38-409f-9b22-d571a8b24c9e"
    },
    body:
      mobile !== ""
        ? JSON.stringify({
          email: email,
          name: name,
          mobile: mobile,
          area: areaID,
          address: address,
          access_token: socialcookie
        })
        : JSON.stringify({
          email: email,
          name: name,
          area: areaID,
          address: address,
          access_token: socialcookie
        })
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === true) {
        dispatch(emailSignupPopUpToggle(false));
        dispatch(getSignupFbSuccess(data));
        if (data.access_token) {
          dispatch(updateToken());
          dispatch(loginPopUpStatusToggle(false));
          if ("uc" in localStorage) {
            let cart = JSON.parse(localStorage.getItem("uc"));
            if ("pd" in localStorage) {
              let productCodeObejct = JSON.parse(localStorage.getItem("pd"));
              var partnerCodeId = productCodeObejct.partnerdiscountId;
              dispatch(
                addToCartAuth1(
                  lang,
                  cart,
                  data.access_token,
                  partnerCodeId,
                  query
                )
              );
            } else {
              dispatch(
                addToCartAuth1(lang, cart, data.access_token, undefined, query)
              );
            }
          }
          dispatch(deleteCartItemsFromLocalStorage());
          // dispatch(deletePartnerDiscountLocalStorage());

          if (
            signPaymentBtn != undefined &&
            signPaymentBtn === true &&
            query != undefined &&
            query == "/my-cart"
          ) {
            dispatch(signUpSuccessFromMyCartPopup(true));
          } else if (
            query === "/my-cart" &&
            signPaymentBtn != undefined &&
            signPaymentBtn === false
          ) {
            Router.push("/my-cart");
          }
        }
      } else {
        dispatch(getSignupFbFail(data));
      }
    });
};
export const getSignupFbSuccess = data => {
  return {
    type: SIGNUP_FB_REQUEST_SUCCESS,
    data
  };
};
export const getSignupFbFail = data => {
  return {
    type: SIGNUP_FB_REQUEST_FAIL,
    data
  };
};
export const toggleDiscountPopUp = (value, fromwhere) => {
  return {
    type: TOGGLE_DISCOUNT_POPUP,
    value,
    fromwhere
  };
};
export const confirmUser = (
  userData,
  code,
  query,
  fromPayment
  // ,
  // signPaymentBtn
) => dispatch => {
  return fetch(process.env.endpoint + "/api/confirm-user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      address: userData.address,
      area: userData.area,
      email: userData.email,
      mobile: userData.mobile,
      name: userData.name,
      password: userData.password,
      code: code
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === true) {
        dispatch(confirmUserSuccess(data));
        if (data.access_token) {
          dispatch(emailSignupPopUpToggle(false));
          dispatch(loginPopUpStatusToggle(false));
          //close popup status(false)
          dispatch(verifyCodePopUp(false));
          dispatch(updateToken());
          if ("uc" in localStorage) {
            let cart = JSON.parse(localStorage.getItem("uc"));
            if ("pd" in localStorage) {
              let productCodeObejct = JSON.parse(localStorage.getItem("pd"));
              var partnerCodeId = productCodeObejct.partnerdiscountId;
              dispatch(
                addToCartAuth1(
                  "2",
                  cart,
                  data.access_token,
                  partnerCodeId,
                  query
                )
              );
            } else {
              dispatch(
                addToCartAuth1("2", cart, data.access_token, undefined, query)
              );
            }
          }
          dispatch(deleteCartItemsFromLocalStorage());
          // dispatch(deletePartnerDiscountLocalStorage());

          if (
            fromPayment != undefined &&
            fromPayment === true &&
            query != undefined &&
            query == "/my-cart"
          ) {

          } else if (
            query === "/my-cart" &&
            fromPayment != undefined &&
            fromPayment === false
          ) {
            Router.push("/my-cart");
          }
        }
        if (
          query === "/my-cart" &&
          fromPayment === true &&
          data.discount !== "" &&
          data.discount !== undefined
        ) {
          //from cart has  discount
          dispatch(verifyCodePopUp(false));
          // dispatch(toggleDiscountPopUp(true, true));
          dispatch(signUpSuccessFromMyCartPopup(true))
        } else if (
          query === "/my-cart" &&
          fromPayment === true
          // && (data.discount === "" || data.discount == undefined )
        ) {
          // from my cart and has no discout
          dispatch(verifyCodePopUp(false));
          dispatch(signUpSuccessFromMyCartPopup(true));
        } else {
          //from home has/has no discount
          dispatch(verifyCodePopUp(false));
          if (data.discount !== "" && data.discount !== undefined) {
            // not from my cart and has discount
            dispatch(toggleDiscountPopUp(true, false));
            // dispatch(signUpSuccessFromMyCartPopup(true))
          }
        }
      } else {
        dispatch(confirmUserFail(data));
      }
    });
};
export const confirmUserSuccess = data => {
  return {
    type: CONFIRM_USER_SUCCESS,
    data
  };
};
export const confirmUserFail = data => {
  return {
    type: CONFIRM_USER_FAIL,
    data
  };
};

export const resetReturnedResponse = () => {
  return {
    type: RESET_RETURNED_RESPONSE
  };
};
export const getCountries = lang => dispatch => {
  return fetch(process.env.endpoint + "/api/countries", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "JsonStub-User-Key": "3a323f5e-e6ee-4554-ba9c-6213cf6272d1",
      "JsonStub-Project-Key": "495ea768-7e38-409f-9b22-d571a8b24c9e"
    },
    body: JSON.stringify({
      language: lang
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === true) {
        dispatch(getCountriesSuccess(data));
      } else {
        dispatch(getCountriesFail(data));
      }
    });
};
export const getCountriesSuccess = data => {
  return {
    type: GET_COUNTRIES_SUCCESS,
    data
  };
};
export const getCountriesFail = data => {
  return {
    type: GET_COUNTRIES_FAIL,
    data
  };
};
export const getSignupSuccess = data => {
  return {
    type: SIGNUP_REQUEST_SUCCESS,
    data
  };
};
export const getSignupFail = data => {
  return {
    type: SIGNUP_REQUEST_FAIL,
    data
  };
};
export const storeUserData = (
  name,
  email,
  password,
  mobile,
  areaID,
  address
) => {
  var object = {
    name: name,
    email: email,
    password: password,
    mobile: mobile,
    area: areaID,
    address: address
  };
  return {
    type: STORE_USER_DATA,
    object
  };
};
export const signupRequest = (
  name,
  email,
  password,
  mobile,
  areaID,
  address,
  query,
  signPaymentBtn,
  lang
) => dispatch => {
  dispatch(resetReturnedResponse());
  return fetch(process.env.endpoint + "/api/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "JsonStub-User-Key": "3a323f5e-e6ee-4554-ba9c-6213cf6272d1",
      "JsonStub-Project-Key": "495ea768-7e38-409f-9b22-d571a8b24c9e"
    },
    body:
      mobile !== ""
        ? JSON.stringify({
          email: email,
          password: password,
          name: name,
          mobile: mobile,
          area: areaID,
          address: address,
          language: lang
        })
        : JSON.stringify({
          email: email,
          password: password,
          name: name,
          area: areaID,
          address: address,
          language: lang
        })
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === true) {
        dispatch(storeEmail(email));
        dispatch(emailSignupPopUpToggle(false));
        dispatch(getSignupSuccess(data));
        if (data.access_token) {
          dispatch(updateToken());
          if ("uc" in localStorage) {
            let cart = JSON.parse(localStorage.getItem("uc"));
            if ("pd" in localStorage) {
              let productCodeObejct = JSON.parse(localStorage.getItem("pd"));
              var partnerCodeId = productCodeObejct.partnerdiscountId;
              dispatch(
                addToCartAuth1(
                  lang,
                  cart,
                  data.access_token,
                  partnerCodeId,
                  query
                )
              );
            } else {
              dispatch(
                addToCartAuth1(lang, cart, data.access_token, undefined, query)
              );
            }
          }
          dispatch(deleteCartItemsFromLocalStorage());
          // dispatch(deletePartnerDiscountLocalStorage());
          if (query === "/my-cart") {
            // Router.push("/my-cart");
          }
        }
        if (data.type === "oldSystemAuthed") {
          dispatch(
            storeUserData(name, email, password, mobile, areaID, address)
          );
          //open email sign up form for authenticated user to comlete his info signup
          dispatch(emailSignupPopUpToggle(true));
        }
        // if(data.type ==="oldSystem"){
        // dispatch(storeUserData(name,email,password,mobile,areaID,address))
        //open pop up for verification status(true),fromsignup(true)
        dispatch(verifyCodePopUp(true, true));
        // }
      } else {
        dispatch(getSignupFail(data));
      }
    });
};
export const signupPopUpStatusToggle = value => {
  return {
    type: TOGGLE_SIGNUP_POPUP,
    value
  };
};
export const emailSignupPopUpToggle = value => {
  return {
    type: TOGGLE_EMAILSIGNUP_POPUP,
    value
  };
};
export const addUserMobile = value => {
  return {
    type: ADD_USER_MOBILE,
    value
  }
};

export const subscripeNewsLetter = (data) => {
  console.log(data)
  return fetch(process.env.endpoint + "/api/subscripeNewsLetter", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "JsonStub-User-Key": "3a323f5e-e6ee-4554-ba9c-6213cf6272d1",
      "JsonStub-Project-Key": "495ea768-7e38-409f-9b22-d571a8b24c9e"
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(responseData => {
      console.log(responseData)
      if (data.status === true) {
        localStorage.setItem("isSubscripedToNewsletter", true);
      }
    });
};
