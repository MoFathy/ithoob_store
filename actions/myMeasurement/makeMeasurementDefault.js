import fetch from "isomorphic-unfetch";
import {
  UPDATE_DEFAULT_MEASUREMENT_SUCCESS,
  UPDATE_DEFAULT_MEASUREMENT_FAIL,
  RESET_DEFAULT_MEASUREMENT
} from "../actions-types";
//updateDefaultMeasurementSuccess func that takes the payload of getMeasurementList request as a param
//and return action type (UPDATE_DEFAULT_MEASUREMENT_SUCCESS) and this payload
export const updateDefaultMeasurementSuccess = payload => dispatch => {
  return dispatch({
    type: UPDATE_DEFAULT_MEASUREMENT_SUCCESS,
    payload
  });
};

//updateDefaultMeasurementFail func that takes the payload of getMeasurementList request as a param
//and return action type (UPDATE_DEFAULT_MEASUREMENT_FAIL) and this payload
export const updateDefaultMeasurementFail = payload => dispatch => {
  return dispatch({
    type: UPDATE_DEFAULT_MEASUREMENT_FAIL,
    payload
  });
};

//send post request to defaultmeasurement API
export const updateDefaultMeasurement = (
  language,
  Authorization,
  profileId
) => dispatch => {
  return fetch(process.env.endpoint + "/api/defaultmeasurement", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: Authorization
      // "JsonStub-User-Key": "083ffae4-f6e0-48f7-880e-ba8551e74448",
      // "JsonStub-Project-Key": "099f582d-d11e-4edb-8205-7e45b9490cca"
    },
    body: JSON.stringify({ language, profileId })
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === true) {
        dispatch(updateDefaultMeasurementSuccess(data));
      } else {
        dispatch(updateDefaultMeasurementFail(data));
      }
    })
    .catch(err => {
      dispatch(
        updateDefaultMeasurementFail({
          status: false,
          message: "Error in loading default measurement"
        })
      );
    });
};

export const resetDefaultMeasurementStatus = stasus => dispatch => {
  return dispatch({
    type: RESET_DEFAULT_MEASUREMENT,
    stasus
  });
};
