import fetch from "isomorphic-unfetch";
import { updateBreadcrumb } from "../includes/breadcrumb";

import {
  GET_PRODUCT_LIST_SUCCESS,
  RESET_PRODUCT_LIST_SUCCESS,
  GET_PRODUCT_LIST_FAIL,
  UPDATE_PAGE_INDEX,
  UPDATE_CALLING_API_STATUS_WHILE_SCROLLING,
  UPDATE_LOADER,
  UPDATE_SCROLLING_LOADER,
  UPDATE_SLUG,
  INITIAL_PRODUCT_LIST
} from "../actions-types";

//getProductListSuccess func that takes the payload of getProductList request as a param
//and return action type (GET_PRODUCT_LIST_SUCCESS) and this payload
export const getProductListSuccess = payload => ({
  type: GET_PRODUCT_LIST_SUCCESS,
  payload
});

//getProductListSuccess func that takes the payload of getProductList request as a param
//and return action type (RESET_PRODUCT_LIST_SUCCESS) and this payload
export const resetProductListSuccess = payload => ({
  type: RESET_PRODUCT_LIST_SUCCESS,
  payload
});

//getProductListFail func that takes the payload of getBanner request as a param
//and return action type (GET_PRODUCT_LIST_FAIL) and this payload
export const getProductListFail = payload => ({
  type: GET_PRODUCT_LIST_FAIL,
  payload
});

//updatePageIndex func that takes newPageIndex as a param
//and return action type (UPDATE_PAGE_INDEX) and this newPageIndex
export const updatePageIndex = newPageIndex => ({
  type: UPDATE_PAGE_INDEX,
  newPageIndex
});

export const updateCallingApiStatusWhileScrollig = flag => ({
  type: UPDATE_CALLING_API_STATUS_WHILE_SCROLLING,
  flag
});

//send post request to product-list API with language and categoryId as params
export const getProductList = (
  language,
  pageIndex,
  pageSize,
  categorySlug
) => dispatch => {
  // return fetch(`http://jsonstub.com/product-list`, {
  initialProductList();
  return fetch(
    process.env.endpoint + `/api/product-list/${categorySlug}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        // "JsonStub-User-Key": "083ffae4-f6e0-48f7-880e-ba8551e74448",
        // "JsonStub-Project-Key": "099f582d-d11e-4edb-8205-7e45b9490cca"
      },
      body: JSON.stringify({
        language: language,
        pageIndex: pageIndex,
        pageSize: pageSize,
        categorySlug: categorySlug
      })
    }
  )
    .then(res => res.json())
    .then(data => {
      if (data.status === true) {
        dispatch(getProductListSuccess(data));
      } else {
        dispatch(getProductListFail(data));
      }
    })
    .catch(err => {
      dispatch(
        getProductListFail({
          status: false,
          message: "Error in loading product list from catch"
        })
      );
    });
};

//send post request to product-list API with language and categoryId as params
export const resetProductList = (
  language,
  pageIndex,
  pageSize,
  categorySlug
) => dispatch => {
  // return fetch(`http://jsonstub.com/product-list`, {
  return fetch(
    process.env.endpoint + `/api/product-list/${categorySlug}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        // "JsonStub-User-Key": "083ffae4-f6e0-48f7-880e-ba8551e74448",
        // "JsonStub-Project-Key": "099f582d-d11e-4edb-8205-7e45b9490cca"
      },
      body: JSON.stringify({
        language: language,
        pageIndex: pageIndex,
        pageSize: pageSize,
        categorySlug: categorySlug
      })
    }
  )
    .then(res => res.json())
    .then(data => {
      if (data.status === true) {
        dispatch(resetProductListSuccess(data));

        dispatch(updateBreadcrumb(data.breadcrumb));
      } else {
        dispatch(getProductListFail(data));
      }
    })
    .catch(err => {
      dispatch(
        getProductListFail({
          status: false,
          message: "Error in loading product list from catch"
        })
      );
    });
};

export const updateLoader = loading => ({
  type: UPDATE_LOADER,
  loading
});

export const updateScrollingLoader = scrollingLoader => ({
  type: UPDATE_SCROLLING_LOADER,
  scrollingLoader
});

export const updateSlug = query => ({
  type: UPDATE_SLUG,
  query
});

export const initialProductList = () => dispatch => {

  return dispatch({
    type: INITIAL_PRODUCT_LIST
  });
};
