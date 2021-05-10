import fetch from "isomorphic-unfetch";

import {
  GET_EDITS_SUCCESS,
  GET_EDITS_FAIL,
  UPDATE_SELECTED_COLOR_ID,
  UPDATE_SELECETED_IDS,
  UPDATE_CUSTOMS_SUCCESS,
  UPDATE_CUSTOMS_FAIL,
  UPDATE_CUSTOMS_CONTAINER_RENDER,
  UPDATE_CUSTOMS_STATUS_ACTION
} from "../actions-types";

export const updateCustomsContainerRender = payload => dispatch => {
  return dispatch({
    type: UPDATE_CUSTOMS_CONTAINER_RENDER,
    payload
  });
};

//getEditsSuccess func that takes the payload of getCartItems request as a param
//and return action type (GET_EDITS_SUCCESS) and this payload
export const getEditsSuccess = payload => dispatch => {
  return dispatch({
    type: GET_EDITS_SUCCESS,
    payload
  });
};

//getEditsFail func that takes the payload of getCartItems request as a param
//and return action type (GET_EDITS_FAIL) and this payload
export const getEditsFail = payload => dispatch => {
  return dispatch({
    type: GET_EDITS_FAIL,
    payload
  });
};

//send post request to profile API with language as params
export const getEdits = (language, authorization, productId) => dispatch => {
  return fetch(process.env.endpoint + "/api/item-edits", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization
    },
    body: JSON.stringify({
      language: language,
      productId: productId
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === true) {
        dispatch(getEditsSuccess(data));
      } else {
        dispatch(getEditsFail(data));
      }
    })
    .catch(err => {
      dispatch(
        getEditsFail({
          status: false,
          message: "Error in update item quantity from catch"
        })
      );
    });
};

//updateSelectedColorId func that takes the payload of getCartItems request as a param
//and return action type (UPDATE_SELECTED_COLOR_ID) and this payload
export const updateSelectedColorId = payload => dispatch => {
  return dispatch({
    type: UPDATE_SELECTED_COLOR_ID,
    payload
  });
};

//updateSelectedId func that takes the payload as a param
//and return action type (UPDATE_SELECETED_IDS) and this payload
export const updateSelectedId = payload => ({
  type: UPDATE_SELECETED_IDS,
  payload
});

//updateCustomsSuccess func that takes the payload of updateCustoms request as a param
//and return action type (UPDATE_CUSTOMS_SUCCESS) and this payload
export const updateCustomsSuccess = payload => dispatch => {
  return dispatch({
    type: UPDATE_CUSTOMS_SUCCESS,
    payload
  });
};

//updateCustomsFail func that takes the payload of updateCustoms request as a param
//and return action type (UPDATE_CUSTOMS_FAIL) and this payload
export const updateCustomsFail = payload => dispatch => {
  return dispatch({
    type: UPDATE_CUSTOMS_FAIL,
    payload
  });
};

//send post request to profile API with language as params
export const updateCustoms = (
  language,
  authorization,
  productId,
  selectedIds,
  selectedColorId
) => dispatch => {
  return fetch(process.env.endpoint + "/api/edit-cart-item", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization
    },
    body: JSON.stringify({
      language: language,
      productId: productId,
      selectedIds: [...selectedIds, selectedColorId]
      // fabric_customs: [selectedColorId]
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === true) {
        dispatch(updateCustomsSuccess(data));
      } else {
        dispatch(updateCustomsFail(data));
      }
    })
    .catch(err => {
      dispatch(
        updateCustomsFail({
          status: false,
          message: "Error in update item quantity from catch"
        })
      );
    });
};

export const getDefaultIdsFromLocalStorage = index => dispatch => {
  let localCartItems;
  if (localStorage.getItem("uc")) {
    localCartItems = JSON.parse(localStorage.getItem("uc"));
    dispatch(getEditsSuccess(localCartItems.products[index]));
    // localStorage.setItem("uc", JSON.stringify(localCartItems))
  }
};


export const updateItemsInLocalStorage = (index, selectedColorId, selectedIds) => dispatch => {
  let localCartItems;
  if (localStorage.getItem("uc")) {
    localCartItems = JSON.parse(localStorage.getItem("uc"));
    localCartItems.products[index].selectedColorId = selectedColorId;
    localCartItems.products[index].selectedIds = selectedIds;
    localStorage.setItem("uc", JSON.stringify(localCartItems))
  }
}

export const updateCustomsStatusAction = payload => dispatch => {
  return dispatch({
    type:  UPDATE_CUSTOMS_STATUS_ACTION,
    payload
  })
}