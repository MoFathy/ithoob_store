import fetch from "isomorphic-unfetch";

//getcategoriesSuccess func that takes the payload of getcategories request as a param
//and return action type (GET_CATEGORIES_SUCCESS) and this payload
export const getcategoriesSuccess = payload => dispatch => {
  return dispatch({
    type: "GET_CATEGORIES_SUCCESS",
    payload
  });
};

//getcategoriesFail func that takes the payload of getcategories request as a param
//and return action type (GET_CATEGORIES_FAIL) and this payload
export const getcategoriesFail = payload => dispatch => {
  return dispatch({
    type: "GET_CATEGORIES_FAIL",
    payload
  });
};

//send post request to categories API with language as params
export const getcategories = language => dispatch => {
  return fetch(process.env.endpoint + "/api/categories", {
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
        dispatch(getcategoriesSuccess(data));
      } else {
        dispatch(getcategoriesFail(data));
      }
    })
    .catch(err => {
      // console.log(err);
      dispatch(
        getcategoriesFail({
          status: false,
          message: "Error in loading categories"
        })
      );
    });
};

export const setActiveMenu = url => dispatch => {
  return dispatch({
    type: "SET_ACTIVE_MENU",
    url
  });
}
