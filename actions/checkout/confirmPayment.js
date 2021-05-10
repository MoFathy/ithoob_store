import fetch from "isomorphic-unfetch";

import {
  CONFIRM_PAYMENT_SUCCESS,
  CONFIRM_PAYMENT_FAIL,
  UPDATE_SHOW_CONFIRM_PAYMENT_POPUP,
  UPDATE_ORDER_SUCCEEDED_POPUP,
  CHANGE_DELIVERY_ADDRESS
} from "../actions-types";


export const changeDeliveryAddress = payload => dispatch => {
  return dispatch({
    type: CHANGE_DELIVERY_ADDRESS,
    payload
  });
};

//confirmPaymentSuccess func that takes the payload of confirmPayment request as a param
//and return action type (CONFIRM_PAYMENT_SUCCESS) and this payload
export const confirmPaymentSuccess = payload => dispatch => {
  return dispatch({
    type: CONFIRM_PAYMENT_SUCCESS,
    payload
  });
};

//confirmPaymentFail func that takes the payload of confirmPayment request as a param
//and return action type (CONFIRM_PAYMENT_FAIL) and this payload
export const confirmPaymentFail = payload => dispatch => {
  return dispatch({
    type: CONFIRM_PAYMENT_FAIL,
    payload
  });
};

//send post request to profile API with language, address, deliveryMethod and paymentMethod as params
export const confirmPayment = (language, authorization, address, deliveryMethod, paymentMethod, sizeManFlag, coupon_code, MDNDiscount = 0) => dispatch => {
  console.log(coupon_code);
    return fetch(process.env.endpoint + "/api/confirm-payment", {
  // return fetch("http://jsonstub.com/confirm-payment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // "JsonStub-User-Key": "083ffae4-f6e0-48f7-880e-ba8551e74448",
      // "JsonStub-Project-Key": "099f582d-d11e-4edb-8205-7e45b9490cca",
      Authorization: authorization
    },
    body: JSON.stringify({ language, address, deliveryMethod, paymentMethod, sizeManFlag, coupon_code, MDNDiscount })
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === true) {
        console.log('====================================');
        console.log('====================================');
        console.log(data);
        console.log(data.responseUrl)
        if(data.responseUrl){
          window.open(data.responseUrl, "_self");
        }else{
          dispatch(confirmPaymentSuccess(data));
          dispatch(updateOrderSucceededPopup(true));
        }
        console.log('====================================');
        console.log('====================================');
      } else {
        dispatch(confirmPaymentFail(data));
      }
    })
    .catch(err => {
      dispatch(
        confirmPaymentFail({
          status: false,
          message: "Error in loading confirm payment from catch"
        })
      );
    });
};

export const updateShowConfrimPaymentPopup = payload => dispatch => {
    return dispatch({
        type: UPDATE_SHOW_CONFIRM_PAYMENT_POPUP,
        payload
    })
}
export const updateOrderSucceededPopup = payload => dispatch => {
    return dispatch({
        type: UPDATE_ORDER_SUCCEEDED_POPUP,
        payload
    })
}
