import fetch from "isomorphic-unfetch";
import { updateBreadcrumb } from "../includes/breadcrumb";
import {
  UPDATE_SHOES_SIZE_STATUS,
  UPDATE_SIZE_FAIL,
  UPDATE_FROM_PRODUCT_DETAILS,
  GET_FROM_PRODUCT_DETAILS
} from "../actions-types";

//getProductDetailsSuccess func that takes the payload of getProductList request as a param
//and return action type (GET_PRODUCT_DETAILS_SUCCESS) and this payload
export const getProductDetailsSuccess = payload => ({
  type: "GET_PRODUCT_DETAILS_SUCCESS",
  payload
});

//getProductDetailsFail func that takes the payload of getProductDetails request as a param
//and return action type (GET_PRODUCT_DETAILS_FAIL) and this payload
export const getProductDetailsFail = payload => ({
  type: "GET_PRODUCT_DETAILS_FAIL",
  payload
});

//send post request to product-details API with language and categorySlug as params
export const getProductDetails = (language, categorySlug) => dispatch => {
  return fetch(
    process.env.endpoint + `/api/product-details/${categorySlug}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        // "JsonStub-User-Key": "083ffae4-f6e0-48f7-880e-ba8551e74448",
        // "JsonStub-Project-Key": "099f582d-d11e-4edb-8205-7e45b9490cca"
      },
      body: JSON.stringify({
        language: language
        // categorySlug: categorySlug
      })
    }
  )
    .then(res => res.json())
    .then(data => {
      if (data.status === true) {
        dispatch(getProductDetailsSuccess(data));
        dispatch(updateBreadcrumb(data.breadcrumb));
      } else {
        dispatch(getProductDetailsFail(data));
      }
    })
    .catch(err => {
      dispatch(
        getProductDetailsFail({
          status: false,
          message: "Error in loading product list from catch"
        })
      );
    });
};

export const updateQuantity = newQuantity => ({
  type: "UPDATE_QUANTITY",
  newQuantity
});

export const updateColor = colorId => ({
  type: "UPDATE_COLOR",
  colorId
});

export const getDefaultIds = defaultIds => ({
  type: "GET_DEFAULT_IDS",
  defaultIds
});

export const addSelectedIds = (id, others) => ({
  type: "ADD_SELECTED_ID",
  id,
  others
});

export const updateMaxQuantity = MaxQuantity => ({
  type: "UPDATE_MAX_QUANTITY",
  MaxQuantity
});

export const updateShoesSizeStatus = status => dispatch => {
  return dispatch({
    type: UPDATE_SHOES_SIZE_STATUS,
    status
  });
};
export const updateFromProductDetails = (
  status,
  querySlug,
  fromMyCartStatus
) => dispatch => {
  let localFromProductDetailsStatus = {
    fromProductDetailsStatus: status,
    query: querySlug,
    fromMyCartStatus: fromMyCartStatus
  };

  if (localStorage.getItem("localFromProductDetailsStatus")) {
    localFromProductDetailsStatus = JSON.parse(
      localStorage.getItem("localFromProductDetailsStatus")
    );
  } else {
    localStorage.setItem(
      "localFromProductDetailsStatus",
      JSON.stringify(localFromProductDetailsStatus)
    );
  }

  return dispatch({
    type: UPDATE_FROM_PRODUCT_DETAILS,
    status: localFromProductDetailsStatus.fromProductDetailsStatus,
    query: localFromProductDetailsStatus.query,
    fromMyCartStatus: localFromProductDetailsStatus.fromMyCartStatus
  });
};

export const getFromProductDetailsSatus = () => dispatch => {

  let localFromProductDetailsStatus = {
    fromProductDetailsStatus: false,
    query: { slug: "" },
    fromMyCartStatus: false
  };
  if (localStorage.getItem("localFromProductDetailsStatus")) {
    localFromProductDetailsStatus = JSON.parse(
      localStorage.getItem("localFromProductDetailsStatus")
    );
  } else {
    localStorage.setItem(
      "localFromProductDetailsStatus",
      JSON.stringify(localFromProductDetailsStatus)
    );
  }

  return dispatch({
    type: GET_FROM_PRODUCT_DETAILS,
    status: localFromProductDetailsStatus.fromProductDetailsStatus,
    query: localFromProductDetailsStatus.query,
    fromMyCartStatus: localFromProductDetailsStatus.fromMyCartStatus
  });
};

export const deleteFromProductDetailsSatus = () => dispatch => {
  let localFromProductDetailsStatus = {
    fromProductDetailsStatus: false,
    query: { slug: "" },
    fromMyCartStatus: false
  };
  if (localStorage.getItem("localFromProductDetailsStatus")) {
    localStorage.setItem(
      "localFromProductDetailsStatus",
      JSON.stringify(localFromProductDetailsStatus)
    );
  }
  return dispatch({
    type: UPDATE_FROM_PRODUCT_DETAILS,
    status: localFromProductDetailsStatus.fromProductDetailsStatus,
    query: localFromProductDetailsStatus.query,
    fromMyCartStatus: localFromProductDetailsStatus.fromMyCartStatus
  });
};
