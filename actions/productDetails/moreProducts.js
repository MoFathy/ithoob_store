import fetch from "isomorphic-unfetch";

//getMoreProductsSuccess func that takes the payload of getBanner request as a param
//and return action type (GET_MORE_PRODUCTS_SUCCESS) and this payload
export const getMoreProductsSuccess = payload => dispatch => {
  return dispatch({
    type: "GET_MORE_PRODUCTS_SUCCESS",
    payload
  });
};

//getMoreProductsFail func that takes the payload of getHomeProducts request as a param
//and return action type (GET_MORE_PRODUCTS_FAIL) and this payload
export const getMoreProductsFail = payload => dispatch => {
  return dispatch({
    type: "GET_MORE_PRODUCTS_FAIL",
    payload
  });
};

//send post request to product-details-athwab API with language as params
export const getMoreProducts = (language, slug) => dispatch => {
  return fetch(process.env.endpoint + `/api/related-products/${slug}`, {
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
        dispatch(getMoreProductsSuccess(data));
      } else {
        dispatch(getMoreProductsFail(data));
      }
    })
    .catch(err => {
      dispatch(
        getMoreProductsFail({
          status: false,
          message: "Error in loading product"
        })
      );
    });
};
export const toggleProductStatus = (flag) => ({
	type:"TOGGLE_PRODUCT_STATUS",
	flag
})
