import fetch from "isomorphic-unfetch";

import {
  //   UPDATE_EDIT_SIZE_DISPLAY_STATUS,
  UPDATE_SIZE_SUCCESS,
  UPDATE_SIZE_FAIL,
  UPDATE_EDIT_SIZE_RENDER,
  UPDATE_SIZE_FROM_LOCAL_STORAGE,
  UPDATE_SIZE_STATUS,
  UPDATE_MEASUREMENT_ERR_MSG
} from "../actions-types";
import {
  getCartItems
  // checkMeasurments
} from "./myCartActions";
//updateEditSizeDisplayStatus func that takes the payload of getCartItems request as a param
//and return action type (UPDATE_EDIT_SIZE_DISPLAY_STATUS) and this payload
// export const updateEditSizeDisplayStatus = payload => dispatch => {
//   return dispatch({
//     type: UPDATE_EDIT_SIZE_DISPLAY_STATUS,
//     payload
//   });
// };
export const updateEditSizeRender = payload => dispatch => {
  return dispatch({
    type: UPDATE_EDIT_SIZE_RENDER,
    payload
  });
};

//updateSizeSuccess func that takes the payload of getCartItems request as a param
//and return action type (UPDATE_SIZE_SUCCESS) and this payload
export const updateSizeSuccess = payload => dispatch => {
  return dispatch({
    type: UPDATE_SIZE_SUCCESS,
    payload
  });
};

//updateSizeFail func that takes the payload of getCartItems request as a param
//and return action type (UPDATE_SIZE_FAIL) and this payload
export const updateSizeFail = payload => dispatch => {
  return dispatch({
    type: UPDATE_SIZE_FAIL,
    payload
  });
};

//send post request to profile API with language as params
export const updateSize = (
  language,
  authorization,
  productId,
  sizeManFlag,
  size,
  quantity_id,
  stockUpdate
) => dispatch => {
  console.log('====================================');
  console.log(quantity_id);
  console.log('====================================');
  return fetch(process.env.endpoint + "/api/edit-item-measurement", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization
    },
    body: JSON.stringify({
      language: language,
      productId: productId,
      sizeManFlag: sizeManFlag,
      size: size,
      quantity_id: quantity_id,
      stockUpdate: stockUpdate
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === true) {
        dispatch(updateSizeSuccess(data));
        dispatch(getCartItems(language, authorization));
      } else {
        dispatch(updateSizeFail(data));
      }
    })
    .catch(err => {
      dispatch(
        updateSizeFail({
          status: false,
          message: "Error in update item quantity from catch"
        })
      );
    });
};

export const updateSizeFromLocalStorage = (index, newSize) => dispatch => {
  let localCartItems;
  if (localStorage.getItem("uc")) {
    localCartItems = JSON.parse(localStorage.getItem("uc"));
    localCartItems.products[index].shoesSize = newSize;
    localStorage.setItem("uc", JSON.stringify(localCartItems));
  } else {
    localCartItems = localStorage.setItem(
      "uc",
      JSON.stringify({ products: [] })
    );
  }

  return dispatch({
    type: UPDATE_SIZE_FROM_LOCAL_STORAGE,
    payload: localCartItems
  });
};

export const updateSizeStatus = payload => dispatch => {
  return dispatch({
    type: UPDATE_SIZE_STATUS,
    payload
  });
};

export const updateMeasurementErrMsg = payload => dispatch => {
  return dispatch({
    type: UPDATE_MEASUREMENT_ERR_MSG,
    payload
  });
};
