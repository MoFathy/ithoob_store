import React, { Component } from "react";
import { connect } from "react-redux";

// style
import "../style.scss";
//included components
import PageHeader from "../components/addMeasurement/pageHeader";
import AddMeasurement from "../components/addMeasurement/addMeasurement";
import PageFooter from "../components/addMeasurement/pageFooter";
import ConfirmationPopup from "../components/addMeasurement/confirmationPopup";
import SizeNamePopup from "../components/addMeasurement/sizeNamePopup";
import LoginPopUp from "../components/includes/loginPopUp";
import EmailSignupPopUp from "../components/includes/emailSignupPopUp";
import SuccessPopup from "../components/addMeasurement/successPopup";
import SuccessFpwPopUp from '../components//includes/fpwSuccessPopUp';

import ChangePwPopUp from '../components//includes/changePwPopUp';

import ChangePwSuccessPopup from '../components//includes/changePwSuccessPopup';

import ForgetPwPopUp from "../components/includes/forgetPwPopUp";
import SignupPopUp from "../components/includes/signupPopUp";
import VerifyCodePopUp from "../components/includes/verifyCodePopUp";

//actions
import { setActiveMenu } from "../actions/header/categories.js";
import { changeLangWithoutCookie } from "../actions/includes/general";
import { changeIthoobCookie } from "../actions/loginPopUp/loginActions";
import {
  getAddMeasurement,
  getMeasurementDetails
} from "../actions/addMeasurement/getAddMeasurement";
import cookies from "next-cookies";
import { getStringVal } from "../scripts/multiLang";
import { RequestTailorPopup } from "../components/includes/requestTailorPopup";

class AddMeasurementPage extends Component {
  static async getInitialProps({ reduxStore, query, pathname, req }) {
    reduxStore.dispatch(setActiveMenu(pathname + "?slug=" + query.slug));

    const { lang } = cookies({ req: req });
    const { ithoobUser } = cookies({ req: req });
    const ithoobUserObj = ithoobUser ? JSON.parse(ithoobUser) : null;
    const authToken = ithoobUser ? ithoobUserObj.authenticationToken : null;
    reduxStore.dispatch(
      changeLangWithoutCookie(lang === "false" ? false : true)
    );

    if (ithoobUser) {
      reduxStore.dispatch(changeIthoobCookie(1));
    }

    if (
      query.slug &&
      query.slug != undefined &&
      query.slug.length > 0 &&
      ithoobUser
    ) {
      // console.log("slug", query.slug, query.slug.length, authToken);
      await reduxStore.dispatch(getAddMeasurement(lang === "false" ? 1 : 2));
      await reduxStore.dispatch(
        getMeasurementDetails(lang === "false" ? 1 : 2, authToken, query.slug)
      );
    } else {
      await reduxStore.dispatch(getAddMeasurement(lang === "false" ? 1 : 2));
    }
    return {
      addMeasurement: { ...reduxStore.getState().addMeasurement },
      id: query.id,
      query: query,
      authToken: authToken
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.language !== prevProps.language) {
      this.props.dispatch(
        getAddMeasurement(
          this.props.language === false ? 1 : 2
          // this.props.authToken
        )
      );
    }
  }

  render() {
    return (
      <div
        className={
          "addMeasurementPage" +
          " " +
          (this.props.language === false ? "page__en" : "page__ar") +
          " " +
          (this.props.isLoading ? "isLoading isLoading__page" : "")
        }
      >
        <PageHeader />
        <AddMeasurement />
        <PageFooter />
        <ConfirmationPopup />
        <SizeNamePopup />
        {this.props.changePwReqStatus === true ? <ChangePwSuccessPopup /> : ""}
        {this.props.query.code !== undefined && this.props.query.code !== null ? <ChangePwPopUp queryString={this.props.query.code} /> : ""}
        {this.props.emailRequestStatus === true ? <SuccessFpwPopUp /> : ""}
        {this.props.loginPopUpStatus === true ? (
          <LoginPopUp queryValue={this.props.activeMenu} />
        ) : this.props.emailSignUpPopUp === true ? (
          <EmailSignupPopUp queryValue={this.props.activeMenu} />
        ) : (
              ""
            )}
        {this.props.fpwPopUpStatus === true ? <ForgetPwPopUp /> : ""}
        {this.props.signupPopUpStatus === true ? <SignupPopUp /> : ""}
        {this.props.verifyCodePopUpwStatus === true ? (
          <VerifyCodePopUp pathname={this.props.pathname} />
        ) : (
            ""
          )}
        <SuccessPopup />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  language: state.generalReducer.language,
  categories: state.categories,
  isLoading: state.addMeasurement.isLoading,
  loginPopUpStatus: state.loginReducer.loginPopUpStatus,
  emailSignUpPopUp: state.signupReducer.emailSignUpPopUp,
  activeMenu: state.categories.activeMenu,
  fpwPopUpStatus: state.forgetPwReducer.fpwPopUpStatus,
  emailRequestStatus: state.forgetPwReducer.emailRequestStatus,
  changePwReqStatus: state.forgetPwReducer.changePwReqStatus,
  signupPopUpStatus: state.signupReducer.signupPopUpStatus,
  verifyCodePopUpwStatus: state.loginReducer.verifyCodePopUpwStatus
});

export default connect(mapStateToProps, null)(AddMeasurementPage);
