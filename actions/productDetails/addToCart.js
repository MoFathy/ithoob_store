import fetch from "isomorphic-unfetch";
import { getCookie } from "../../scripts/getCookieFile";
// import Router from "next/router";

import { cartInit } from "../../actions/header/cartHeader";
import {
  toggleSubPopUpStatus,
  submitCustomsFail
} from "../../actions/customizationsPage/fabricsActions";
export const ADD_TO_CART = "ADD_TO_CART";
export const ADD_TO_CART_NOT_AUTH = "ADD_TO_CART_NOT_AUTH";

export const addToCart = (
  language,
  slug,
  title_ar,
  title_en,
  img,
  productId,
  price,
  price_discount,
  discount,
  selectedColorId,
  selectedIds,
  quantity,
  sizeManFlag,
  size,
  shoesSize,
  sizeType,
  defaultIds,
  stockType,
  hasCustomizationOptions,
  quantityId,
  options_stock,
  stock
) => dispatch => {
  // add to cart, if user login call API, else add item to localstorage
  if (document.cookie.indexOf("ithoobUser") !== -1) {
    dispatch(
      addToCartAuth(
        language,
        getCookie("ithoobUser", "authenticationToken"),
        productId,
        selectedColorId,
        selectedIds,
        quantity,
        sizeManFlag,
        size,
        shoesSize,
        defaultIds,
        stockType,
        hasCustomizationOptions,
        sizeType,
        quantityId,
        stock
      )
    );
  } else {
    // console.log("addToCartNotAuth 1");
    dispatch(
      addToCartNotAuth(
        language,
        slug,
        title_ar,
        title_en,
        img,
        productId,
        price,
        price_discount,
        discount,
        selectedColorId,
        selectedIds,
        quantity,
        sizeManFlag,
        size,
        shoesSize,
        sizeType,
        stockType,
        hasCustomizationOptions,
        quantityId,
        options_stock,
        stock
      )
    );
  }
};

export const addToCartAuth = (
  language,
  auth,
  productId,
  selectedColorId,
  selectedIds,
  quantity,
  sizeManFlag,
  size,
  shoesSize,
  defaultIds,
  stockType,
  hasCustomizationOptions,
  sizeType,
  quantityId
) => dispatch => {
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
          fabric_custom: [selectedColorId],
          yaka_custom: selectedIds,
          quantity,
          sizeManFlag,
          size,
          shoesSize,
          selectedColorId: selectedColorId,
          selectedIds: defaultIds,
          sizeType:sizeType,
          quantityId: quantityId
        }
      ]
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === true) {
        // dispatch(submitCustomsSuccess(data));
        // dispatch(toggleSubPopUpStatus())
        dispatch(cartInit());
        // Router.push("/my-cart");
      } else {
        dispatch(submitCustomsFail(data));
      }
    });
};

export const addToCartNotAuth = (
  language,
  slug,
  title_ar,
  title_en,
  img,
  productId,
  price,
  price_discount,
  discount,
  selectedColorId,
  selectedIds,
  quantity,
  sizeManFlag,
  size,
  shoesSize,
  sizeType,
  stockType,
  hasCustomizationOptions,
  quantityId,
  options_stock,
  stock
) => dispatch => {
  if (localStorage.getItem("uc")) {
    // console.log("addToCartNotAuth 3");

    // if there is saved cart, get it and change to it
    let cart = JSON.parse(localStorage.getItem("uc"));
    cart.products.push({
      slug,
      title_ar,
      title_en,
      img,
      productId,
      price,
      price_discount,
      discount,
      selectedColorId,
      selectedIds,
      quantity,
      sizeManFlag,
      size,
      shoesSize,
      sizeType,
      stockType,
      hasCustomizationOptions,
      quantityId,
      options_stock,
      stock
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
            price_discount,
            discount,
            selectedColorId,
            selectedIds,
            quantity,
            sizeManFlag,
            size,
            shoesSize,
            sizeType,
            stockType,
            hasCustomizationOptions,
            quantityId,
            options_stock,
            stock
          }
        ]
      })
    );
  }
  dispatch(cartInit());
  // Router.push("/my-cart");
  // return dispatch({
  // type:ADD_TO_CART_NOT_AUTH,
  // 	slug,title_ar,title_en,img,productId,price,discount,selectedColorId,selectedIds,quantity,sizeManFlag,size,shoesSize
  // })
};
