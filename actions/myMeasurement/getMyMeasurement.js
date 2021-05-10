import fetch from "isomorphic-unfetch";
import {
  GET_MEASUREMENT_LIST_SUCCESS,
  GET_MEASUREMENT_LIST_FAIL
} from "../actions-types";
//getMeasurementListSuccess func that takes the payload of getMeasurementList request as a param
//and return action type (GET_MEASUREMENT_LIST_SUCCESS) and this payload
export const getMeasurementListSuccess = payload => dispatch => {
  return dispatch({
    type: GET_MEASUREMENT_LIST_SUCCESS,
    payload
  });
};

//getMeasurementListFail func that takes the payload of getMeasurementList request as a param
//and return action type (GET_MEASUREMENT_LIST_FAIL) and this payload
export const getMeasurementListFail = payload => dispatch => {
  return dispatch({
    type: GET_MEASUREMENT_LIST_FAIL,
    payload
  });
};

//send post request to measurmentslist API with language as params
export const getMeasurementList = (language, Authorization) => dispatch => {
if(Authorization){
  return fetch(process.env.endpoint + "/api/measurmentslist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: Authorization
      // "JsonStub-User-Key": "083ffae4-f6e0-48f7-880e-ba8551e74448",
      // "JsonStub-Project-Key": "099f582d-d11e-4edb-8205-7e45b9490cca"
    },
    body: JSON.stringify({ language })
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === true) {
        dispatch(getMeasurementListSuccess(data));
      } else {
        dispatch(getMeasurementListFail(data));
      }
    })
    .catch(err => {
      dispatch(
        getMeasurementListFail({
          status: false,
          message: "Error in loading measurments list"
        })
      );
    });
  }else{
    // form getMeasurments no authorization
    
  }

};
