import fetch from "isomorphic-unfetch";
export const GET_ZARZOUR_SUCCESS = 'GET_ZARZOUR_SUCCESS';
export const GET_ZARZOUR_FAIL = 'GET_ZARZOUR_FAIL';
//send post request
export const getZarzour = (language) => dispatch => {
    return fetch(process.env.endpoint + "/api/yaka",{
      method:  "POST",
      headers:{
          'Content-Type': 'application/json',
          // 'JsonStub-User-Key': '3a323f5e-e6ee-4554-ba9c-6213cf6272d1',
          // 'JsonStub-Project-Key': '495ea768-7e38-409f-9b22-d571a8b24c9e'
      },
      body: JSON.stringify({
        language: language,
        type: "2"
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.status === true) {
        dispatch(getZarzourSuccess(data));
      } else {
        dispatch(getZarzourFail(data));
      }
    })
}

export const getZarzourSuccess = (payload) => {
  return{
    type: GET_ZARZOUR_SUCCESS,
    payload
  }
}

export const getZarzourFail = (payload) => ({
    type: GET_ZARZOUR_FAIL,
    payload
})
