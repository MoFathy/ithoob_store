import { GET_POLICIES_SUCCESS } from '../../actions/privacyPolicy/getPoliciesActions'

const privacyPolicyInitialState= {
    privacyPolicyStatus: '',
    privacyPolicy: {}
}

export default function (state= privacyPolicyInitialState, action){
    switch (action.type) {
        case GET_POLICIES_SUCCESS:
            return {...state,privacyPolicyStatus: action.payload.status, privacyPolicy: action.payload}
        default:
            return state
    }
}
