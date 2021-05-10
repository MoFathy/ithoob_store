import React, { Component } from "react";
import { connect } from "react-redux";
import { loginPopUpStatusToggle,resetResponseMsgs } from "../../actions/loginPopUp/loginActions";
import {
  signupPopUpStatusToggle,
  emailSignupPopUpToggle
} from "../../actions/signupPopUp/signupActions";
import FacebookBtn from "./facebookBtn";
import TwitterBtn from "./twitterBtn";
import GoogleBtn from "./googleBtn";
import { getStringVal } from "../../scripts/multiLang";
import { updateRedirectToChechout } from "../../actions/myCart/myCartActions";
export class SignUpPopup extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.emailSignupPopUp = this.emailSignupPopUp.bind(this);
    this.loginPopUp = this.loginPopUp.bind(this);
  }

  handleClick() {
    this.props.signupPopUpStatusToggle(false);
    this.props.resetResponseMsgs();
    this.props.updateRedirectToChechout(false);
  }
  loginPopUp() {
    this.props.signupPopUpStatusToggle(false);
    this.props.loginPopUpStatusToggle(true);
  }
  emailSignupPopUp() {
    this.props.signupPopUpStatusToggle(false);
    this.props.emailSignupPopUpToggle(true);
  }

  render() {
    return (
      <div className="signupPopup">
        <div className="signupPopup__content boxShadow">
          <div className="signupPopup__content__header">
            <p>{getStringVal(this.props.language, "CREATE_A_NEW_ACCOUNT")}</p>
            <p onClick={this.handleClick}>
              <span className="icon-close"></span>
            </p>
          </div>
          <div className="signupPopup__content__mediaBtns">
            <div className="signupPopup__content__mediaBtns__facebook">
              <FacebookBtn />
            </div>
            <div className="signupPopup__content__mediaBtns__google">
              <GoogleBtn />
            </div>
            <div className="signupPopup__content__mediaBtns__twitter">
              <TwitterBtn />
            </div>
          </div>
          {
            this.props.gooStatus === false && this.props.gooErrorMessage !== "" ? (
              <div className="loginPopup__content__fail mb-3" >
                <div className="loginPopup__content__fail__content d-flex align-items-center">
                  <img src={require('../../images/error.png')} alt="errorMsg" />
                  <p>{this.props.gooErrorMessage}</p>
                </div>
              </div>
            ): this.props.twiStatus === false && this.props.twiErrorMessage !== "" ? (
              <div className="loginPopup__content__fail mb-3" >
                <div className="loginPopup__content__fail__content d-flex align-items-center">
                  <img src={require('../../images/error.png')} alt="errorMsg" />
                  <p>{this.props.twiErrorMessage}</p>
                </div>
              </div>
            ):this.props.fbStatus === false && this.props.fbErrorMessage !== "" ? (
              <div className="loginPopup__content__fail mb-3" >
                <div className="loginPopup__content__fail__content d-flex align-items-center">
                  <img src={require('../../images/error.png')} alt="errorMsg" />
                  <p>{this.props.fbErrorMessage}</p>
                </div>
              </div>
            ): ""
          }
          <div className="signupPopup__content__or row">
            <div className="col-5 line"></div>
            <div className="col-2">
              <p>{getStringVal(this.props.language, "OR")}</p>
            </div>
            <div className="col-5 line"></div>
          </div>
          <div className="btnStyle signup">
            <button onClick={this.emailSignupPopUp}>
              {getStringVal(this.props.language, "REGISTER_BY_EMAIL")}
            </button>
          </div>
          <div className="signupPopup__content__or row">
            <div className="col-12 line"></div>
          </div>
          <div
            className="signupPopup__content__signUpBtn"
            onClick={this.loginPopUp}
          >
            <p>
              {getStringVal(this.props.language, "HAVE_AN_ACCOUNT_BEFORE")}
              <span>{getStringVal(this.props.language, "LOG_IN")}</span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    signupPopUpStatus: state.signupReducer.signupPopUpStatus,
    language: state.generalReducer.language,
    fbErrorMessage:state.socialMediaReducer.fbErrorMessage,
    twiErrorMessage:state.socialMediaReducer.twiErrorMessage,
    gooErrorMessage:state.socialMediaReducer.gooErrorMessage,
    fbStatus:state.socialMediaReducer.fbStatus,
    twiStatus:state.socialMediaReducer.twiStatus,
    gooStatus:state.socialMediaReducer.gooStatus
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signupPopUpStatusToggle(value) {
      dispatch(signupPopUpStatusToggle(value));
    },
    loginPopUpStatusToggle(value) {
      dispatch(loginPopUpStatusToggle(value));
    },
    emailSignupPopUpToggle(value) {
      dispatch(emailSignupPopUpToggle(value));
    },
    resetResponseMsgs(){
      dispatch(resetResponseMsgs());
    },
    updateRedirectToChechout: status => {
      dispatch(updateRedirectToChechout(status));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpPopup);
