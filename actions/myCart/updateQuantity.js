import fetch from "isomorphic-unfetch";

import {
  UPDATE_QUANTITY_SUCCESS,
  UPDATE_QUANTITY_FAIL,
  DELETE_ITEM_FROM_LOCAL_STORAGE,
  UPDATE_QUANTITY_FROM_LOCAL_STORAGE,
  GET_CART_ITEMS_FROM_LOCAL_STORAGE,
  UPDATE_DELETED_ITEM_ID,
  UPDATE_DELETED_ITEM_INDEX,
  UPDATE_DELETED_ITEM_TITLE,
  UPDATE_DELETE_CONFIRMED_MODAL_DISPLAY
} from "../actions-types";
import { getCartItems, updateErrMsgStatus } from "./myCartActions";
import { updateCartHeader } from "../header/cartHeader";
//updateQuantitySuccess func that takes the payload of getCartItems request as a param
//and return action type (UPDATE_QUANTITY_SUCCESS) and this payload
export const updateQuantitySuccess = payload => dispatch => {
  return dispatch({
    type: UPDATE_QUANTITY_SUCCESS,
    payload
  });
};

//updateQuantityFail func that takes the payload of getCartItems request as a param
//and return action type (UPDATE_QUANTITY_FAIL) and this payload
export const updateQuantityFail = payload => dispatch => {
  return dispatch({
    type: UPDATE_QUANTITY_FAIL,
    payload
  });
};

//send post request to profile API with language as params
export const updateQuantity = (
  language,
  authorization,
  productId,
  quantity
) => dispatch => {
  return fetch(process.env.endpoint + "/api/edit-item-quantity", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization
    },
    body: JSON.stringify({
      language: language,
      productId: productId,
      quantity: quantity
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === true) {
        dispatch(updateQuantitySuccess(data));
        dispatch(getCartItems(language, authorization));
        if (quantity == 0) {
          dispatch(updateDeleteConfirmedModalDisplay(true));
          dispatch(updateErrMsgStatus(false));
        }
      }else{
        dispatch(updateQuantityFail(data));
      }
    })
    .catch(err => {
      dispatch(
        updateQuantityFail({
          status: false,
          message: "Error in update item quantity from catch"
        })
      );
    });
};

export const deleteItemFromLocalStorage = index => dispatch => {
  let localCartItems = JSON.parse(localStorage.getItem("uc"));
  localCartItems.products.splice(index, 1);
  localStorage.setItem("uc", JSON.stringify(localCartItems));
  dispatch(updateCartHeader(localCartItems.products));
  return dispatch({
    type: DELETE_ITEM_FROM_LOCAL_STORAGE,
    payload: localCartItems
  });
};

export const updateQuantityFromLocalStorage = (
  index,
  newQuantity
) => dispatch => {
  let localCartItems;
  if (localStorage.getItem("uc")) {
    localCartItems = JSON.parse(localStorage.getItem("uc"));
    localCartItems.products[index].quantity = newQuantity;
    localStorage.setItem("uc", JSON.stringify(localCartItems));
  } else {
    localCartItems = localStorage.setItem(
      "uc",
      JSON.stringify({ products: [] })
    );
  }
  dispatch(updateCartHeader(localCartItems.products));
  return dispatch({
    type: UPDATE_QUANTITY_FROM_LOCAL_STORAGE,
    payload: localCartItems
  });
};

export const updateDeletedItemId = payload => dispatch => {
  return dispatch({
    type: UPDATE_DELETED_ITEM_ID,
    payload
  });
};

export const updateDeletedItemIndex = payload => dispatch => {
  return dispatch({
    type: UPDATE_DELETED_ITEM_INDEX,
    payload
  });
};

export const updateDeletedItemTitle = payload => dispatch => {
  return dispatch({
    type: UPDATE_DELETED_ITEM_TITLE,
    payload
  });
};

export const updateDeleteConfirmedModalDisplay = payload => dispatch => {
  return dispatch({
    type: UPDATE_DELETE_CONFIRMED_MODAL_DISPLAY,
    payload
  });
};
