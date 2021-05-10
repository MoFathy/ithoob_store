import fetch from "isomorphic-unfetch";

//getHomeProductsSuccess func that takes the payload of getBanner request as a param
//and return action type (GET_BANNER_SUCCESS) and this payload
export const getHomeProductsSuccess = payload => dispatch => {
  return dispatch({
    type: "GET_HOME_PRODUCTS_SUCCESS",
    payload
  });
};

//getHomeProductsFail func that takes the payload of getHomeProducts request as a param
//and return action type (GET_BANNER_FAIL) and this payload
export const getHomeProductsFail = payload => dispatch => {
  return dispatch({
    type: "GET_HOME_PRODUCTS_FAIL",
    payload
  });
};

//send post request to home-products API with language as params
export const getHomeProducts = language => dispatch => {
  // return fetch("http://jsonstub.com/home-products", {
    // return fetch (process.env.endpoint . "/api/home-products", {
  return fetch(process.env.endpoint + "/api/home-products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
      //  "JsonStub-User-Key": "083ffae4-f6e0-48f7-880e-ba8551e74448",
      //     "JsonStub-Project-Key": "099f582d-d11e-4edb-8205-7e45b9490cca"
    },
    body: JSON.stringify({ language: language })
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === true) {
        dispatch(getHomeProductsSuccess(data));
      } else {
        dispatch(getHomeProductsFail(data));
      }
    })
    .catch(err => {
      // console.log(err);
      dispatch(
        getHomeProductsFail({
          status: false,
          message: "Error in loading categories"
        })
      );
    });
};