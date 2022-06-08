import fetch from "isomorphic-unfetch";

export const GET_ADDS_SUCCESS = 'GET_ADDS_SUCCESS';
export const GET_ADDS_FAIL = 'GET_ADDS_FAIL';
//send post request
export const getAdds = (language) => dispatch => {
    console.log('====================================');
    console.log(language);
    console.log('====================================');
    return fetch(process.env.endpoint + "/api/adds",{
      method:  "POST",
      headers:{
          'Content-Type': 'application/json',
          // 'JsonStub-User-Key': '3a323f5e-e6ee-4554-ba9c-6213cf6272d1',
          // 'JsonStub-Project-Key': '495ea768-7e38-409f-9b22-d571a8b24c9e'
      },
      body: JSON.stringify({
        language: language, type:"1"
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.status === true) {
        dispatch(getAddsSuccess(data));
      } else {
        dispatch(getAddsFail(data));
      }
    })
}

export const getAddsSuccess = (payload) => {
  return{
    type: GET_ADDS_SUCCESS,
    payload
  }
}

export const getAddsFail = (payload) => ({
    type: GET_ADDS_FAIL,
    payload
})
