import fetch from "isomorphic-unfetch";
export const GET_FAQ_SUCCESS = "GET_FAQ_SUCCES";
export const GET_FAQ_FAIL = "GET_FAQ_FAIL";
//send post request
export const getFaq = (language) => dispatch => {
  // return fetch("http://jsonstub.com/faq", {
    return fetch(process.env.endpoint + "/api/faq",{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // "JsonStub-User-Key": "3a323f5e-e6ee-4554-ba9c-6213cf6272d1",
      // "JsonStub-Project-Key": "495ea768-7e38-409f-9b22-d571a8b24c9e"
      // Authorization: authorization
    },
    body: JSON.stringify({ language })
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === true) {
        dispatch(getFaqSuccess(data));
      } else {
        dispatch(getFaqFail(data));
      }
    });
};

export const getFaqSuccess = payload => {
  return {
    type: GET_FAQ_SUCCESS,
    payload
  };
};

export const getFaqFail = payload => ({
  type: GET_FAQ_FAIL,
  payload
});
