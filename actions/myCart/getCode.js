import fetch from "isomorphic-unfetch";

import {
  GET_CODE_SUCCESS,
  GET_CODE_FAIL,
  GET_DISCOUNT_SUCCESS,
  GET_DISCOUNT_FAIL,
  ADD_PARTNER_DISCOUNT_ID_TO_LOCAL_STORAGE,
  GET_PARTNER_DISCOUNT_FROM_LOCAL_STORAGE,
  UPDATE_GET_CODE_STATUS_AND_GET_CODE_MESSAGE,
  UPDATE_DISCOUNT_STATUS_AND_DISCOUNT_MESSAGE,
  DELETE_PARTNER_DISCOUNT_FROM_LOCAL_STORAGE
} from "../actions-types";

//getCodeSuccess func that takes the payload of getCartItems request as a param
//and return action type (GET_CODE_SUCCESS) and this payload
export const getCodeSuccess = payload => dispatch => {
  return dispatch({
    type: GET_CODE_SUCCESS,
    payload
  });
};

//getCodeFail func that takes the payload of getCartItems request as a param
//and return action type (GET_CODE_FAIL) and this payload
export const getCodeFail = payload => dispatch => {
  return dispatch({
    type: GET_CODE_FAIL,
    payload
  });
};

//send post request to profile API with language as params
export const getCode = (language, email) => dispatch => {
  return fetch(process.env.endpoint + "/api/get-code", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ language: language, email: email })
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === true) {
        dispatch(getCodeSuccess(data));
      } else {
        dispatch(getCodeFail(data));
      }
    })
    .catch(err => {
      dispatch(
        getCodeFail({
          status: false,
          message: "Error in loading get code from catch"
        })
      );
    });
};

//getDiscountSuccess func that takes the payload of getCartItems request as a param
//and return action type (GET_DISCOUNT_SUCCESS) and this payload
export const getDiscountSuccess = payload => dispatch => {
  return dispatch({
    type: GET_DISCOUNT_SUCCESS,
    payload
  });
};

//getDiscountFail func that takes the payload of getCartItems request as a param
//and return action type (GET_DISCOUNT_FAIL) and this payload
export const getDiscountFail = payload => dispatch => {
  return dispatch({
    type: GET_DISCOUNT_FAIL,
    payload
  });
};

//send post request to profile API with language as params
export const getDiscount = (
  language,
  authorization,
  partnerCode
) => dispatch => {

  if (authorization) {
    return fetch(process.env.endpoint + "/api/partner-code-authed", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authorization
      },
      body: JSON.stringify({
        language: language,
        partnerCode: partnerCode
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === true) {
          dispatch(getDiscountSuccess(data));
        } else {
          dispatch(getDiscountFail(data));
        }
      })
      .catch(err => {
        dispatch(
          getDiscountFail({
            status: false,
            message: "Error in loading get discount from catch"
          })
        );
      });
  } else {
    return fetch(process.env.endpoint + "/api/partner-code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        language: language,
        partnerCode: partnerCode
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === true) {
          dispatch(getDiscountSuccess(data));
          dispatch(
            addPartnerDiscountIDToLocalStorage(
              data.partnerCodeId,
              data.partnerDiscount
            )
          );
        } else {
          dispatch(getDiscountFail(data));
        }
      })
      .catch(err => {
        dispatch(
          getDiscountFail({
            status: false,
            message: "Error in loading get discount from catch"
          })
        );
      });
  }
};

export const addPartnerDiscountIDToLocalStorage = (
  id,
  discount
) => dispatch => {
  let partnerDiscountInLocalStorage = {};
  partnerDiscountInLocalStorage.partnerdiscountId = id;
  partnerDiscountInLocalStorage.partnerDiscount = discount;

  localStorage.setItem(
    "pd",
    JSON.stringify(partnerDiscountInLocalStorage)
  );

  return dispatch({
    type: ADD_PARTNER_DISCOUNT_ID_TO_LOCAL_STORAGE,
    payload: partnerDiscountInLocalStorage
  });
};

export const getPartnerDiscountFromLocalStorage = () => dispatch => {
  let partnerDiscountInLocalStorage = {};
  if (localStorage.getItem("pd")) {
    partnerDiscountInLocalStorage = JSON.parse(localStorage.getItem("pd"));
  }
  return dispatch({
    type: GET_PARTNER_DISCOUNT_FROM_LOCAL_STORAGE,
    payload: partnerDiscountInLocalStorage
  });
};


export const deletePartnerDiscountLocalStorage = () => dispatch => {
  let partnerDiscountInLocalStorage = { partnerdiscountId: 0, partnerDiscount: 0 };

  if (localStorage.getItem("pd")) {
    localStorage.setItem(
      "pd",
      JSON.stringify({ partnerdiscountId: 0, partnerDiscount: 0 })
    );
  } else {
    localStorage.setItem(
      "pd",
      JSON.stringify({ partnerdiscountId: 0, partnerDiscount: 0 })
    );
  }

  return dispatch({
    type: DELETE_PARTNER_DISCOUNT_FROM_LOCAL_STORAGE,
    payload: partnerDiscountInLocalStorage
  });
}

export const updateGetCodeStatusAndGetCodeMessage = (status,message) => dispatch => {
  return dispatch({
    type: UPDATE_GET_CODE_STATUS_AND_GET_CODE_MESSAGE,
    status:status,
    message: message
  })
} 

export const updateDiscountStatusAndDiscountMessage = (status,message) => dispatch => {
  return dispatch({
    type: UPDATE_DISCOUNT_STATUS_AND_DISCOUNT_MESSAGE,
    status:status,
    message: message
  })
} 