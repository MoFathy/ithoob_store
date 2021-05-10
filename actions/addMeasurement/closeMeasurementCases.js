import {
  UPDATE_CONFIRMATION_MODAL,
  UPDATE_SIZE_NAME_MODAL,
  UPDATE_SUCCESS_MODAL
} from "../actions-types";

export const updateConfirmationModal = status => dispatch => {
  return dispatch({
    type: UPDATE_CONFIRMATION_MODAL,
    status
  });
};

export const updateSizeNameModal = status => dispatch => {
  return dispatch({
    type: UPDATE_SIZE_NAME_MODAL,
    status
  });
};

export const updateSuccessModal = status => dispatch => {
  return dispatch({
    type: UPDATE_SUCCESS_MODAL,
    status
  });
};
