import fetch from "isomorphic-unfetch";
export const GET_FABRICS_SUCCESS = "GET_FABRICS_SUCCESS";
export const GET_FABRICS_FAIL = "GET_FABRICS_FAIL";
export const STORE_START_COST = "STORE_START_COST";
export const SUBMIT_CUSTOMS_SUCCESS = "SUBMIT_CUSTOMS_SUCCESS";
export const SUBMIT_CUSTOMS_FAIL = "SUBMIT_CUSTOMS_FAIL";
export const TOGGLE_SUBMISSION_POPUP = "TOGGLE_SUBMISSION_POPUP";
export const ADD_TO_CART_NOT_AUTH = "ADD_TO_CART_NOT_AUTH";
export const CHANGE_UPLOAD_STATUS = "CHANGE_UPLOAD_STATUS";
export const CHANGE_CART_STATUS = "CHANGE_CART_STATUS";
export const SET_INDEX = "SET_INDEX";
export const UPDATE_TOTAL_COST = "UPDATE_TOTAL_COST";

import { cartInit } from "../../actions/header/cartHeader";

import { getCookie } from "../../scripts/getCookieFile";
import axios from "axios";
import Router from "next/router";
export const updateCost = cost => {
  return {
    type: UPDATE_TOTAL_COST,
    cost
  };
};
export const setCustomsLocalIndex = value => {
  return {
    type: SET_INDEX,
    value
  };
};

export const editCustoms = (
  lang,
  productId,
  fullCost,
  quantity,
  sizeManFlag,
  size,
  shoesSize,
  fabrics,
  yaka,
  adds,
  zarzour,
  akmam,
  others,
  attachments,
  notes,
  auth
) => dispatch => {
  return fetch(process.env.endpoint + "/api/edit-item-bulk", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: auth
    },
    body: JSON.stringify({
      customized: true,
      language: lang,
      productId: productId,
      fullCost: fullCost,
      quantity: quantity,
      sizeManFlag: sizeManFlag,
      size: size,
      shoesSize: shoesSize,
      fabric_custom: fabrics,
      yaka_custom: yaka,
      adds_custom: adds,
      zarzour_custom: zarzour,
      akmam_custom: akmam,
      others_custom: others,
      attachments: attachments,
      notes: notes
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === true) {
        dispatch(toggleSubPopUpStatus(false));
        Router.push("/my-cart");
      } else {
      }
    });
};
export const toggleSubPopUpStatus = value => {
  return {
    type: TOGGLE_SUBMISSION_POPUP,
    value
  };
};
export const changeUploadStatus = flag => {
  return {
    type: CHANGE_UPLOAD_STATUS,
    flag
  };
};
export const changeCartStatus = flag => {
  return {
    type: CHANGE_CART_STATUS,
    flag
  };
};

export const submitCustoms = (
  language,
  slug,
  title_ar,
  title_en,
  img,
  productId,
  fullCost,
  quantity,
  sizeManFlag,
  size,
  shoesSize,
  fabrics,
  yaka,
  adds,
  zarzour,
  akmam,
  others,
  attachments,
  notes,
  sizeType,
  basicPrice
) => dispatch => {
  // add to cart, if user login call API, else add item to localstorage
  if (document.cookie.indexOf("ithoobUser") !== -1) {

    if (attachments) {
      // if user uploaded files
      dispatch(changeUploadStatus(false));
      dispatch(
        uploadFiles(
          attachments,
          getCookie("ithoobUser", "authenticationToken"),
          language,
          productId,
          fullCost,
          quantity,
          sizeManFlag,
          size,
          shoesSize,
          fabrics,
          yaka,
          adds,
          zarzour,
          akmam,
          others,
          attachments,
          notes
        )
      );
    } else {
      dispatch(
        addToCartAuth(
          getCookie("ithoobUser", "authenticationToken"),
          language,
          productId,
          fullCost,
          quantity,
          sizeManFlag,
          size,
          shoesSize,
          fabrics,
          yaka,
          adds,
          zarzour,
          akmam,
          others,
          "",
          notes
        )
      );
    }
  } else {
    dispatch(
      addToCartNotAuth(
        language,
        slug,
        title_ar,
        title_en,
        img,
        productId,
        fullCost,
        quantity,
        sizeManFlag,
        size,
        shoesSize,
        fabrics,
        yaka,
        adds,
        zarzour,
        akmam,
        others,
        attachments,
        notes,
        sizeType,
        basicPrice
      )
    );
    dispatch(toggleSubPopUpStatus(false));
  }
};

