import { combineReducers } from "redux";
import categories from "./header/categoriesReducer";
import banner from "./home/bannerReducer";
import customsReducer from "./customizationsPage/customsReducer";
import productList from "./productList/productListReducer";
import breadcrumb from "./includes/breadcrumb";
import homeProducts from "./home/homeProductsReducer";
import homeSections from "./home/homeSectionsReducer";
import productDetails from "./productDetails/productDetails";
import aboutReducer from "./aboutPage/aboutPageReducer";
import policiesReducer from "./privacyPolicy/privacyPolicyReducer";
import faqReducer from "./faqPage/faqReducer";
import contactReducer from "./contactPage/contactReducer";
import carouselReducer from "./includes/carouselReducer/carouselReducer";
import measurementListReducer from "./includes/measurementListReducer";
import loginReducer from "./login/loginReducer";
import forgetPwReducer from "./fpw/fpwReducer";
import undoable, { includeAction } from "redux-undo";
import moreProducts from "./productDetails/moreProducts";
import signupReducer from "./signup/signupReducer";
import generalReducer from "./includes/general";
import cartHeader from "./header/cartHeader";
import socialMediaReducer from "./socialMediaBtns/socialMediaReducer";
import measurementGuide from "./measurementGuide/measurementGuide";
import profile from "./profile/profileReducer";
import myCart from "./myCart/myCartReducer";
import ordersReducer from "./ordersPage/ordersReducer";
import checkout from "./checkout/checkoutReducer";
import measurementList from "./measurmentList/measurmentListReducer";
import addMeasurement from "./addMeasurement/addMeasurementReducer";
import requestTailorReducer from "./requestTailor/requestTailorReducer";
export default combineReducers({
  requestTailorReducer: requestTailorReducer,
  ordersReducer: ordersReducer,
  categories: categories,
  banner: banner,
  customsReducer: customsReducer,
  productList: productList,
  breadcrumb: breadcrumb,
  homeProducts: homeProducts,
  homeSections: homeSections,
  productDetails: productDetails,
  aboutReducer: aboutReducer,
  policiesReducer: policiesReducer,
  faqReducer: faqReducer,
  measurementListReducer: measurementListReducer,
  contactReducer: contactReducer,
  loginReducer: loginReducer,
  forgetPwReducer: forgetPwReducer,
  signupReducer: signupReducer,
  generalReducer: generalReducer,
  cartHeader: cartHeader,
  socialMediaReducer: socialMediaReducer,
  carouselReducer: undoable(carouselReducer, {
    limit: 4,
    filter: includeAction([
      "STORE__FABRICS",
      "STORE__YAKA",
      "STORE__ZARZOUR",
      "STORE__AKMAM",
      "STORE__OTHERS",
      "INCREMENT__QUANTITY",
      "DECREMENT__QUANTITY",
      "STORE__SIZEID",
      "SIZEMAN__STATUS",
      "STORE_MEASUREID"
    ]),
    syncFilter: true 
  }),
  moreProducts: moreProducts,
  measurementGuide: measurementGuide,
  profile: profile,
  myCart: myCart,
  checkout: checkout,
  measurementList: measurementList,
  addMeasurement: addMeasurement
});
