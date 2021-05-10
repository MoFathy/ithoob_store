import fetch from "isomorphic-unfetch";
export const GET_MEASUREMENT_SUCCESS = 'GET_MEASUREMENT_SUCCESS';
export const GET_MEASUREMENT_FAIL = 'GET_MEASUREMENT_FAIL';
//send post request
export const getMeasurments = (language,authorization) => dispatch => {
  if(authorization){
    return fetch(process.env.endpoint + "/api/measurmentslist",{
      method:  "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authorization
      },
      body: JSON.stringify({
        language: language
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.status === true) {
        dispatch(getMeasurementSuccess(data));
      } else {
        dispatch(getMeasurementFail(data));
      }
    })
  }else{
    // console.log("form getMeasurments no authorization");
    
  }

}

export const getMeasurementSuccess = (payload) => {
  return{
    type: GET_MEASUREMENT_SUCCESS,
    payload
  }
}
export const getMeasurementFail = (payload) => {
  return{
    type: GET_MEASUREMENT_FAIL,
    payload
  }
}
