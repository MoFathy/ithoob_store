import fetch from "isomorphic-unfetch";

import {
  GET_CHECKOUT_DATA_SUCCESS,
  GET_CHECKOUT_DATA_FAIL,
  UPDATE_DELIVERY_METHOD,
  UPDATE_ADDRESS,
  UPDATE_PAYMENT_METHOD,
  CHECK_FOR_COUPON,
  UPDATE_COUPON_SUCCESS,
  UPDATE_COUPON_FAILED
} from "../actions-types";

//getCheckoutDataSuccess func that takes the payload of getCheckoutData request as a param
//and return action type (GET_CHECKOUT_DATA_SUCCESS) and this payload
export const getCheckoutDataSuccess = payload => dispatch => {
  return dispatch({
    type: GET_CHECKOUT_DATA_SUCCESS,
    payload
  });
};

//getCheckoutDataFail func that takes the payload of getCheckoutData request as a param
//and return action type (GET_CHECKOUT_DATA_FAIL) and this payload
export const getCheckoutDataFail = payload => dispatch => {
  return dispatch({
    type: GET_CHECKOUT_DATA_FAIL,
    payload
  });
};

// chech for coupon discont
export const checkForCoupon = () => dispatch => {
  return dispatch({
    type: CHECK_FOR_COUPON
  });
};

export const checkForCouponSuccess = payload => dispatch => {
  return dispatch({
    type: UPDATE_COUPON_SUCCESS,
    payload
  });
};

export const checkForCouponFailed = payload => dispatch => {
  return dispatch({
    type: UPDATE_COUPON_FAILED,
    payload
  });
};

//send post request to profile API with language as params
// coupon discount and MDN PART IS TEMPROARY FOR AN EVENT
export const checkForCouponDiscount = (language, authorization, coupon_code, coupon_discount) => dispatch => {

  if(!coupon_code || coupon_code === ""){
    dispatch(checkForCouponFailed({message : "Please Insert The coupon Code"}));
    return;
  }
  dispatch(checkForCoupon);
  console.log(coupon_code);

  return fetch(process.env.endpoint + "/api/check_for_coupon", {
// return fetch("http://jsonstub.com/checkout", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: authorization
  },
  body: JSON.stringify({ language, coupon_code })
})
  .then(res => res.json())
  .then(data => {
    if (data.status === true) {
      if(data.coupon_discount){
        dispatch(checkForCouponSuccess(data));
      }else {
        dispatch(checkForCouponFailed(data));
      }
    } else {
      dispatch(checkForCouponFailed(data));
    }
  })
  .catch(err => {
    dispatch(
      checkForCouponFailed({
        status: false,
        message: "Error while checking for coupon."
      })
    );
  });
};

//send post request to profile API with language as params
export const getCheckoutData = (language, authorization) => dispatch => {
    return fetch(process.env.endpoint + "/api/checkout", {
  // return fetch("http://jsonstub.com/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // "JsonStub-User-Key": "083ffae4-f6e0-48f7-880e-ba8551e74448",
      // "JsonStub-Project-Key": "099f582d-d11e-4edb-8205-7e45b9490cca",
      Authorization: authorization
    },
    body: JSON.stringify({ language })
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === true) {
        dispatch(getCheckoutDataSuccess(data));
      } else {
        dispatch(getCheckoutDataFail(data));
      }
    })
    .catch(err => {
      dispatch(
        getCheckoutDataFail({
          status: false,
          message: "Error in loading cart items from catch"
        })
      );
    });
};

export const updatedeliveryMethod = payload => dispatch => {
  return dispatch({
    type: UPDATE_DELIVERY_METHOD,
    payload
  });
};

export const updateAddress = payload => dispatch => {
    return dispatch({
      type: UPDATE_ADDRESS,
      payload
    });
  };

  export const updatePaymentMethod = payload => dispatch => {
    return dispatch({
      type: UPDATE_PAYMENT_METHOD,
      payload
    });
  };



  