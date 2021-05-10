import React, { Component } from "react";
import { connect } from "react-redux";
import { getStringVal } from "../../scripts/multiLang";
import {
  verifyCodePopUp,
  verifyCode,
  generateCode
} from "../../actions/loginPopUp/loginActions";
import { confirmUser } from "../../actions/signupPopUp/signupActions";

export class VerifyCodePopup extends Component {
  constructor(props) {
    super(props);
    this.handleCodeRequest = this.handleCodeRequest.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.resendCode = this.resendCode.bind(this);
  }
  resendCode() {
    var secTime = true;
    var emailOrpassword = "";
    if (this.props.wasFoundByEmail === true || (this.props.wasFoundByEmail === false && this.props.existingUser === false)) {
      // console.log(this.props.userEmail);
      // console.log(this.props.userMobile);
      if (this.props.userData.email) {
        emailOrpassword = this.props.userData.email;
      } else {
        emailOrpassword = this.props.userEmail;
      }
    } else {
      // console.log(this.props.userEmail);
      // console.log(this.props.userMobile);
      if (this.props.userData.email) {
      emailOrpassword = this.props.userData.mobile;
      } else {
        emailOrpassword = this.props.userMobile;
      }
    }
    if (this.props.fromSignUp === true) {
      //get api from abdu
      var param = "pass";
      this.props.generateCode(emailOrpassword, secTime);
    } else {
      this.props.generateCode(emailOrpassword, secTime);
    }
    let successIcon = document.querySelector(".resendcode");
    let resendMessage = document.querySelector(".sendCode__forget");
    successIcon.removeAttribute("style");
    resendMessage.removeAttribute("style");
    setTimeout(() => {
      // resendMessage.style.color = "#000";
      successIcon.style.display = "block";
    }, 1000);
    // let successMessage = document.querySelector(".messagePopup__content__success");
    // if (successMessage) {
    //   successMessage.style.visibility = "hidden";
    //   setTimeout(() => {
    //     successMessage.style.visibility = "visible";
    //   }, 1500);
    // }
  }
  handleCodeRequest() {
    var code = this.refs.code.value;
    if (code === "" || code.length < 3) {
      if (code === "") {
        $(".invalidInput__code").text(
          getStringVal(
            this.props.language,
            "PLEASE_ENTER_THE_CODE_SENDER_PHONE"
          )
        );
      } else {
        $(".invalidInput__code").text(
          getStringVal(this.props.language, "PLEASE_ENTER_THE_CODE_IN_FULL")
        );
      }
      $(".invalidInput__code").css({ display: "inline-block" });
      $(".messagePopup__content__form__field.code input").css({
        "margin-bottom": "0",
        "border": "1px solid #ff552e"
      });
    }
    if (code.length >= 3 && code !== "") {
      $(".invalidInput__code").css({ display: "none" });
      $(".messagePopup__content__form__field.code input").css({
        "margin-bottom": "20px",
        "border": "1px solid #cbcbcb"
      });
      if (this.props.fromSignUp === true) {
        this.props.confirmUser(
          this.props.userData,
          code,
          this.props.pathname,
          this.props.signPaymentBtn
        );
      } else {
        // not signup
        this.props.verifyCode(this.props.userEmail, code);
      }
    }
  }
  handleClick() {
    this.props.verifyCodePopUp(false);
  }

  onFocusHandle = e => {
    Array.from($(".formInput")).forEach(input => {
      if (!(input.value.length > 0)) {
        $(input)
          .parent(".messagePopup__content__form__field")
          .addClass("notFocused");
      } else {
        $(input)
          .parent(".messagePopup__content__form__field")
          .removeClass("notFocused");
      }
    });

    $(e.target)
      .parent(".messagePopup__content__form__field")
      .removeClass("notFocused");
  };

  onBlurHandle = e => {
    if (!(e.target.value.length > 0)) {
      $(e.target)
        .parent(".messagePopup__content__form__field")
        .addClass("notFocused");
    }
  };

