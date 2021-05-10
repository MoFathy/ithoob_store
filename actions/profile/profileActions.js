import fetch from "isomorphic-unfetch";
import { cartInit } from "../../actions/header/cartHeader";
import {
  GET_Profile_Info_SUCCESS,
  GET_Profile_Info_FAIL,
  UPDATE_Profile_Info_SUCCESS,
  UPDATE_Profile_Info_FAIL,
  CHANG_PASSWORD_SUCCESS,
  CHANG_PASSWORD_FAIL,
  DELETE_MASSAGE,
  UPDATE_SUBMIT_STATUS
} from "../actions-types";

//getProfileInfoSuccess func that takes the payload of getProfileInfo request as a param
//and return action type (GET_Profile_Info_SUCCESS) and this payload
export const getProfileInfoSuccess = payload => dispatch => {
  return dispatch({
    type: GET_Profile_Info_SUCCESS,
    payload
  });
};

//getProfileInfoFail func that takes the payload of getProfileInfo request as a param
//and return action type (GET_Profile_Info_FAIL) and this payload
export const getProfileInfoFail = payload => dispatch => {

  return dispatch({
    type: GET_Profile_Info_FAIL,
    payload
  });
};

//send post request to profile API with language as params
export const getProfileInfo = (language, authorization) => dispatch => {
  return fetch(process.env.endpoint + "/api/profile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization
    },
    body: JSON.stringify({ language: language })
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === true) {
        dispatch(getProfileInfoSuccess(data));
      } else {
        dispatch(getProfileInfoFail(data));
        // Router.push('/')
      }
    })
    .catch(err => {
      dispatch(
        getProfileInfoFail({
          status: false,
          message: "Error in loading profile from catch"
        })
      );
      // Router.push('/')
    });
};




//updateProfileInfoSuccess func that takes the payload of updateProfileInfo request as a param
//and return action type (UPDATE_Profile_Info_SUCCESS) and this payload
export const updateProfileInfoSuccess = payload => dispatch => {
    return dispatch({
      type: UPDATE_Profile_Info_SUCCESS,
      payload
    });
  };

  //updateProfileInfoFail func that takes the payload of updateProfileInfo request as a param
  //and return action type (UPDATE_Profile_Info_FAIL) and this payload
  export const updateProfileInfoFail = payload => dispatch => {
    return dispatch({
      type: UPDATE_Profile_Info_FAIL,
      payload
    });
  };


//send post request to update-account API with language as params
export const updateProfileInfo = (
  language,
  authorization,
  name,
  address,
  areaId
) => dispatch => {
  return fetch(process.env.endpoint + "/api/update-account", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization
    },
    body: JSON.stringify({
      language: language,
      name: name,
      address: address,
      area: parseInt(areaId)
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === true) {
        dispatch(updateProfileInfoSuccess(data));
        dispatch(cartInit());
      } else {
        dispatch(updateProfileInfoFail(data));
      }
    })
    .catch(err => {
      dispatch(
        updateProfileInfoFail({
          status: false,
          message: "Error in loading profile from catch"
        })
      );
    });
};



//changePasswordSuccess func that takes the payload of updateProfileInfo request as a param
//and return action type (CHANG_PASSWORD_SUCCESS) and this payload
export const changePasswordSuccess = payload => dispatch => {
  return dispatch({
    type: CHANG_PASSWORD_SUCCESS,
    payload
  });
};

//changePasswordFail func that takes the payload of updateProfileInfo request as a param
//and return action type (CHANG_PASSWORD_FAIL) and this payload
export const changePasswordFail = payload => dispatch => {
  // Router.push('/')
  return dispatch({
    type: CHANG_PASSWORD_FAIL,
    payload
  });
};

//changePasswordFail func that takes the payload of updateProfileInfo request as a param
//and return action type (CHANG_PASSWORD_FAIL) and this payload
export const deleteMassage = () => dispatch => {
  return dispatch({
    type: DELETE_MASSAGE

  });
};

//send post request to change-password API with language as params
export const changePassword = (
  language,
  authorization,
  oldPassword,
  newPassword
) => dispatch => {
  return fetch(process.env.endpoint + "/api/change-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization
    },
    body: JSON.stringify({
      language: language,
      oldPassword: oldPassword,
      newPassword: newPassword
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === true) {
        dispatch(changePasswordSuccess(data));
      } else {
        dispatch(changePasswordFail(data));

      }
    })
    .catch(err => {
      dispatch(
        changePasswordFail({
          status: false,
          message: "Error in loading profile from catch"
        })
      );


    });
};

export const updateSubmitStatus = status => dispatch => {
return dispatch({
  type: UPDATE_SUBMIT_STATUS,
  status
})
}
