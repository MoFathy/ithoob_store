import fetch from "isomorphic-unfetch";
export const GET_ITHOOBINFO_SUCCESS = "GET_ITHOOBINFO_SUCCESS";
export const GET_ITHOOBINFO_FAIL = "GET_ITHOOBINFO_FAIL";
export const GET_CONTACTUS_SUCCESS = "GET_CONTACTUS_SUCCESS";
export const GET_CONTACTUS_FAIL = "GET_CONTACTUS_FAIL";
export const RESET_MSG_STATUS = "RESET_MSG_STATUS";
export const ON_LOADING = "ON_LOADING";

export const resetMessageStatus = (value) => {

  return {
    type: RESET_MSG_STATUS,
    value
  };
};
export const onLoading = loading => ({
  type: ON_LOADING,
  loading
});
//send post request
export const getIthoobInfo = language => dispatch => {
  // return fetch(`http://jsonstub.com/contactInfo`,{
  return fetch(process.env.endpoint + "/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
      // "JsonStub-User-Key": "3a323f5e-e6ee-4554-ba9c-6213cf6272d1",
      // "JsonStub-Project-Key": "495ea768-7e38-409f-9b22-d571a8b24c9e"
    },
    body: JSON.stringify({
      language: language
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === true) {
        dispatch(getIthoobInfoSuccess(data));
      } else {
        dispatch(getIthoobInfoFail(data));
      }
    });
};

export const getIthoobInfoSuccess = payload => {
  return {
    type: GET_ITHOOBINFO_SUCCESS,
    payload
  };
};

export const getIthoobInfoFail = payload => ({
  type: GET_ITHOOBINFO_FAIL,
  payload
});

export const getContactUs = (
  language,
  name,
  email,
  mobile,
  message
) => dispatch => {
  dispatch(onLoading(true));
  return fetch(process.env.endpoint + "/api/contactUs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
      // "JsonStub-User-Key": "3a323f5e-e6ee-4554-ba9c-6213cf6272d1",
      // "JsonStub-Project-Key": "495ea768-7e38-409f-9b22-d571a8b24c9e"
    },
    body: JSON.stringify({
      language: language,
      name: name,
      email: email,
      mobile: mobile,
      message: message
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === true) {
        dispatch(onLoading(false));
        dispatch(getContactUsSuccess(data));

      } else {
        dispatch(getContactUsFail(data));
      }
    });
};

export const getContactUsSuccess = payload => {
  return {
    type: GET_CONTACTUS_SUCCESS,
    payload
  };
};

export const getContactUsFail = payload => ({
  type: GET_CONTACTUS_FAIL,
  payload
});