  render() {
    return (
      <div className="messagePopup">
        <div className="messagePopup__content boxShadow">
          <div className="messagePopup__content__header">
            {/* <div className="d-flex justify-content-end w-100 messagePopup__content__closeIcon"> */}
            <p onClick={this.handleClick}>
              <span className="icon-close" />
            </p>
            {/* </div> */}
          </div>
          <div className="messagePopup__content__body">
            <img src={require('../../images/tick.png')} className="mx-auto d-block mb-3" />
            {this.props.fromSignUp === false && this.props.existingUser === false && this.props.wasFoundByEmail === false && this.props.isEmail ? (
              <h2 className="mb-2">
                {getStringVal(
                  this.props.language,
                  "A_MESSAGE_WAS_SENT_TO_YOUR_EMAIL"
                )}
              </h2>
            ) : this.props.fromSignUp === false && this.props.existingUser === false && this.props.wasFoundByEmail === false ? (
              <h2 className="mb-2">
                {getStringVal(
                  this.props.language,
                  "A_MESSAGE_WAS_SENT_TO_YOUR_PHONE"
                )}
              </h2>
            ) : this.props.fromSignUp === false && this.props.existingUser === false ? (
              <h2 className="mb-2">
                {getStringVal(
                  this.props.language,
                  "A_MESSAGE_WAS_SENT_TO_YOUR_EMAIL"
                )}
              </h2>
            ) :
                !this.props.existingUser ? (
                  <h2 className="mb-2">
                    {getStringVal(
                      this.props.language,
                      "A_MESSAGE_WAS_SENT_TO_YOUR_PHONE"
                    )}
                  </h2>
                ) : this.props.existingUser && this.props.wasFoundByEmail ? (
                  <h2 className="mb-2">
                    {getStringVal(
                      this.props.language,
                      "A_MESSAGE_WAS_SENT_TO_YOUR_EMAIL"
                    )}
                  </h2>
                ) : (
                      <h2 className="mb-2">
                        {getStringVal(
                          this.props.language,
                          "A_MESSAGE_WAS_SENT_TO_YOUR_PHONE"
                        )}
                      </h2>
                    )}
            {this.props.fromSignUp === false && this.props.existingUser === false && this.props.wasFoundByEmail === false && this.props.isEmail ? (
              <p>
                {getStringVal(
                  this.props.language,
                  "PLEASE_ENTER_THE_CODE_SENT_TO_YOUR_EMAIL_TO_COMPLETE_THE_REGISTRATION_PROCESS"
                )}
              </p>
            ) : this.props.fromSignUp === false && this.props.existingUser === false && this.props.wasFoundByEmail === false ? (
              <p>
                {getStringVal(
                  this.props.language,
                  "PLEASE_ENTER_THE_CODE_SENT_TO_YOUR_PHONE_TO_COMPLETE_THE_REGISTRATION_PROCESS"
                )}
              </p>
            ) : this.props.fromSignUp === false && this.props.existingUser === false ? (
              <p>
                {getStringVal(
                  this.props.language,
                  "PLEASE_ENTER_THE_CODE_SENT_TO_YOUR_EMAIL_TO_COMPLETE_THE_REGISTRATION_PROCESS"
                )}
              </p>
            ) : !this.props.existingUser ? (
              <p>
                {getStringVal(
                  this.props.language,
                  "PLEASE_ENTER_THE_CODE_SENT_TO_YOUR_PHONE_TO_COMPLETE_THE_REGISTRATION_PROCESS"
                )}
              </p>
            ) : this.props.existingUser && this.props.wasFoundByEmail ? (
              <p>
                {getStringVal(
                  this.props.language,
                  "PLEASE_ENTER_THE_CODE_SENT_TO_YOUR_EMAIL_TO_COMPLETE_THE_REGISTRATION_PROCESS"
                )}
              </p>
            ) : (
                      <p>
                        {getStringVal(
                          this.props.language,
                          "PLEASE_ENTER_THE_CODE_SENT_TO_YOUR_PHONE_TO_COMPLETE_THE_REGISTRATION_PROCESS"
                        )}
                      </p>
                    )}

            {this.props.verifyRequestStatus === false ? (
              <div className="messagePopup__content__fail">
                <div className="messagePopup__content__fail__content d-flex align-items-center">
                  <img src={require('../../images/error.png')} alt="errorMsg" />
                  <p>{this.props.verifyMsg}</p>
                </div>
              </div>
            ) : (
                ""
              )}
            {this.props.verifyCodeState === false &&
              this.props.gcStatus !== true ? (
                <div className="messagePopup__content__fail">
                  <div className="messagePopup__content__fail__content d-flex align-items-center">
                    <img src={require('../../images/error.png')} alt="errorMsg" />
                    <p className="ml-2 mr-2">
                      {getStringVal(
                        this.props.language,
                        "UNFORTUNATELY_THIS_CODE_IS_INCORRECT_PLEASE_MAKE_SURE_THE_CODE_AND_TRY_AGAIN"
                      )}
                    </p>
                  </div>
                </div>
              ) : (
                ""
              )}
            {this.props.gcStatus === true ? (
              // <div className="messagePopup__content__success">
              //   <div className="messagePopup__content__success__content d-flex align-items-center">
              //     <img src={require('../../images/tick.png')} alt="successrMsg" />
              //     <p>{this.props.gcSuccessMsg}</p>
              //   </div>
              // </div>
              ""
            ) : (
                ""
              )}
            {this.props.gcStatus === false &&
              this.props.gcFailMsg.length > 0 && this.props.verifyCodeState !== false ? (
                <div className="messagePopup__content__success">
                  <div className="messagePopup__content__success__content d-flex align-items-center">
                    <img src={require('../../images/error.png')} alt="successrMsg" />
                    <p>{this.props.gcFailMsg}</p>
                  </div>
                </div>

              ) : (
                ""
              )}
          </div>

          <div className="messagePopup__content__form w-100">
            <div className="messagePopup__content__form__field notFocused code">
              <div className="sendCode d-flex justify-content-between">
                <label htmlFor="code">
                  {getStringVal(this.props.language, "CODE")}
                </label>
                <label className="sendCode__forget d-flex" onClick={this.resendCode}>
                  {getStringVal(this.props.language, "SEND_CODE_AGAIN")}
                  <img src={require('../../images/tick.png')} className="w-10 resendcode" />
                </label>
              </div>
              <input
                type="text"
                ref="code"
                className="codeInput formInput"
                maxLength="50"
                id="code"
                onFocus={e => this.onFocusHandle(e)}
                onBlur={e => this.onBlurHandle(e)}
              />
            </div>
            <h4 className="invalidInput__code"></h4>
            <div className="btnStyle">
              <button onClick={this.handleCodeRequest}>
                {" "}
                {getStringVal(this.props.language, "CREATE_ACCOUNT")}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userEmail: state.loginReducer.userEmail,
    userData: state.loginReducer.userData,
    verifyCodePopUpwStatus: state.loginReducer.verifyCodePopUpwStatus,
    verifyRequestStatus: state.loginReducer.verifyRequestStatus,
    verifyMsg: state.loginReducer.verifyMsg,
    gcSuccessMsg: state.loginReducer.gcSuccessMsg,
    gcFailMsg: state.loginReducer.gcFailMsg,
    gcStatus: state.loginReducer.gcStatus,
    userData: state.signupReducer.userSignupData,
    fromSignUp: state.loginReducer.fromSignUp,
    language: state.generalReducer.language,
    signPaymentBtn: state.signupReducer.signPaymentBtn,
    confirmUserState: state.signupReducer.confirmUserState,
    verifyCodeState: state.signupReducer.verifyCodeState,
    existingUser: state.signupReducer.existingUser,
    wasFoundByEmail: state.signupReducer.wasFoundByEmail,
    userMobile: state.signupReducer.userMobile,
    isEmail: state.loginReducer.isEmail
  };
}
function mapDispatchToProps(dispatch) {
  return {
    verifyCodePopUp(status, fromSignUp) {
      dispatch(verifyCodePopUp(status, fromSignUp));
    },
    verifyCode(email, code) {
      dispatch(verifyCode(email, code));
    },
    generateCode(email, secondTime, param) {
      dispatch(generateCode(email, secondTime, param));
    },
    confirmUser(userData, code, query, fromPayment) {
      dispatch(confirmUser(userData, code, query, fromPayment));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyCodePopup);
