import {
  STORE__FABRICS,
  STORE__YAKA,
  STORE__ZARZOUR,
  STORE__AKMAM,
  STORE__OTHERS,
  DECREMENT__QUANTITY,
  INCREMENT__QUANTITY,
  STORE__SIZEID,
  SIZEMAN__STATUS,
  STORE_MEASUREID,
  CHANGE_SHOES_SIZE,
  STORE_FABRIC_IMAGES,
  OTHERS_HEADER_IMAGES,
  AKMAM_HEADER_IMAGES,
  ZARZOUR_HEADER_IMAGES,
  YAKA_HEADER_IMAGES,
  FABRIC_HEADER_IMAGES,
  RESET_PRESENT_DATA,
  UPDATE_SIZEMAN__STATUS
} from "../../../actions/includes/carouselActions";
import {
  GET_DEFAULT_SUCCESS,
  GET_DEFAULT_FAIL,
  UPDATE_DEFAULTS_LOCALLY
} from "../../../actions/customizationsPage/othersActions";

const carouselInitialState = {
  fabricArray: [],
  yakaArray: [],
  zarzourArray: [],
  akmamArray: [],
  othersArray: [],
  measurementsObject: {},
  quantity: 1,
  measurementId: "",
  sizeManStatus: false,
  sizeId: "",
  fabricCost: 0,
  yakaCost: 0,
  zarzourCost: 0,
  akmamCost: 0,
  othersCost: 0,
  fabricSelectedImages: [],
  yakaSelectedImages: [],
  zarzourSelectedImages: [],
  akmamSelectedImages: [],
  othersSelectedImages: [],
  fabricRequired: true,
  yakaRequired: true,
  zarzourRequired: true,
  akmamRequired: true,
  othersRequired: true,
  recomBetana: "",
  customtype: "",
  shoesSize: "",
  loadImagesNow: false,
  textNote: ""
};

