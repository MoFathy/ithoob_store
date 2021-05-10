export const FACEBOOK_LOGIN_SUCCESS = "FACEBOOK_LOGIN_SUCCESS";
export const FACEBOOK_LOGIN_FAIL = "FACEBOOK_LOGIN_FAIL";

export const TWITTER_LOGIN_SUCCESS = "TWITTER_LOGIN_SUCCESS";
export const TWITTER_LOGIN_FAIL = "TWITTER_LOGIN_FAIL";

export const GOOGLE_LOGIN_SUCCESS = "GOOGLE_LOGIN_SUCCESS";
export const GOOGLE_LOGIN_FAIL = "GOOGLE_LOGIN_FAIL";
export const SOCIAL_LOGIN = "SOCIAL_LOGIN";
import {
  emailSignupPopUpToggle,
  signupPopUpStatusToggle
} from "../signupPopUp/signupActions";
import {
  loginPopUpStatusToggle,
  updateToken
} from "../loginPopUp/loginActions";
import { addToCartAuth1 } from "../../actions/customizationsPage/fabricsActions";
import { deleteCartItemsFromLocalStorage } from "../myCart/myCartActions";
import { deletePartnerDiscountLocalStorage } from "../myCart/getCode";
import Router from "next/router";


export const googleLoginRequest = (accessToken, query) => dispatch => {
  return fetch(process.env.endpoint + "/api/signup/google", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "JsonStub-User-Key": "3a323f5e-e6ee-4554-ba9c-6213cf6272d1",
      "JsonStub-Project-Key": "495ea768-7e38-409f-9b22-d571a8b24c9e"
    },
    body: JSON.stringify({
      access_token: accessToken
      // oauth_token:accessToken,
      // oauth_token_secret:secret,
      // user_id:id
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === true) {
        dispatch(loginPopUpStatusToggle(false));
        dispatch(signupPopUpStatusToggle(false));
        dispatch(googleLoginSuccess(data, accessToken));
        if (data.newUser === true) {
          dispatch(emailSignupPopUpToggle(true));
        }
        if (data.access_token) {
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
          if (query === "/my-cart") {
            Router.push("/my-cart");
          }
        }
      } else {
        dispatch(googleLoginFail(data));
      }
    });
};
export const googleLoginSuccess = (data, accessToken) => {
  return {
    type: GOOGLE_LOGIN_SUCCESS,
    data,
    accessToken
  };
};
export const googleLoginFail = data => {
  return {
    type: GOOGLE_LOGIN_FAIL,
    data
  };
};


export const twitterRequestToken = () => dispatch => {
  // alert("TwitterRequestToken");
  return fetch(process.env.endpoint + "/api/request_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      callback:
        window.location.protocol + "//" + window.location.host + "/twitter"
    })
  })
    .then(res => res.json())
    .then(data => {
      if (!data.response.includes("errors")) {
        window.open(
          "https://api.twitter.com/oauth/authenticate?" + data.response,
          "Twitter",
          "height=450, width=550, top=" +
            ($(window).height() / 2 - 275) +
            ", left=" +
            ($(window).width() / 2 - 225) +
            ", toolbar=0, location=0, menubar=0, directories=0, scrollbars=0"
        );
      } else {
        dispatch(twitterLoginFail(data));
      }
    });
};
export const twitterAuthToken = (token, verifer) => dispatch => {
  // alert("TwitterAuthToken");
  return fetch(process.env.endpoint + "/api/auth_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      verifier: verifer,
      token: token
    })
  })
    .then(res => res.json())
    .then(data => {
      dispatch(
        twitterLoginRequest(
          data.response.split("&oauth_token_secret=")[0].split("=")[1],
          data.response.split("&oauth_token_secret=")[1].split("&user_id=")[0]
        )
      );
    })
    .catch(function(err) {

    });
};
export const twitterLoginRequest = (accessToken, secret, id) => dispatch => {
  // alert("TwitterLoginRequest");
  var query = window.location.href
    .replace(window.location.protocol + "//", "")
    .replace(window.location.host, "");
  return fetch(process.env.endpoint + "/api/signup/twitter", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "JsonStub-User-Key": "3a323f5e-e6ee-4554-ba9c-6213cf6272d1",
      "JsonStub-Project-Key": "495ea768-7e38-409f-9b22-d571a8b24c9e"
    },
    body: JSON.stringify({
      // access_token:accessToken
      oauth_token: accessToken,
      oauth_token_secret: secret,
      user_id: id
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === true) {
        dispatch(loginPopUpStatusToggle(false));
        dispatch(signupPopUpStatusToggle(false));
        dispatch(twitterLoginSuccess(data, accessToken, secret));
        if (data.newUser === true) {
          dispatch(emailSignupPopUpToggle(true));
        }
        if (data.access_token) {
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
          if (query === "/my-cart") {
            Router.push("/my-cart");
          }
        }
        if (data.newUser !== true) {
          window.opener.location.reload(false);
          window.close();
        } else {
          document.cookie = "twitterNewUser=true" + ";path=/";
          document.cookie =
            "twitterNewData=" +
            JSON.stringify({
              data: data,
              accessToken: accessToken,
              secret: secret
            });
          (";path=/");
          window.opener.location.reload(false);
          window.close();
        }
      } else {
        dispatch(twitterLoginFail(data));
      }
    });
};
export const twitterLoginSuccess = (data, accessToken, secret) => {
  // alert("Success...");
  return {
    type: TWITTER_LOGIN_SUCCESS,
    data,
    accessToken,
    secret
  };
};
export const twitterLoginFail = data => {
  // alert("Fail...");
  return {
    type: TWITTER_LOGIN_FAIL,
    data
  };
};


export const facebookLoginRequest = (accessToken, query) => dispatch => {
  return fetch(process.env.endpoint + "/api/signup/facebook", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "JsonStub-User-Key": "3a323f5e-e6ee-4554-ba9c-6213cf6272d1",
      "JsonStub-Project-Key": "495ea768-7e38-409f-9b22-d571a8b24c9e"
    },
    body: JSON.stringify({
      access_token: accessToken
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === true) {
        dispatch(loginPopUpStatusToggle(false));
        dispatch(signupPopUpStatusToggle(false));
        dispatch(facebookLoginSuccess(data, accessToken));
        if (data.newUser === true) {
          dispatch(emailSignupPopUpToggle(true));
        }
        if (data.access_token) {
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
          if (query === "/my-cart") {
            Router.push("/my-cart");
          }
        }
      } else {
        dispatch(facebookLoginFail(data));
      }
    });
};
export const facebookLoginSuccess = (data, accessToken) => {
  return {
    type: FACEBOOK_LOGIN_SUCCESS,
    data,
    accessToken
  };
};
export const facebookLoginFail = data => {
  return {
    type: FACEBOOK_LOGIN_FAIL,
    data
  };
};

export const socialLogin = flag => {
  return {
    type: SOCIAL_LOGIN,
    flag
  };
};
