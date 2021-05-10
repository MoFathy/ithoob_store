import fetch from "isomorphic-unfetch";

//getBannerSuccess func that takes the payload of getBanner request as a param
//and return action type (GET_BANNER_SUCCESS) and this payload
export const getBannerSuccess = payload => dispatch => {
    return dispatch({ type: "GET_BANNER_SUCCESS", payload });
  };

  //getBannerFail func that takes the payload of getBanner request as a param
  //and return action type (GET_BANNER_FAIL) and this payload
  export const getBannerFail = payload => dispatch => {
    return dispatch({
      type: "GET_BANNER_FAIL",
      payload
    });
  };

  //send post request to banner API with language as params
  export const getBanner = language => dispatch => {

    // return fetch("http://jsonstub.com/banner3", {
      return fetch(process.env.endpoint + "/api/banner", {

      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "JsonStub-User-Key": "083ffae4-f6e0-48f7-880e-ba8551e74448",
        // "JsonStub-Project-Key": "099f582d-d11e-4edb-8205-7e45b9490cca"
      },
      body: JSON.stringify({ language: language })
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === true) {
          dispatch(getBannerSuccess(data));
        } else {
          dispatch(getBannerFail(data));
        }
      })
      .catch(err => {
        // console.log(err);
        dispatch(
          getBannerFail({
            status: false,
            message: "Error in loading categories"
          })
        );
      });
  };
