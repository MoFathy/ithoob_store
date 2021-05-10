import React, { Component } from "react";
import Header from "../header/header";
import { connect } from "react-redux";
import Footer from "../footer/footer";
import { getStringVal } from "../../scripts/multiLang";
import "../../style.scss";
import LoginPopUp from "../includes/loginPopUp";
import ForgetPwPopUp from "../includes/forgetPwPopUp";
import SuccessFpwPopUp from "../includes/fpwSuccessPopUp";
import ChangePwPopUp from "../includes/changePwPopUp";
import ChangePwSuccessPopup from "../includes/changePwSuccessPopup";
import SignupPopUp from "../includes/signupPopUp";
import EmailSignupPopUp from "../includes/emailSignupPopUp";
import VerifyCodePopUp from "../includes/verifyCodePopUp";
import DiscountPopUp from "../includes/discountPopUp";
import CancelPopUp from "../ordersPage/cancelOrderPopup";
import ModifyPopUp from "../ordersPage/modificationsPopUp";
import CancelSuccessPopUp from "../ordersPage/cancelOrderSuccessPopup";
import ContacteMsgPopup from "../includes/contacteMsgPopup";
import SuccessSignupMycartPopup from "../includes/successSignupMycartPopup";
import RequestTailorPopup from "../includes/requestTailorPopup";
import RequestTailorSuccessPopup from "../includes/requestTailorSuccessPopup";
export class Layout extends Component {
  componentDidMount() {
    require("lazysizes/lazysizes");
    if (window.location.pathname !== "/customizations") {
      $("body").removeClass("customizations");
    }
    // console.log("from layout");
    $(".content").css(
      "min-height",
      $(window).height() -
      ($("footer").height() + $("header").height() + 50) +
      "px"
    );

    $(".modal-body").css("max-height", $(window).height() - 200 + "px");
  }

  render() {
    return (
      <div
        className={
          this.props.classNameData +
          " " +
          (this.props.language === false ? "page__en" : "page__ar") +
          " " +
          (this.props.isLoading ? "isLoading isLoading__page" : "")
        }
      >
        {this.props.changePwReqStatus === true ? <ChangePwSuccessPopup /> : ""}
        {this.props.queryString !== undefined &&
          this.props.queryString !== null ? (
            <ChangePwPopUp queryString={this.props.queryString} />
          ) : (
            ""
          )}
        {this.props.emailRequestStatus === true ? <SuccessFpwPopUp /> : ""}
        {this.props.fpwPopUpStatus === true ? <ForgetPwPopUp /> : ""}
        {this.props.loginPopUpStatus === true ? <LoginPopUp /> : ""}
        {this.props.signupPopUpStatus === true ? <SignupPopUp /> : ""}
        {this.props.emailSignUpPopUp === true ? (
          <EmailSignupPopUp queryValue={this.props.pathname} />
        ) : (
            ""
          )}
        {this.props.verifyCodePopUpwStatus === true ? (
          <VerifyCodePopUp pathname={this.props.pathname} />
        ) : (
            ""
          )}
        {this.props.discountPopUp === true ? <DiscountPopUp /> : ""}
        {this.props.cancelPopup === true ? <CancelPopUp /> : ""}
        {this.props.modificatinPopUp === true ? <ModifyPopUp /> : ""}
        {this.props.contactUsStatus === true ? <ContacteMsgPopup /> : ""}
        {this.props.cancelSuccessPopup === true ? <CancelSuccessPopUp /> : ""}
        {this.props.requestTailorPopupStatus === true ? <RequestTailorPopup /> : ""}
        {this.props.successSignupFromMycart === true ? (
          <SuccessSignupMycartPopup />
        ) : (
            ""
          )}
          <RequestTailorSuccessPopup />
        <Header />
        {this.props.children}
        <Footer />
        <div id="cartNotification" className="cart-notification">
          {getStringVal(this.props.language, "ADD_TO_CART_NOTIFICATION")}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    changePwReqStatus: state.forgetPwReducer.changePwReqStatus,
    changePwPopupStatus: state.forgetPwReducer.changePwPopupStatus,
    emailRequestStatus: state.forgetPwReducer.emailRequestStatus,
    fpwPopUpStatus: state.forgetPwReducer.fpwPopUpStatus,
    loginPopUpStatus: state.loginReducer.loginPopUpStatus,
    signupPopUpStatus: state.signupReducer.signupPopUpStatus,
    emailSignUpPopUp: state.signupReducer.emailSignUpPopUp,
    verifyCodePopUpwStatus: state.loginReducer.verifyCodePopUpwStatus,
    discountPopUp: state.signupReducer.discountPopUp,
    language: state.generalReducer.language,
    isLoading: state.categories.isLoading,
    cancelPopup: state.ordersReducer.cancelPopup,
    modificatinPopUp: state.ordersReducer.modificatinPopUp,
    contactUsStatus: state.contactReducer.contactUsStatus,
    cancelSuccessPopup: state.ordersReducer.cancelSuccessPopup,
    successSignupFromMycart: state.signupReducer.successSignupFromMycart,
    requestTailorPopupStatus: state.requestTailorReducer.requestTailorPopupStatus
  };
}

export default connect(mapStateToProps, null)(Layout);
