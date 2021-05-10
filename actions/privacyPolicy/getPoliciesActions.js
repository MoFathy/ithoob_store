import fetch from "isomorphic-unfetch";
export const GET_POLICIES_SUCCESS = "GET_ABOUTITHOOB_SUCCES";
export const GET_ABOUTITHOOB_FAIL = "GET_ABOUTITHOOB_FAIL";
export const GET_WHYITHOOB_SUCCESS = "GET_WHYITHOOB_SUCCES";
export const GET_WHYITHOOB_FAIL = "GET_WHYITHOOB_FAIL";
//send post request
export const getPolicies = (language) => dispatch => {
  // return fetch(`http://jsonstub.com/aboutithoob`, {
  return fetch(process.env.endpoint + "/api/privacy_policy", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "JsonStub-User-Key": "3a323f5e-e6ee-4554-ba9c-6213cf6272d1",
      "JsonStub-Project-Key": "495ea768-7e38-409f-9b22-d571a8b24c9e",
      // Authorization: authorization
    },
    body: JSON.stringify({
      language: language
    })
  })
    .then(res => res.json())
    .then(data => {
        console.log(data);
      if (data.status === true) {
        dispatch(getPoliciesSuccess(data));
      } else {
        dispatch(getPoliciesFail(data));
      }
    });
};

export const getPoliciesSuccess = payload => {
  return {
    type: GET_POLICIES_SUCCESS,
    payload
  };
};

export const getPoliciesFail = payload => ({
  type: GET_ABOUTITHOOB_FAIL,
  payload
});

//send post request
export const getWhyIthoob = (language) => dispatch => {
  return fetch(process.env.endpoint + "/api/privacy_policy", {
    // return fetch(`http://jsonstub.com/whyithoob`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // "JsonStub-User-Key": "3a323f5e-e6ee-4554-ba9c-6213cf6272d1",
      // "JsonStub-Project-Key": "495ea768-7e38-409f-9b22-d571a8b24c9e",
      // Authorization: authorization
    },
    body: JSON.stringify({
      language: language
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === true) {
        dispatch(getWhyIthoobSuccess(data));
      } else {
        dispatch(getWhyIthoobFail(data));
      }
    });
};

export const getWhyIthoobSuccess = payload => {
  return {
    type: GET_WHYITHOOB_SUCCESS,
    payload
  };
};

export const getWhyIthoobFail = payload => ({
  type: GET_WHYITHOOB_FAIL,
  payload
});
