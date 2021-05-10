import fetch from "isomorphic-unfetch";
//getHomeSectionsSuccess func that takes the payload of getHomeSections request as a param
//and return action type (GET_HOME_SECTIONS_SUCCESS) and this payload
export const getHomeSectionsSuccess = payload => dispatch => {
  return dispatch({
    type: "GET_HOME_SECTIONS_SUCCESS",
    payload
  });
};

//getHomeSectionsFail func that takes the payload of getHomeSections request as a param
//and return action type (GET_HOME_SECTIONS_FAIL) and this payload
export const getHomeSectionsFail = payload => dispatch => {
  return dispatch({
    type: "GET_HOME_SECTIONS_FAIL",
    payload
  });
};

//send post request to home-sections API with language as params
export const getHomeSections = language => dispatch => {
//   return fetch("http://jsonstub.com/home-sections", {
  return fetch(process.env.endpoint + "/api/home-sections", {
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
        dispatch(getHomeSectionsSuccess(data));
      } else {
        dispatch(getHomeSectionsFail(data));
      }
    })
    .catch(err => {
      // console.log(err);
      dispatch(
        getHomeSectionsFail({
          status: false,
          message: "Error in loading categories"
        })
      );
    });
};
