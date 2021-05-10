import { CONFIRM_PAYMENT_SUCCESS, REQUEST_TAILOR_POPUP_STATUS, REQUEST_TAILOR_SUCCESS, UPDATE_ORDER_SUCCEEDED_POPUP, UPDATE_TAILOR_REQUESTED_MODAL_DISPLAY } from "../actions-types";


export const requestTailorPopupToggle = payload => dispatch => {
    return dispatch({
      type: REQUEST_TAILOR_POPUP_STATUS,
      payload
    });
  };

  export const requestTailorSuccess = (payload) => dispatch => {
    return dispatch({
      type: REQUEST_TAILOR_SUCCESS,
      payload
    });
  };


  export const requestTailorFail = payload => dispatch => {
    return dispatch({
      type: REQUEST_TAILOR_SUCCESS,
      payload
    });
  };



export const updateTailorRequestedModalDisplay = payload => dispatch => {
  return dispatch({
    type: UPDATE_TAILOR_REQUESTED_MODAL_DISPLAY,
    payload
  });
};
  export const requestTailor = (language, user, data) => dispatch => {

    console.log(user);
    // return fetch("http://jsonstub.com/banner3", {
      return fetch(process.env.endpoint + "/api/request_tailor", {

      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: user
        // "JsonStub-User-Key": "083ffae4-f6e0-48f7-880e-ba8551e74448",
        // "JsonStub-Project-Key": "099f582d-d11e-4edb-8205-7e45b9490cca"
      },
      body: JSON.stringify({ language, ...data })
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === true) {
          dispatch(requestTailorSuccess(data));
        } else {
          dispatch(requestTailorFail({message : "لا يمكننا إتمام طلبك الأن من فضلك حاول لاحقا"}));
        }
      })
      .catch(err => {
        // console.log(err);
        dispatch(requestTailorFail({message : "لا يمكننا إتمام طلبك الأن من فضلك حاول لاحقا"}));
      });
  };