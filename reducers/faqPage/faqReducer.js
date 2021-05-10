import { GET_FAQ_SUCCESS , GET_FAQ_FAIL } from '../../actions/faqPage/faqGetDataActions'

const faqPageInitialState= {
    faqStatus: '',
    faqData: {}
}

export default function (state= faqPageInitialState, action){
    switch (action.type) {
        case GET_FAQ_SUCCESS:
            return {...state,faqStatus: action.payload.status, faqData: {...action.payload}}
        case GET_FAQ_FAIL:
            return {...state,  faqStatus: action.payload.status}

        default:
            return state
    }
}