export const addToCartAuth = (
  auth,
  language,
  productId,
  fullCost,
  quantity,
  sizeManFlag,
  size,
  shoesSize,
  fabrics,
  yaka,
  adds,
  zarzour,
  akmam,
  others,
  attachments,
  notes
) => dispatch => {
  dispatch(changeCartStatus(false));

  return fetch(process.env.endpoint + "/api/add-to-cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: auth
    },
    body: JSON.stringify({
      language: language,
      products: [
        {
          productId,
          customized: true,
          price: fullCost,
          quantity,
          sizeManFlag,
          size,
          shoesSize,
          fabrics: fabrics,
          yaka: yaka,
          adds: adds,
          zarzour: zarzour,
          akmam: akmam,
          others: others,
          note: { content: notes, images: attachments != "" ? attachments : [] }
        }
      ]
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === true) {
        dispatch(changeCartStatus(true));
        dispatch(toggleSubPopUpStatus(false));
        // dispatch(submitCustomsSuccess(data));
        dispatch(cartInit());
        Router.push("/my-cart");
      } else {
        dispatch(submitCustomsFail(data));
      }
    })
    .catch(err => {
      // console.log(err)
    })
};
export const addToCartAuth1 = (
  lang,
  products,
  auth,
  partnerCodeId,
  query
) => dispatch => {
  dispatch(changeCartStatus(false));

  return fetch(process.env.endpoint + "/api/add-to-cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: auth
    },
    body:
      partnerCodeId !== undefined
        ? JSON.stringify({
            language: lang,
            products: products.products,
            partnerCodeId: partnerCodeId
          })
        : JSON.stringify({
            language: lang,
            products: products.products
          })
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === true) {
        dispatch(changeCartStatus(true));
        dispatch(toggleSubPopUpStatus(false));
        // dispatch(submitCustomsSuccess(data));
        dispatch(cartInit());
        if (query === "/customizations" || window.location.pathname === "/") {
          // console.log("dont redirect to my cart");
        } else {
          Router.push("/my-cart");
        }
      } else {
        dispatch(submitCustomsFail(data));
      }
    })
    .catch(err => {
      // console.log(err)
    })
};

export const addToCartNotAuth = (
  language,
  slug,
  title_ar,
  title_en,
  img,
  productId,
  price,
  quantity,
  sizeManFlag,
  size,
  shoesSize,
  fabrics,
  yaka,
  adds,
  zarzour,
  akmam,
  others,
  attachments,
  notes,
  sizeType,
  basicPrice
) => dispatch => {
  // console.log("addToCartNotAuth");

  if (localStorage.getItem("uc")) {
    // if there is saved cart, get it and change to it
    let cart = JSON.parse(localStorage.getItem("uc"));
    cart.products.push({
      slug,
      title_ar,
      title_en,
      img,
      productId,
      price,
      quantity,
      sizeManFlag,
      size,
      shoesSize,
      fabrics,
      yaka,
      adds,
      zarzour,
      akmam,
      others,
      attachments,
      notes,
      sizeType,
      basicPrice,
      customized: true
    });
    localStorage.setItem("uc", JSON.stringify(cart));
  } else {
    // this is the first product in cart
    localStorage.setItem(
      "uc",
      JSON.stringify({
        products: [
          {
            slug,
            title_ar,
            title_en,
            img,
            productId,
            price,
            quantity,
            sizeManFlag,
            size,
            shoesSize,
            fabrics,
            yaka,
            adds,
            zarzour,
            akmam,
            others,
            attachments,
            notes,
            sizeType,
            basicPrice,
            customized: true
          }
        ]
      })
    );
  }
  dispatch(cartInit());
  Router.push("/my-cart");
  return dispatch({
    type: ADD_TO_CART_NOT_AUTH,
    slug,
    title_ar,
    title_en,
    img,
    productId,
    price,
    quantity,
    sizeManFlag,
    size,
    shoesSize,
    fabrics,
    yaka,
    adds,
    zarzour,
    akmam,
    others,
    attachments,
    notes
  });
};

export const uploadFiles = (
  images,
  auth,
  language,
  productId,
  fullCost,
  quantity,
  sizeManFlag,
  size,
  shoesSize,
  fabrics,
  yaka,
  adds,
  zarzour,
  akmam,
  others,
  attachments,
  notes
) => dispatch => {
  // console.log("uploadFiles");

  axios
    .post(process.env.endpoint + "/api/upload", images, {
      headers: { Authorization: auth }
    })
    .then(response => {
      dispatch(changeUploadStatus(true));
      if (response.data.status === true) {
        dispatch(
          addToCartAuth(
            auth,
            language,
            productId,
            fullCost,
            quantity,
            sizeManFlag,
            size,
            shoesSize,
            fabrics,
            yaka,
            adds,
            zarzour,
            akmam,
            others,
            response.data.sources,
            notes
          )
        );
      } else {
      }
    })
    .catch(err => {
      // console.log(err);
    });
  // };
};

export const submitCustomsSuccess = payload => {
  return {
    type: SUBMIT_CUSTOMS_SUCCESS,
    payload
  };
};

export const submitCustomsFail = payload => ({
  type: SUBMIT_CUSTOMS_FAIL,
  payload
});

//send post request
export const getFabrics = language => dispatch => {

  return fetch(process.env.endpoint + "/api/fabrics", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
      // "JsonStub-User-Key": "3a323f5e-e6ee-4554-ba9c-6213cf6272d1",
      // "JsonStub-Project-Key": "495ea768-7e38-409f-9b22-d571a8b24c9e"
    },
    body: JSON.stringify({
      language: language
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === true) {
        dispatch(getFabricsSuccess(data));
        dispatch(storeStartCost(data["product-details"].cost));
      } else {
        dispatch(getFabricsFail(data));
      }
    });
};

export const storeStartCost = cost => {
  return {
    type: STORE_START_COST,
    cost
  };
};
export const getFabricsSuccess = payload => {
  return {
    type: GET_FABRICS_SUCCESS,
    payload
  };
};

export const getFabricsFail = payload => ({
  type: GET_FABRICS_FAIL,
  payload
});
