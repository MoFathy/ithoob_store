import fetch from "isomorphic-unfetch";
export const GET_ORDERS_SUCCESS = 'GET_ORDERS_SUCCES';
export const GET_ORDERS_FAIL = 'GET_ORDERS_FAIL';
export const CANCEL_ORDER_SUCCESS ='CANCEL_ORDER_SUCCESS';
export const CANCEL_ORDER_FAIL = 'CANCEL_ORDER_FAIL';
export const CANCEL_ORDER_POPUP = 'CANCEL_ORDER_POPUP';
export const ORDER_ITEM_EDITS_SUCCESS='ORDER_ITEM_EDITS_SUCCESS';
export const ORDER_ITEM_EDITS_FAIL='ORDER_ITEM_EDITS_FAIL';
export const MODIFICATION_POPUP='MODIFICATION_POPUP';
export const STORE_DEFAULT_IDS='STORE_DEFAULT_IDS';
export const CANCEL_ORDER_SUCESS_POPUP='CANCEL_ORDER_SUCESS_POPUP';
// export const NO_SIZE_MAN= 'NO_SIZE_MAN';

import {getCookie} from '../../scripts/getCookieFile';
import { CONFIRM_PAYMENT_FAIL, CONFIRM_PAYMENT_SUCCESS, UPDATE_ORDER_SUCCEEDED_POPUP } from "../actions-types";

// export const noSizeMan=() =>{
//   return{
//     type:NO_SIZE_MAN
//   }
// }
export const toggleCancelSuccessStatus= (value) =>{
  return{
    type:CANCEL_ORDER_SUCESS_POPUP,
    value
  }
}

export const storeDefaultIds= (defaults) => {
  return{
    type:STORE_DEFAULT_IDS,
    defaults
  }
}

export const modificationsPopup = (value,designed,edited,title) =>{
  return{
    type:MODIFICATION_POPUP,
    value,designed,edited,title
  }
}

//send post request
export const orderItemsEdit = (productId,lang,auth) => dispatch =>{
  return fetch(process.env.endpoint + "/api/order-item-edits",{
    method:  "POST",
    headers:{
        'Content-Type': 'application/json',
        "Authorization": auth
    },
    body: JSON.stringify({
      language: lang,
      productId:productId
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.status === true) {
      if(data.selectedIds )
      {
        var custom_defaults = data.selectedIds;
        }
    dispatch(storeDefaultIds(custom_defaults));
      dispatch(orderItemsEditSuccess(data));

    } else {
      dispatch(orderItemsEditFail(data));
    }
  })
};
export const orderItemsEditSuccess = (payload) => {
  return{
    type: ORDER_ITEM_EDITS_SUCCESS,
    payload
  }
}

export const orderItemsEditFail = (payload) => ({
    type: ORDER_ITEM_EDITS_FAIL,
    payload
})
export const paymentResponse = (query,language,auth) => dispatch => {
  console.log('====================================');
  console.log(query);
  console.log('====================================');
  return fetch(process.env.endpoint + "/api/payment_response",{
    method:  "POST",
    headers:{
        'Content-Type': 'application/json',
        "Authorization": auth
    },
    body: JSON.stringify({
      language: language,
      query:query
    })
  }).then(res => res.json())
  .then(data => {
    console.log(data);
    if (data.status === true) {
      console.log('====================================');
      console.log('====================================');
      console.log(data);
        dispatch(confirmPaymentSuccess(data));
        dispatch(updateOrderSucceededPopup(true));
    } else {
      dispatch(confirmPaymentFail(data));
    }
  })
  .catch(err => {
    dispatch(
      confirmPaymentFail({
        status: false,
        message: "Pyment Process Failed"
      })
    );
  });
}

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

export const updateOrderSucceededPopup = payload => dispatch => {
  return dispatch({
      type: UPDATE_ORDER_SUCCEEDED_POPUP,
      payload
  })
}

export const tabbyResponse = (query,language,auth) => dispatch => {
  console.log('====================================');
  console.log(query);
  console.log('====================================');
  return fetch(process.env.endpoint + "/api/tabby_response",{
    method:  "POST",
    headers:{
        'Content-Type': 'application/json',
        "Authorization": auth
    },
    body: JSON.stringify({
      language: language,
      query:query
    })
  }).then(res => res.json())
  .then(data => {
    console.log(data);
    if (data.status === true) {
      console.log('====================================');
      console.log('====================================');
      console.log(data);
        dispatch(confirmPaymentSuccess(data));
        dispatch(updateOrderSucceededPopup(true));
    } else {
      dispatch(confirmPaymentFail(data));
    }
  })
  .catch(err => {
    dispatch(
      confirmPaymentFail({
        status: false,
        message: "Pyment Process Failed"
      })
    );
  });
}

export const getOrders = (language,auth) => dispatch => {
    return fetch(process.env.endpoint + "/api/orders",{
      method:  "POST",
      headers:{
          'Content-Type': 'application/json',
          "Authorization": auth
      },
      body: JSON.stringify({
        language: language
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.status === true) {
        dispatch(getOrdersSuccess(data));
        // console.log('data',data.orders)
        // console.log(data.orders.every(order=>order.orderDetails.itemsOfOrders.every(product=>product.sizeManFlag == false)))
        // if(data.orders.every(order=>order.orderDetails.itemsOfOrders.every(product=>product.sizeManFlag == false))){
        //   dispatch(noSizeMan());
        // }
      } else {
        dispatch(getOrdersFail(data));
      }
    })
    .catch(err => {
      // console.log(err)
    })
};

export const getOrdersSuccess = (payload) => {
  return{
    type: GET_ORDERS_SUCCESS,
    payload
  }
}

export const getOrdersFail = (payload) => ({
    type: GET_ORDERS_FAIL,
    payload
})
export const cancelOrder = (orderNo,auth,lang) => dispatch => {
    return fetch(process.env.endpoint + "/api/cancel-order",{
      method:  "POST",
      headers:{
          'Content-Type': 'application/json',
          "Authorization": auth
      },
      body: JSON.stringify({
        orderNo: orderNo,
        language: lang
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.status === true) {
        dispatch(cancelOrderSuccess(data));
        dispatch(toggleCancelSuccessStatus(true));
        dispatch(getOrders(lang,getCookie('ithoobUser','authenticationToken')))
      } else {
        dispatch(cancelOrderFail(data));
      }
    })
};

export const cancelOrderSuccess = (payload) => {
  return{
    type: CANCEL_ORDER_SUCCESS,
    payload
  }
}

export const cancelOrderFail = (payload) => {
  return{
    type: CANCEL_ORDER_FAIL,
    payload
  }
}
export const cancelOrderPopUp = (value,orderStatus,orderNum) => {
    return{
    type:CANCEL_ORDER_POPUP,
    value,
    orderStatus,
    orderNum
  }
}
