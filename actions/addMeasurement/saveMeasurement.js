import fetch from "isomorphic-unfetch";
import Router from "next/router";
import {
  SAVE_MEASUREMENT_SUCCESS,
  SAVE_MEASUREMENT_FAIL,
  UPDATE_DATA_IS_CHANGED_STATUS,
  UPDATE_SIZE_FILE_NAME,
  UPDATE_CARRUNT_VALUES
} from "../actions-types";
import { updateSuccessModal } from "../addMeasurement/closeMeasurementCases";
import { getAddMeasurementsFail } from "./getAddMeasurement";
import { deleteFromProductDetailsSatus } from "../productDetails/productDetails";
//saveMeasurementSuccess func that takes the payload of saveMeasurement request as a param
//and return action type (SAVE_MEASUREMENT_SUCCESS) and this payload
export const saveMeasurementSuccess = payload => dispatch => {
  return dispatch({
    type: SAVE_MEASUREMENT_SUCCESS,
    payload
  });
};

//saveMeasurementsFail func that takes the payload of saveMeasurement request as a param
//and return action type (SAVE_MEASUREMENT_FAIL) and this payload
export const saveMeasurementsFail = payload => dispatch => {
  return dispatch({
    type: SAVE_MEASUREMENT_FAIL,
    payload
  });
};

//send post request to savemeasure API
export const saveMeasurement = (
  language,
  authorization,
  fileName,
  val1,
  val2,
  val3,
  val4,
  val5,
  val6,
  val7,
  fromProductDetails,
  slug,
  fromMyCart
) => dispatch => {
  return fetch(process.env.endpoint + "/api/savemeasure", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization
    },
    body: JSON.stringify({
      language: language,
      fileName: fileName,
      measurementsInputs: {
        value1: val1,
        value2: val2,
        value3: val3,
        value4: val4,
        value5: val5,
        value6: val6,
        value7: val7
      }
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === true) {
        dispatch(saveMeasurementSuccess(data));
        window.location = document.referrer;
        // if (
        //   fromProductDetails != undefined &&
        //   fromProductDetails == true &&
        //   slug != undefined
        // ) {
        //   console.log("push to product details");

        //   Router.push(`/product-details/${slug}`);
        //   console.log("updateFromProductDetails");

        //   dispatch(deleteFromProductDetailsSatus());
        // } else if (fromMyCart != undefined && fromMyCart == true) {
        //   Router.push(`/my-cart`);
        //   dispatch(deleteFromProductDetailsSatus());
        // } else {
        //   Router.push("/my-measurments");
        //   console.log("push to my measurement");
        // }
      } else {
        dispatch(saveMeasurementsFail(data));
        dispatch(updateSuccessModal(true));
      }
    })
    .catch(err => {
      dispatch(
        getAddMeasurementsFail({
          status: false,
          message: "Error in loading categories"
        })
      );
    });
};

export const updateDataIsChangedStatus = status => dispatch => {
  return dispatch({
    type: UPDATE_DATA_IS_CHANGED_STATUS,
    status
  });
};
export const updateSizeFileName = name => dispatch => {
  return dispatch({
    type: UPDATE_SIZE_FILE_NAME,
    name
  });
};

//send post request to edit measurement API
export const editMeasurement = (
  language,
  authorization,
  profileId,
  name,
  val1,
  val2,
  val3,
  val4,
  val5,
  val6,
  val7
) => dispatch => {
  return fetch(process.env.endpoint + "/api/edit-measurement", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization
    },
    body: JSON.stringify({
      language: language,
      profileId: profileId,
      name: name,
      value1: val1,
      value2: val2,
      value3: val3,
      value4: val4,
      value5: val5,
      value6: val6,
      value7: val7
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === true) {
        dispatch(saveMeasurementSuccess(data));
        Router.push("/my-measurments");
      } else {
        dispatch(saveMeasurementsFail(data));
      }
    })
    .catch(err => {
      dispatch(
        getAddMeasurementsFail({
          status: false,
          message: "Error in loading categories"
        })
      );
    });
};

export const updateCurrentValues = (val, minVal, maxVal) => dispatch => {
  return dispatch({
    type: UPDATE_CARRUNT_VALUES,
    currentValues: {
      val,
      minVal,
      maxVal
    }
  });
};
