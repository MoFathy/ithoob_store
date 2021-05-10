import { GET_BANNER_SUCCESS, GET_BANNER_FAIL} from '../../actions/actions-types';

const bannerInitialState = {
    language: 2,
    // categoryId: 0,
    data: [],
    status: false,
    message: ''
}


export default function (state = bannerInitialState, action){
    switch (action.type) {
        case GET_BANNER_SUCCESS:        
            return {
                ...state,
                data: action.payload.data,
                status: action.payload.status,
            }
        case GET_BANNER_FAIL:
            return {
                ...state,
                status: action.payload.status,
                message: action.payload.message
            }
        default:
            return state;
    }
}