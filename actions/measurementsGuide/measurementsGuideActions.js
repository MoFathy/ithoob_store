import fetch from "isomorphic-unfetch";
import {
  GET_MEASUREMENT_SUCCESS,
  GET_MEASUREMENT_FAIL
} from "../actions-types";
//getMeasurementsSuccess func that takes the payload of getMeasurements request as a param
//and return action type (GET_MEASUREMENT_SUCCESS) and this payload
export const getMeasurementsSuccess = payload => dispatch => {
  return dispatch({
    type: GET_MEASUREMENT_SUCCESS,
    payload
  });
};

//getMeasurementsFail func that takes the payload of getMeasurements request as a param
//and return action type (GET_MEASUREMENT_FAIL) and this payload
export const getMeasurementsFail = payload => dispatch => {
  return dispatch({
    type: GET_MEASUREMENT_FAIL,
    payload
  });
};

//send post request to measurements-guide API with language as params
export const getMeasurements = language => dispatch => {
  return fetch(process.env.endpoint + "/api/measurements-guide", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
      // "JsonStub-User-Key": "083ffae4-f6e0-48f7-880e-ba8551e74448",
      // "JsonStub-Project-Key": "099f582d-d11e-4edb-8205-7e45b9490cca"
    },
    body: JSON.stringify({ language: language })
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === true) {
        dispatch(getMeasurementsSuccess(data));
      } else {
        dispatch(getMeasurementsFail(data));
      }
    })
    .catch(err => {
      // console.log(err);
      dispatch(
        getMeasurementsFail({
          status: false,
          message: "Error in loading categories"
        })
      );
    });
};
