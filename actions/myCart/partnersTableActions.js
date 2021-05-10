import { UPDATE_PARTNER_TABLE_DISPLAY_STATUS, GET_PARTNERS_SUCCESS, GET_PARTNERS_FAIL } from "../actions-types";
import fetch from "isomorphic-unfetch";
//updatePartnersTableDisplayStatus func that takes the payload of getCartItems request as a param
//and return action type (UPDATE_PARTNER_TABLE_DISPLAY_STATUS) and this payload
export const updatePartnersTableDisplayStatus = payload => dispatch => {
    return dispatch({
      type: UPDATE_PARTNER_TABLE_DISPLAY_STATUS,
      payload
    });
  };
//   partnersTableDisplayStatus




//getPartnersSuccess func that takes the payload of getCartItems request as a param
//and return action type (GET_PARTNERS_SUCCESS) and this payload
export const getPartnersSuccess = payload => dispatch => {
  return dispatch({
    type: GET_PARTNERS_SUCCESS,
    payload
  });
};

//getPartnersFail func that takes the payload of getCartItems request as a param
//and return action type (GET_PARTNERS_FAIL) and this payload
export const getPartnersFail = payload => dispatch => {
  return dispatch({
    type: GET_PARTNERS_FAIL,
    payload
  });
};

//send post request to profile API with language as params
export const getPartners = () => dispatch => {
  return fetch(process.env.endpoint + "/api/partners-list"
  // , {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: authorization
  //   },
  //   body: JSON.stringify({ language: language })
  // }
  
  )
    .then(res => res.json())
    .then(data => {
      if (data.status === true) {
        dispatch(getPartnersSuccess(data));
      } else {
        dispatch(getPartnersFail(data));
      }
    })
    .catch(err => {
      dispatch(
        getPartnersFail({
          status: false,
          message: "Error in loading cart items from catch"
        })
      );
    });
};