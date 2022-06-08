import {GET_ORDERS_SUCCESS, GET_ORDERS_FAIL,CANCEL_ORDER_SUCCESS,CANCEL_ORDER_FAIL,CANCEL_ORDER_POPUP,
ORDER_ITEM_EDITS_FAIL , ORDER_ITEM_EDITS_SUCCESS,MODIFICATION_POPUP,STORE_DEFAULT_IDS,CANCEL_ORDER_SUCESS_POPUP} from '../../actions/ordersPage/ordersActions';
//,NO_SIZE_MAN

const ordersInitialState= {
    ordersStatus: false,
    ordersObject: {},
    ordersArray:[],
    cancelStatus:false,
    cancelPopup:false,
    popupOrderNum:null,
    orderPopupstatus:"",
    orderEdits:{},
    modificatinPopUp:false,
    orderTitle:"",
    orderDesigned:false,
    orderEdited:false,
    defaultIds:[],
    cancelSuccessPopup:false,
    branchNumber:"",
    coupon_code: null,
    coupon_discount: 0,
    coupon_discount_type: "",
    // noSizeMan:false
}

export default function (state= ordersInitialState, action){
    switch (action.type) {
        // case NO_SIZE_MAN:
        //     return {...state,noSizeMan:true}
        case CANCEL_ORDER_SUCESS_POPUP:
            return {...state,cancelSuccessPopup:action.value}
        case STORE_DEFAULT_IDS:
            return {...state,defaultIds:action.defaults}
        case GET_ORDERS_SUCCESS:
            return {...state,ordersArray:action.payload.orders,ordersStatus:action.payload.status,ordersObject:action.payload}
        case GET_ORDERS_FAIL:
            return {...state,}
        case CANCEL_ORDER_SUCCESS:
            return {...state,cancelPopup:false,cancelStatus:action.payload.status,branchNumber:action.payload.branch.number}
        case CANCEL_ORDER_FAIL:
            return {...state,cancelStatus:action.payload.status}
        case CANCEL_ORDER_POPUP:
            return {...state,orderDesigned:action.value === false? false :state.orderDesigned
                            ,orderEdited:action.value === false? false :state.orderEdited
                            ,cancelPopup:action.value,orderPopupstatus:action.value === false? "" : action.orderStatus
                            ,popupOrderNum:action.value === false? null :action.orderNum}
                            // ,cancelStatus:action.value === false ? false : state.cancelStatus}
        case ORDER_ITEM_EDITS_SUCCESS:
            return {...state,orderEdits:action.payload}
        case MODIFICATION_POPUP:
            return {...state,modificatinPopUp:action.value,orderTitle:action.title,
                              orderDesigned:action.designed,orderEdited:action.edited,orderEdits:{}}
        default:
            return state
    }
}
