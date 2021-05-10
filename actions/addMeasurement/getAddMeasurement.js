import fetch from "isomorphic-unfetch";
import {
  GET_ADD_MEASUREMENT_SUCCESS,
  GET_ADD_MEASUREMENT_FAIL,
  UPDATE_ACTIVE_ITEM_ID,
  GET_MEASUREMENT_DETAILS_SUCCESS,
  GET_MEASUREMENT_DETAILS_FAIL
} from "../actions-types";
// import { getFromProductDetailsSatus } from "../productDetails/productDetails";
// import Router from "next/router";
//getAddMeasurementSuccess func that takes the payload of getAddMeasurement request as a param
//and return action type (GET_ADD_MEASUREMENT_SUCCESS) and this payload
export const getAddMeasurementSuccess = payload => dispatch => {
  return dispatch({
    type: GET_ADD_MEASUREMENT_SUCCESS,
    payload
  });
};

//getAddMeasurementsFail func that takes the payload of getAddMeasurement request as a param
//and return action type (GET_ADD_MEASUREMENT_FAIL) and this payload
export const getAddMeasurementsFail = payload => dispatch => {
  return dispatch({
    type: GET_ADD_MEASUREMENT_FAIL,
    payload
  });
};

//send post request to addmeasure API with language as param
export const getAddMeasurement = language => dispatch => {
  return fetch(process.env.endpoint + "/api/addmeasure", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
      // Authorization: authorization
    },
    body: JSON.stringify({ language: language })
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === true) {
        dispatch(getAddMeasurementSuccess(data));
        // dispatch(getFromProductDetailsSatus());
      } else {
        dispatch(getAddMeasurementsFail(data));
      }
    })
    .catch(err => {
      dispatch(
        getAddMeasurementsFail({
          status: false,
          message: "Error in loading add measurement"
        })
      );
    });
};

export const getMeasurementDetailsSuccess = payload => dispatch => {
  return dispatch({
    type: GET_MEASUREMENT_DETAILS_SUCCESS,
    payload
  });
};

export const getMeasurementDetailsFail = payload => dispatch => {
  return dispatch({
    type: GET_MEASUREMENT_DETAILS_FAIL,
    payload
  });
};
export const getMeasurementDetails = (
  language,
  authorization,
  profileId
) => dispatch => {

  return fetch(process.env.endpoint + "/api/measurement-details", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization
    },
    body: JSON.stringify({ language: language, profileId: profileId })
  })
    .then(res => res.json())
    .then(data => {

      if (data.status === true) {
        dispatch(getMeasurementDetailsSuccess(data));
      } else {
        dispatch(getMeasurementDetailsFail(data));
      }
    })
    .catch(err => {
      dispatch(
        getMeasurementDetailsFail({
          status: false,
          message: "Error in loading get Measurement Details"
        })
      );
    });
};

//updatedActiveId func that takes id as a param
//and return action type (UPDATE_ACTIVE_ITEM_ID) and id
export const updateActiveItemId = id => dispatch => {
  return dispatch({
    type: UPDATE_ACTIVE_ITEM_ID,
    id
  });
};
