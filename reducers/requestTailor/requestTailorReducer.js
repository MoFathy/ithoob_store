import { REQUEST_TAILOR_FAIL, REQUEST_TAILOR_POPUP_STATUS, REQUEST_TAILOR_SUCCESS, UPDATE_TAILOR_REQUESTED_MODAL_DISPLAY } from "../../actions/actions-types";


const requestTailorIntialStatus = {
    requestTailorPopupStatus : false,
    requestTailorMessage : "",
    requestTailorSuccessPopUpStatus: false,
    orderNo:""
}

export default function(state =requestTailorIntialStatus, action){
    switch (action.type) {
        case REQUEST_TAILOR_POPUP_STATUS:
            return {
                ...state,
                requestTailorPopupStatus : action.payload,
            }
            break;
        case REQUEST_TAILOR_SUCCESS:
            return {
                ...state,
                requestTailorPopupStatus : false,
                orderNo:action.payload.orderNo,
                requestTailorSuccessPopUpStatus: true,
            }
        case REQUEST_TAILOR_FAIL:
            return {
                ...state,
                requestTailorMessage : action.payload.message,
            }
        case UPDATE_TAILOR_REQUESTED_MODAL_DISPLAY:
            return {
                ...state,
                requestTailorSuccessPopUpStatus : false,
            }
        default:
            return state;
    }
}