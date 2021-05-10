import { GET_ABOUTITHOOB_SUCCESS,GET_WHYITHOOB_SUCCESS } from '../../actions/aboutPage/aboutGetDataActions'

const aboutPageInitialState= {
    aboutithoobStatus: '',
    whyithoobStatus:'',
    aboutIthoob: {},
    whyIthoob: {}
}

export default function (state= aboutPageInitialState, action){
    switch (action.type) {
        case GET_ABOUTITHOOB_SUCCESS:
            return {...state,aboutithoobStatus: action.payload.status, aboutIthoob: action.payload}
        // case GET_ABOUTITHOOB_FAIL:
            // return {...state,  status: action.payload.status}
        case GET_WHYITHOOB_SUCCESS:
            return {...state,whyithoobStatus: action.payload.status, whyIthoob: action.payload}
        // case GET_WHYITHOOB_FAIL:
            // return {...state,  status: action.payload.status}
        default:
            return state
    }
}
