import {
  GET_FABRICS_SUCCESS,
  GET_FABRICS_FAIL,
  STORE_START_COST,
  TOGGLE_SUBMISSION_POPUP,
  CHANGE_UPLOAD_STATUS,
  CHANGE_CART_STATUS,
  SUBMIT_CUSTOMS_FAIL,
  SET_INDEX,
  UPDATE_TOTAL_COST
} from "../../actions/customizationsPage/fabricsActions";
import {
  GET_YAKA_SUCCESS,
  GET_YAKA_FAIL
} from "../../actions/customizationsPage/yakaActions";
import {
  GET_ZARZOUR_SUCCESS,
  GET_ZARZOUR_FAIL
} from "../../actions/customizationsPage/zarzourActions";
import {
  GET_AKMAM_SUCCESS,
  GET_AKMAM_FAIL
} from "../../actions/customizationsPage/akmamActions";
import {
  GET_OTHERS_SUCCESS,
  GET_OTHERS_FAIL,
  IMAGES_POPUP,
  IMAGES_POPDOWN,
  TOGGLE_HASHWA_POPUP,
  STORE_ATTACHEMENTS_NAMES,
  DELETE_ATTACHEMENT,
  GET_DEFAULT_SUCCESS,
  UPDATE_DEFAULTS_LOCALLY,
  STORE_NOTE,
  SET_OPENED_SECTION
} from "../../actions/customizationsPage/othersActions";
import {
  GET_MEASUREMENT_SUCCESS,
  GET_MEASUREMENT_FAIL,
  MEASUREMENT_POPUP_STATUS
} from "../../actions/customizationsPage/measurementsActions";
import {TOGGLE_CLOSE_POPUP} from "../../actions/loginPopUp/loginActions";
import {RESET_PRESENT_DATA} from "../../actions/includes/carouselActions";
import { GET_ADDS_SUCCESS } from "../../actions/customizationsPage/addsActions";
const customsInitialState = {
  fabricsStatus: false,
  yakaStatus: false,
  addsStatus: false,
  zarzourStatus: false,
  akmamStatus: false,
  othersStatus: false,
  measurementsStatus: "false",
  measurementsitems: {},
  generalitems: [],
  yakaobject: [],
  addsobject: [],
  zarzourobject: [],
  akmamobject: [],
  othersobject: [],
  images: [],
  cost: 0,
  totalCost: null,
  imagesPopUpStatus: false,
  imagesPopUp: [],
  popUpTitle: "",
  popUpCost: "",
  hashwaPopUpStatus: false,
  attachementsNames: [],
  subPopUpStatus: false,
  productId: null,
  slug: "",
  title: "",
  title_ar: "",
  title_en: "",
  uploadStatus: true,
  cartStatus: true,
  sizeType: "",
  measurementsTable: "",
  failStatus: false,
  indexStatus: "",
  closePopupStatus:false,
  textNote:"",
  stockType: "",
  openedSection: "size",
  currentSectionImage: "https://ithoob.com/_next/static/files/images/customization/komasha.jpg"
};

export default function(state = customsInitialState, action) {
  switch (action.type) {
    case SET_OPENED_SECTION:
        console.log(action.payload);
        return {...state, openedSection : action.payload.section, currentSectionImage: action.payload.image}
    case UPDATE_TOTAL_COST:
        return {...state,totalCost: action.cost}
    case RESET_PRESENT_DATA:
      return { ...state,attachementsNames:[],textNote:"",cartStatus: true,uploadStatus:true,failStatus:false,indexStatus:"",measurementsitems:{}}
    case SET_INDEX:
      return { ...state, indexStatus: action.value };
    case UPDATE_DEFAULTS_LOCALLY:
      return {
        ...state,
        totalCost: action.defaults.basicPrice,
        productId: action.defaults.productId,
        title_ar: action.defaults.title_ar,
        title_en: action.defaults.title_en,
        slug: action.defaults.slug
      };
    case GET_DEFAULT_SUCCESS:
      return { ...state, totalCost: action.data.price,attachementsNames:(action.images.length !==0)?action.images:state.attachementsNames,
                          textNote:(action.data.note !== undefined && action.data.note.content !== "")?action.data.note.content:state.textNote };
    case TOGGLE_SUBMISSION_POPUP:
      return { ...state, subPopUpStatus: action.value };
    case DELETE_ATTACHEMENT:
      return {
        ...state,
        attachementsNames: state.attachementsNames.filter(function(item) {
          return item !== action.attachName;
        })
      };
    case STORE_ATTACHEMENTS_NAMES:
      return { ...state, attachementsNames: action.attachNames };
    case TOGGLE_HASHWA_POPUP:
      return { ...state, hashwaPopUpStatus: !state.hashwaPopUpStatus };
    case IMAGES_POPDOWN:
      return { ...state, imagesPopUpStatus: false };
    case CHANGE_UPLOAD_STATUS:
      return { ...state, uploadStatus: action.flag };
    case CHANGE_CART_STATUS:
      return { ...state, cartStatus: action.flag };
    case IMAGES_POPUP:
      return {
        ...state,
        imagesPopUpStatus: true,
        imagesPopUp: action.images,
        popUpCost: action.cost,
        popUpTitle: action.title
      };
    case STORE_START_COST:
      return { ...state, totalCost: action.cost };
    case GET_FABRICS_SUCCESS:
      return {
        ...state,
        productId: action.payload["product-details"].id,
        sizeType: action.payload["product-details"].sizeType,
        measurementsTable: action.payload["product-details"].measurementsTable,
        slug: action.payload["product-details"].slug,
        title: action.payload["product-details"].title,
        title_ar: action.payload["product-details"].title_ar,
        title_en: action.payload["product-details"].title_en,
        fabricsStatus: action.payload.status,
        generalitems: action.payload.generalItems,
        images: action.payload["product-details"].images,
        cost: action.payload.cost,
        stockType: action.payload["product-details"].stockType
      };
    // case GET_FABRICS_FAIL:
    // return {...state,  status: action.payload.status}
    case GET_YAKA_SUCCESS:
      return {
        ...state,
        yakaStatus: action.payload.status,
        yakaobject: action.payload.generalItems
      };
    case GET_ADDS_SUCCESS:
      return {
        ...state,
        addsStatus: action.payload.status,
        addsobject: action.payload.generalItems
      };
    case GET_ZARZOUR_SUCCESS:
      return {
        ...state,
        zarzourStatus: action.payload.status,
        zarzourobject: action.payload.generalItems
      };
    case GET_AKMAM_SUCCESS:
      return {
        ...state,
        akmamStatus: action.payload.status,
        akmamobject: action.payload.generalItems
      };
    case GET_OTHERS_SUCCESS:
      return {
        ...state,
        othersStatus: action.payload.status,
        othersobject: action.payload.generalItems
      };
    case GET_MEASUREMENT_SUCCESS:
      return {
        ...state,
        measurementsStatus: action.payload.status,
        measurementsitems: action.payload.generalItems
      };
    case SUBMIT_CUSTOMS_FAIL:
      return { ...state, failStatus: true };
      case TOGGLE_CLOSE_POPUP:
      return {...state,closePopupStatus:action.value };
      case STORE_NOTE:
      return {...state,textNote:action.note}

    default:
      return state;
  }
}
