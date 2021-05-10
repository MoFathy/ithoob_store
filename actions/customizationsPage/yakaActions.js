import fetch from "isomorphic-unfetch";

export const GET_YAKA_SUCCESS = 'GET_YAKA_SUCCESS';
export const GET_YAKA_FAIL = 'GET_YAKA_FAIL';
//send post request
export const getYaka = (language) => dispatch => {
    return fetch(process.env.endpoint + "/api/yaka",{
      method:  "POST",
      headers:{
          'Content-Type': 'application/json',
          // 'JsonStub-User-Key': '3a323f5e-e6ee-4554-ba9c-6213cf6272d1',
          // 'JsonStub-Project-Key': '495ea768-7e38-409f-9b22-d571a8b24c9e'
      },
      body: JSON.stringify({
        language: language,
				type:"1"
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.status === true) {
        dispatch(getYakaSuccess(data));
      } else {
        dispatch(getYakaFail(data));
      }
    })
}

export const getYakaSuccess = (payload) => {
  return{
    type: GET_YAKA_SUCCESS,
    payload
  }
}

export const getYakaFail = (payload) => ({
    type: GET_YAKA_FAIL,
    payload
})
