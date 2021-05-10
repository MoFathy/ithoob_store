import {
  GET_CHECKOUT_DATA_SUCCESS,
  GET_CHECKOUT_DATA_FAIL,
  UPDATE_DELIVERY_METHOD,
  UPDATE_ADDRESS,
  UPDATE_PAYMENT_METHOD,
  UPDATE_SHOW_CONFIRM_PAYMENT_POPUP,
  UPDATE_ORDER_SUCCEEDED_POPUP,
  CONFIRM_PAYMENT_SUCCESS,
  CONFIRM_PAYMENT_FAIL,
  CHECK_FOR_COUPON,
  UPDATE_COUPON_SUCCESS,
  UPDATE_COUPON_FAILED,
  CHANGE_DELIVERY_ADDRESS
} from "../../actions/actions-types";

const checkoutInitialState = {
  delivery: "",
  address: "",
  branch: {},
  sizeManFlag: false,
  status: false,
  orderSummary: {},
  bankTransfer: [],
  isloading: false,
  message: "",
  userDiscount: 0,
  partnerDiscount: 0,
  address: "",
  deliveryMethod: "homeDelivery",
  paymentMethod: "creditCard",
  showConfrimPaymentPopup: false,
  showOrderSucceededPopup: false,
  orderNo: "",
  confirmationStatus: false,
  confirmationMessage: "",
  coupon_code: "",
  coupon_loading: false,
  coupon_discount: "",
  coupone_message: "",
  deliveryAddress : {
    region : "الرياض",
    street : "",
    milestone : "",
    naighborhood : "",
    details : "",
    from : "",
    to : "",
  }
};

export default function(state = checkoutInitialState, action) {
  switch (action.type) {
    case CHANGE_DELIVERY_ADDRESS:
      return {
        ...state,
        deliveryAddress : action.payload
      };
    case GET_CHECKOUT_DATA_SUCCESS:
      return {
        ...state,
        delivery: action.payload.delivery,
        address: action.payload.address,
        branch: action.payload.branch,
        sizeManFlag: action.payload.sizeManFlag,
        status: action.payload.status,
        orderSummary: action.payload.orderSummary,
        bankTransfer: action.payload.bankTransfer,
        userDiscount: action.payload.userDiscount,
        partnerDiscount: action.payload.partnerDiscount,
        sizeManFlag: action.payload.sizeManFlag,
        isloading: false
      };
    case GET_CHECKOUT_DATA_FAIL:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message,
        isloading: false
      };
    case UPDATE_ADDRESS:
      return {
        ...state,
        address: action.payload
      };
    case UPDATE_DELIVERY_METHOD:
      return {
        ...state,
        deliveryMethod: action.payload
      };
    case UPDATE_PAYMENT_METHOD:
      console.log(action.payload)
      return {
        ...state,
        paymentMethod: action.payload
      };
    case UPDATE_SHOW_CONFIRM_PAYMENT_POPUP:
      return {
        ...state,
        showConfrimPaymentPopup: action.payload
      };
    case UPDATE_ORDER_SUCCEEDED_POPUP:
      return {
        ...state,
        showOrderSucceededPopup: action.payload
      };
      case CONFIRM_PAYMENT_SUCCESS:
      return{
        ...state,
        confirmationStatus:action.payload.status,
        orderNo: action.payload.orderNo,
        responseUrl: action.payload.responseUrl
      }
      case CONFIRM_PAYMENT_FAIL:
      return{
        ...state,
        confirmationStatus:action.payload.status,
        confirmationMessage:action.payload.message
      }
      case CHECK_FOR_COUPON:
      return{
        ...state,
        coupon_loading: true
      }
      case UPDATE_COUPON_SUCCESS:
      return{
        ...state,
        coupon_code: action.payload.coupon_code,
        coupon_discount: action.payload.coupon_discount,
        coupone_message: "",
        coupon_loading: false
      }
      case UPDATE_COUPON_FAILED:
      console.log(action.payload);
      return{
        ...state,
        coupon_code: "",
        coupon_discount: "",
        coupone_message: action.payload.message,
        coupon_loading: false
      }
      default:
      return state;
  }
}
