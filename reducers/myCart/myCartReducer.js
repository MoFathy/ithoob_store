import {
  GET_CART_ITEMS_SUCCESS,
  GET_CART_ITEMS_FAIL,
  UPDATE_QUANTITY_SUCCESS,
  UPDATE_QUANTITY_FAIL,
  UPDATE_EDIT_SIZE_DISPLAY_STATUS,
  UPDATE_SIZE_SUCCESS,
  UPDATE_SIZE_FAIL,
  GET_EDITS_SUCCESS,
  GET_EDITS_FAIL,
  GET_CODE_SUCCESS,
  GET_CODE_FAIL,
  UPDATE_PARTNER_TABLE_DISPLAY_STATUS,
  UPDATE_SELECTED_COLOR_ID,
  UPDATE_SELECETED_IDS,
  UPDATE_CUSTOMS_SUCCESS,
  UPDATE_CUSTOMS_FAIL,
  GET_DISCOUNT_SUCCESS,
  GET_DISCOUNT_FAIL,
  GET_CART_ITEMS_FROM_LOCAL_STORAGE,
  DELETE_ITEM_FROM_LOCAL_STORAGE,
  UPDATE_QUANTITY_FROM_LOCAL_STORAGE,
  UPDATE_CUSTOMS_CONTAINER_RENDER,
  UPDATE_EDIT_SIZE_RENDER,
  GET_PARTNERS_SUCCESS,
  GET_PARTNERS_FAIL,
  UPDATE_CUSTOMS_STATUS_ACTION,
  UPDATE_SIZE_FROM_LOCAL_STORAGE,
  ADD_PARTNER_DISCOUNT_ID_TO_LOCAL_STORAGE,
  GET_PARTNER_DISCOUNT_FROM_LOCAL_STORAGE,
  UPDATE_DELETED_ITEM_ID,
  UPDATE_DELETED_ITEM_INDEX,
  UPDATE_DELETED_ITEM_TITLE,
  UPDATE_DELETE_CONFIRMED_MODAL_DISPLAY,
  UPDSTE_ERR_MSG_STATUS,
  UPDATE_MEASUREMENTS_IS_COMPLATE_STATUS,
  UPDATE_SIZE_STATUS,
  UPDATE_GET_CODE_STATUS_AND_GET_CODE_MESSAGE,
  UPDATE_DISCOUNT_STATUS_AND_DISCOUNT_MESSAGE,
  DELETE_CART_ITEMS_FROM_LOCAL_STORAGE,
  FROM_CART_TO_EDITCUSTOMS_STATUS,
  DELETE_PARTNER_DISCOUNT_FROM_LOCAL_STORAGE,
  UPDATE_MEASUREMENT_ERR_MSG,
  UPDATE_IS_LOADING_STATUS,
  UPDATE_REDIRECT_TO_CHECKOUT,
  CLEAR_CART
} from "../../actions/actions-types";

const myCartInitialState = {
  language: 2,
  status: false,
  message: "",
  isLoading: true,
  orderSummary: {},
  items: [],
  partnerTable: [],
  notEnough: false,
  quantityStatus: false,
  quantityMessage: "",
  sizeStatus: false,
  sizeMassage: "",

  editsstatus: false,
  editsMassage: "",
  colors: [],
  customs: [],

  getCodeStatus: false,
  getCodeMessage: "",

  partnersTableDisplayStatus: false,
  getEidtsIsLoading: true,
  selectedIds: [],
  selectedColorId: 0,
  updateCustomsStatus: false,
  updateCustomsMessage: "",
  discountStatus: false,
  discountMessage: "",
  partnerDiscount: 0,
  partnerCodeId: 0,
  userDiscount: 0,
  total: 0,
  customsContainerIsRendered: false,
  editSizeIsRendered: false,
  partnerTableStatus: false,
  partnerTableMessage: "",
  closeBtnIsShown: true,
  deletedItemId: -1,
  deletedItemIndex: -1,
  deletedItemTitle: "",
  deleteConfirmedStatus: false,
  errMsgStatus: false,
  measurementsIsComplate: true,
  fromCartToEditCustomsStatus: false,
  allSizesComplete: true,
  outOfCoverage:false,
  hasUnavailableItem: false,
  measurementErrMsg: "",
  savedSizes: [],
  redirectToChechout: false
};

