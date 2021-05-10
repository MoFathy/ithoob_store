import { TOGGLE_FPW_POPUP,FPW_REQUEST_SUCCESS,FPW_REQUEST_FAIL,TOGGLE_SUCCESS_POPUP,TOGGLE_CHANGEPW_POPUP, CHANGEPW_SUCCESS ,CHANGEPW_FAIL,TOGGLE_CHANGEPW_STATUS } from '../../actions/fpwPopUp/fpwActions'


const loginInitialState= {
  fpwPopUpStatus:false,
  emailRequestStatus:false,
  fpwMsg:"",
  fpwContent:"",
  changePwMsg:"",
  changePwPopupStatus:false,
  changePwReqStatus:false


}

export default function (state= loginInitialState, action){
    switch (action.type) {
        case TOGGLE_FPW_POPUP:
            return {...state,fpwPopUpStatus:action.value,fpwMsg:(action.value === false? "" :state.fpwMsg)}
        case FPW_REQUEST_SUCCESS:
            return {...state,emailRequestStatus:action.data.status,fpwMsg:action.data.message,fpwContent:action.data.content}
        case FPW_REQUEST_FAIL:
            return {...state,emailRequestStatus:action.data.status,fpwMsg:action.data.message}
        case TOGGLE_SUCCESS_POPUP:
            return {...state,emailRequestStatus:!state.emailRequestStatus,fpwMsg:state.emailRequestStatus ===true ?"":state.fpwMsg}
        case TOGGLE_CHANGEPW_POPUP:
            return {...state,changePwPopupStatus:!state.changePwPopupStatus}
        case CHANGEPW_SUCCESS:
            return {...state,changePwReqStatus:action.data.status,changePwMsg:action.data.message}
        case CHANGEPW_FAIL:
            return {...state,changePwReqStatus:action.data.status,changePwMsg:action.data.message}
        case TOGGLE_CHANGEPW_STATUS :
            return {...state,changePwReqStatus:!state.changePwReqStatus}
        default:
            return state
    }
}
