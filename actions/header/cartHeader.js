import fetch from "isomorphic-unfetch";
import { getCookie, deleteCookie } from "../../scripts/getCookieFile";
import Router from "next/router";
import { changeIthoobCookie, signOut } from "../loginPopUp/loginActions";
import { clearCart } from "../myCart/myCartActions";
import { socialLogin } from "../socialMediaBtns/socialMediaActions";
import { updateSocialMediaMsg } from "../loginPopUp/loginActions";

export const UPDATE_CART_HEADER = "UPDATE_CART_HEADER";

export const updateCartHeader = cart => dispatch => {
  return dispatch({
    type: UPDATE_CART_HEADER,
    cart
  });
};

export const getCartHeader = (language, auth) => dispatch => {
  return fetch(process.env.endpoint + "/api/header-cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: auth
    },
    body: JSON.stringify({ language: language })
  })
    .then( res => {
      if (!res.ok) { throw res }
      return res.json()  //we only get here if there is no error
    })
    .then(data => {
      // Authorized
      if (data.status === true) {
        dispatch(updateCartHeader(data));
      }
    })
    .catch(err => {
      if(err.status == 401) {
        // Unauthorized
        Router.push('/');

        dispatch(changeIthoobCookie(-1));
        deleteCookie("ithoobUser");
        deleteCookie("socialtoken");

        dispatch(socialLogin(false));
        dispatch(updateSocialMediaMsg());

        dispatch(signOut());
  
        localStorage.clear();
  
        dispatch(cartInit());
        dispatch(clearCart());
        dispatch(updateCartHeader([]));
          
      } else {
        // console.log(err);
      }
    });
};

export const cartInit = () => dispatch => {
  // if user loggedin get cart from localstorage, else call API
  if (document.cookie.indexOf("ithoobUser") === -1) {
    // console.log("index of ithoob user =-1");
    if (localStorage.getItem("uc")) {
      // if there is saved cart
      let cart = JSON.parse(localStorage.getItem("uc"));
      dispatch(updateCartHeader(cart.products));
    }
  } else {
    // console.log("index of ithoob user !=-1");
    dispatch(
      getCartHeader(
        getCookie("lang") === false ? 1 : 2,
        getCookie("ithoobUser", "authenticationToken")
      )
    );
  }
};
