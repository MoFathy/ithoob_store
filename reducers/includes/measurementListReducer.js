import { MEASUREMENT_POPUP_STATUS} from '../../actions/includes/measurementsListActions'

const measurementsListInitialState= {
    measurementPopupStatus:false,
}

export default function (state= measurementsListInitialState, action){
    switch (action.type) {
        case MEASUREMENT_POPUP_STATUS:
            return {...state,measurementPopupStatus:!state.measurementPopupStatus}
        default:
            return state
    }
}