export default function(state = myCartInitialState, action) {
  switch (action.type) {
    case GET_CART_ITEMS_FROM_LOCAL_STORAGE:
    case DELETE_ITEM_FROM_LOCAL_STORAGE:
    case UPDATE_QUANTITY_FROM_LOCAL_STORAGE:
    case UPDATE_SIZE_FROM_LOCAL_STORAGE:
      // case DELETE_CART_ITEMS_FROM_LOCAL_STORAGE:
      return {
        ...state,
        isLoading: false,
        items:
          action.payload || action.payload.products
            ? action.payload.products
            : []
      };
    case GET_CART_ITEMS_SUCCESS:
      return {
        ...state,
        status: action.payload.status,
        isLoading: false,
        orderSummary: action.payload.orderSummary,
        userDiscount: action.payload.orderSummary.userDiscount,
        items: action.payload.items,
        partnerTable: action.payload.partnerTable,
        allSizesComplete: action.payload.allSizesComplete,
        outOfCoverage:action.payload.outOfCoverage,
        hasUnavailableItem:action.payload.hasUnavailableItem,
        savedSizes: action.payload.savedSizes
      };
    case GET_CART_ITEMS_FAIL:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message,
        isLoading: false
      };
    case UPDATE_QUANTITY_SUCCESS:
      return {
        ...state,
        quantityStatus: action.payload.status,
        isLoading: false
      };
    case UPDATE_QUANTITY_FAIL:
      return {
        ...state,
        quantityStatus: action.payload.status,
        quantityMessage: action.payload.message,
        notEnough: action.payload.notEnough,
        isLoading: false
      };
    case UPDATE_SIZE_SUCCESS:
      return {
        ...state,
        sizeStatus: action.payload.status,
        // message: action.payload.message,
        isLoading: false
      };
    case UPDATE_SIZE_FAIL:
      return {
        ...state,
        sizeStatus: action.payload.status,
        sizeMassage: action.payload.message,
        isLoading: false
      };
    case GET_EDITS_SUCCESS:
      return {
        ...state,
        editsstatus: action.payload.status,
        colors: action.payload.colors,
        customs: action.payload.customs,
        selectedIds: action.payload.selectedIds,
        selectedColorId: action.payload.selectedColorId,
        isLoading: false,
        getEidtsIsLoading: false
      };
    case GET_EDITS_FAIL:
      return {
        ...state,
        editsstatus: action.payload.status,
        editsMassage: action.payload.message,
        isLoading: false,
        getEidtsIsLoading: false
      };
    case GET_CODE_SUCCESS:
    case GET_CODE_FAIL:
      return {
        ...state,
        getCodeStatus: action.payload.status,
        getCodeMessage: action.payload.message,
        isLoading: false
      };
    case UPDATE_PARTNER_TABLE_DISPLAY_STATUS:
      return {
        ...state,
        partnersTableDisplayStatus: action.payload
      };
    case UPDATE_SELECTED_COLOR_ID:
      return {
        ...state,
        selectedColorId: action.payload
      };
    case UPDATE_SELECETED_IDS:
      return {
        ...state,
        selectedIds: action.payload
      };
    case UPDATE_CUSTOMS_SUCCESS:
      return {
        ...state,
        updateCustomsStatus: action.payload.status
      };
    case UPDATE_CUSTOMS_FAIL:
      return {
        ...state,
        updateCustomsStatus: action.payload.status,
        updateCustomsMessage: action.payload.message
      };
    case GET_DISCOUNT_SUCCESS:
      return {
        ...state,
        discountStatus: action.payload.status,
        discountMessage: action.payload.message,
        partnerDiscount: action.payload.partnerDiscount,
        partnerCodeId: action.payload.partnerCodeId
      };
    case GET_DISCOUNT_FAIL:
      return {
        ...state,
        discountStatus: action.payload.status,
        discountMessage: action.payload.message
      };
    // case DELETE_ITEM_FROM_LOCAL_STORAGE:
    // return {
    //   ...state,
    //   items: action.payload.products
    // };
    case UPDATE_CUSTOMS_CONTAINER_RENDER:
      return {
        ...state,
        customsContainerIsRendered: action.payload
      };
    case UPDATE_EDIT_SIZE_RENDER:
      return {
        ...state,
        editSizeIsRendered: action.payload
      };
    case GET_PARTNERS_SUCCESS:
      return {
        ...state,
        partnerTable: action.payload.partners,
        partnerTableStatus: action.payload.status
      };

    case GET_PARTNERS_FAIL:
      return {
        ...state,
        partnerTableStatus: action.payload.status,
        partnerTableMessage: action.payload.message
      };
    case UPDATE_CUSTOMS_STATUS_ACTION:
      return {
        ...state,
        updateCustomsStatus: action.payload
      };
    case ADD_PARTNER_DISCOUNT_ID_TO_LOCAL_STORAGE:
    case GET_PARTNER_DISCOUNT_FROM_LOCAL_STORAGE:
      return {
        ...state,
        partnerDiscount:
          action.payload.partnerDiscount || action.payload
            ? action.payload.partnerDiscount
            : 0
      };
    case DELETE_PARTNER_DISCOUNT_FROM_LOCAL_STORAGE:
      return {
        ...state,
        partnerDiscount: action.payload.partnerDiscount
      };
    case UPDATE_DELETED_ITEM_ID:
      return {
        ...state,
        deletedItemId: action.payload
      };
    case UPDATE_DELETED_ITEM_INDEX:
      return {
        ...state,
        deletedItemIndex: action.payload
      };
    case UPDATE_DELETED_ITEM_TITLE:
      return {
        ...state,
        deletedItemTitle: action.payload
      };
    case UPDATE_DELETE_CONFIRMED_MODAL_DISPLAY:
      return {
        ...state,
        deleteConfirmedStatus: action.payload
      };
    case UPDSTE_ERR_MSG_STATUS:
      return {
        ...state,
        errMsgStatus: action.status
      };
    case UPDATE_MEASUREMENTS_IS_COMPLATE_STATUS:
      return {
        ...state,
        measurementsIsComplate: action.status
      };
    case UPDATE_SIZE_STATUS:
      return {
        ...state,
        sizeStatus: action.payload
      };

    case UPDATE_GET_CODE_STATUS_AND_GET_CODE_MESSAGE:
      return {
        ...state,
        getCodeStatus: action.status,
        getCodeMessage: action.message
      };

    case UPDATE_DISCOUNT_STATUS_AND_DISCOUNT_MESSAGE:
      return {
        ...state,
        discountStatus: action.status,
        discountMessage: action.message
      };
    case DELETE_CART_ITEMS_FROM_LOCAL_STORAGE:
      return {
        ...state,
        items: action.payload.products
      };
    case FROM_CART_TO_EDITCUSTOMS_STATUS:
      return {
        ...state,
        fromCartToEditCustomsStatus: !state.fromCartToEditCustomsStatus
      };
    case UPDATE_MEASUREMENT_ERR_MSG:
      return {
        ...state,
        measurementErrMsg: action.payload
      };
    case UPDATE_IS_LOADING_STATUS:
      return {
        ...state,
        isloading: action.status
      };
    case UPDATE_REDIRECT_TO_CHECKOUT:
      return {
        ...state,
        redirectToChechout: action.status
      };
    case CLEAR_CART:
      return {
        ...state,
        language: 2,
        status: false,
        message: "",
        isLoading: true,
        orderSummary: {},
        items: [],
        partnerTable: [],

        quantityStatus: false,
        quantityMessage: "",
        sizeStatus: false,
        sizeMassage: "",

        editsstatus: false,
        editsMassage: "",
        colors: [],
        customs: [],

        getCodeStatus: false,
        getCodeMessage: "",

        partnersTableDisplayStatus: false,
        getEidtsIsLoading: true,
        selectedIds: [],
        selectedColorId: 0,
        updateCustomsStatus: false,
        updateCustomsMessage: "",
        discountStatus: false,
        discountMessage: "",
        partnerDiscount: 0,
        partnerCodeId: 0,
        userDiscount: 0,
        total: 0,
        customsContainerIsRendered: false,
        editSizeIsRendered: false,
        partnerTableStatus: false,
        partnerTableMessage: "",
        closeBtnIsShown: true,
        deletedItemId: -1,
        deletedItemIndex: -1,
        deletedItemTitle: "",
        deleteConfirmedStatus: false,
        errMsgStatus: false,
        measurementsIsComplate: true,
        fromCartToEditCustomsStatus: false,
        allSizesComplete: true,
        measurementErrMsg: "",
        savedSizes: [],
        redirectToChechout: false
      };
    default:
      return state;
  }
}
