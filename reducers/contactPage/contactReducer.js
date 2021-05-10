import { GET_ITHOOBINFO_SUCCESS,GET_CONTACTUS_SUCCESS ,RESET_MSG_STATUS,ON_LOADING} from '../../actions/contactPage/contactUsActions'

const contactPageInitialState= {
    ithoobInfoStatus: 'false',
    contactUsStatus:false,
    contactIthoob: {},
    ithoobInfo: {},
    isloading:false
}

export default function (state= contactPageInitialState, action){
    switch (action.type) {
        case GET_ITHOOBINFO_SUCCESS:
            return {...state,ithoobInfoStatus: action.payload.status, ithoobInfo: action.payload}
        case GET_CONTACTUS_SUCCESS:
            return {...state,contactUsStatus: true, contactIthoob: action.payload}
        case RESET_MSG_STATUS:
          return {...state,contactUsStatus: action.value}
        case ON_LOADING:
          return {...state,isloading:action.loading}
        default:
            return state
    }
}
