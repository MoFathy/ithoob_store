import fetch from "isomorphic-unfetch";
export const GET_AKMAM_SUCCESS = 'GET_AKMAM_SUCCESS';
export const GET_AKMAM_FAIL = 'GET_AKMAM_FAIL';
//send post request
export const getAkmam = (language) => dispatch => {
    return fetch(process.env.endpoint + "/api/akmam",{
      method:  "POST",
      headers:{
          'Content-Type': 'application/json',
          // 'JsonStub-User-Key': '3a323f5e-e6ee-4554-ba9c-6213cf6272d1',
          // 'JsonStub-Project-Key': '495ea768-7e38-409f-9b22-d571a8b24c9e'
      },
      body: JSON.stringify({
        language: language
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.status === true) {
        dispatch(getAkmamSuccess(data));
      } else {
        dispatch(getAkmamFail(data));
      }
    })
}

export const getAkmamSuccess = (payload) => {
  return{
    type: GET_AKMAM_SUCCESS,
    payload
  }
}

export const getAkmamFail = (payload) => ({
    type: GET_AKMAM_FAIL,
    payload
})