export default function(state = carouselInitialState, action) {
  switch (action.type) {
    case RESET_PRESENT_DATA:
      return {
        ...state,
        fabricArray: [],
        yakaArray: [],
        zarzourArray: [],
        akmamArray: [],
        othersArray: [],
        measurementsObject: {},
        quantity: 1,
        measurementId: "",
        sizeManStatus: false,
        sizeId: "",
        fabricCost: 0,
        yakaCost: 0,
        zarzourCost: 0,
        akmamCost: 0,
        othersCost: 0,
        fabricSelectedImages: [],
        yakaSelectedImages: [],
        zarzourSelectedImages: [],
        akmamSelectedImages: [],
        othersSelectedImages: [],
        fabricRequired: true,
        yakaRequired: true,
        zarzourRequired: true,
        akmamRequired: true,
        othersRequired: true,
        recomBetana: "",
        customtype: "",
        shoesSize: "",
        loadImagesNow: false
      };
    case UPDATE_DEFAULTS_LOCALLY:
      return {
        ...state,
        fabricArray: action.defaults.fabrics,
        yakaArray: action.defaults.yaka,
        zarzourArray: action.defaults.zarzour,
        quantity: action.defaults.quantity,
        akmamArray: action.defaults.akmam,
        othersArray: action.defaults.others,
        sizeManStatus: action.defaults.sizeManFlag,
        sizeId: action.defaults.size,
        textNote: action.defaults.notes
      };
    case STORE_FABRIC_IMAGES:
      return { ...state, fabricSelectedImages: action.fabricImages };
    case GET_DEFAULT_SUCCESS:
      return {
        ...state,
        fabricArray: action.data.fabric_custom,
        yakaArray: action.data.yaka_custom,
        zarzourArray: action.data.zarzour_custom,
        akmamArray: action.data.akmam_custom,
        othersArray: action.data.others_custom,
        loadImagesNow: true,
        quantity: action.data.quantity,
        sizeId: action.data.size !== "" ? action.data.size : state.sizeId,
        sizeManStatus:
          action.data.sizeMan !== undefined
            ? action.data.sizeMan
            : state.sizeMan,
        measurementId:
          action.data.measurementId !== undefined
            ? action.data.measurementId
            : state.measurmentId
      };
    case STORE__FABRICS:
      return {
        ...state,
        fabricArray: action.fabricsArray,
        fabricCost: action.cost,
        fabricSelectedImages: action.imagesIds,
        fabricRequired: action.required
      };
    case STORE__YAKA:
      //|| (action.recomBetana == ""  && state.recomBetana !== "")
      return {
        ...state,
        yakaArray: action.yakaArray,
        yakaCost: action.cost,
        yakaSelectedImages: action.imagesIds,
        yakaRequired: action.required,
        recomBetana:
          state.recomBetana === ""
            ? action.recomBetana
            : state.recomBetana == action.recomBetana &&
              state.customtype == action.customtype
            ? state.recomBetana
            : state.customtype == action.customtype
            ? action.recomBetana
            : state.recomBetana,
        customtype:
          state.customtype == "" ? action.customtype : state.customtype
      };
    case STORE__ZARZOUR:
      return {
        ...state,
        zarzourArray: action.zarzourArray,
        zarzourCost: action.cost,
        zarzourSelectedImages: action.imagesIds,
        zarzourRequired: action.required,
        recomBetana:
          state.recomBetana === ""
            ? action.recomBetana
            : state.recomBetana == action.recomBetana &&
              state.customtype == action.customtype
            ? state.recomBetana
            : state.customtype == action.customtype
            ? action.recomBetana
            : state.recomBetana,
        customtype:
          state.customtype == "" ? action.customtype : state.customtype
      };
    case STORE__AKMAM:
      return {
        ...state,
        akmamArray: action.akmamArray,
        akmamCost: action.cost,
        akmamSelectedImages: action.imagesIds,
        akmamRequired: action.required,
        recomBetana:
          state.recomBetana === ""
            ? action.recomBetana
            : state.recomBetana == action.recomBetana &&
              state.customtype == action.customtype
            ? state.recomBetana
            : state.customtype == action.customtype
            ? action.recomBetana
            : state.recomBetana,
        customtype:
          state.customtype == "" ? action.customtype : state.customtype
      };
    case STORE__OTHERS:
      return {
        ...state,
        othersArray: action.othersArray,
        othersCost: action.cost,
        othersSelectedImages: action.imagesIds,
        othersRequired: action.required
      };
    case INCREMENT__QUANTITY:
      return { ...state, quantity: state.quantity + 1 };
    case DECREMENT__QUANTITY:
      return {
        ...state,
        quantity: state.quantity > 1 ? state.quantity - 1 : state.quantity
      };
    case STORE__SIZEID:
      // return {...state,sizeId:action.sizeId,sizeManStatus:false,measurementId:"",measurementsObject:{"quantity":state.quantity,"sizeId":action.sizeId}}
      return {
        ...state,
        sizeId: action.sizeId,
        sizeManStatus: false,
        measurementId: "",
        shoesSize: ""
      };
    case SIZEMAN__STATUS:
      // return {...state,sizeManStatus:!state.sizeManStatus,sizeId:"",measurementId:"",measurementsObject:{"quantity":state.quantity,"sizeManStatus":!state.sizeManStatus}}
      return {
        ...state,
        sizeManStatus: !state.sizeManStatus,
        sizeId: "",
        measurementId: "",
        shoesSize: ""
      };
    case UPDATE_SIZEMAN__STATUS:

      return {
        ...state,
        sizeManStatus: action.status,
        sizeId: "",
        measurementId: "",
        shoesSize: ""
      };
    case STORE_MEASUREID:
      // return {...state,measurementId:action.measureID,sizeManStatus:false,sizeId:"",measurementsObject:{"quantity":state.quantity,"measurmentId":action.measureID}}
      return {
        ...state,
        measurementId: action.measureID,
        sizeManStatus: false,
        sizeId: "",
        shoesSize: ""
      };
    case CHANGE_SHOES_SIZE:
      return {
        ...state,
        shoesSize: action.size,
        measurementId: "",
        sizeManStatus: false,
        sizeId: ""
      };
    case FABRIC_HEADER_IMAGES:
      return {
        ...state,
        fabricSelectedImages: action.images,
        fabricCost:
          action.customCost !== undefined
            ? action.customCost
            : state.fabricCost,
        fabricRequired:
          action.required !== undefined ? action.required : state.fabricRequired
      };
    case YAKA_HEADER_IMAGES:
      return {
        ...state,
        yakaSelectedImages: action.images,
        yakaCost:
          action.customCost !== undefined ? action.customCost : state.yakaCost,
        yakaRequired:
          action.required !== undefined ? action.required : state.yakaRequired
      };
    case ZARZOUR_HEADER_IMAGES:
      return {
        ...state,
        zarzourSelectedImages: action.images,
        zarzourCost:
          action.customCost !== undefined
            ? action.customCost
            : state.zarzourCost,
        zarzourRequired:
          action.required !== undefined
            ? action.required
            : state.zarzourRequired
      };
    case AKMAM_HEADER_IMAGES:
      return {
        ...state,
        akmamSelectedImages: action.images,
        akmamCost:
          action.customCost !== undefined ? action.customCost : state.akmamCost,
        akmamRequired:
          action.required !== undefined ? action.required : state.akmamRequired
      };
    case OTHERS_HEADER_IMAGES:
      return {
        ...state,
        othersSelectedImages: action.images,
        othersCost:
          action.customCost !== undefined
            ? action.customCost
            : state.othersCost,
        othersRequired:
          action.required !== undefined ? action.required : state.othersRequired
      };

    default:
      return state;
  }
}
