import React, { Component } from "react";
import { connect } from "react-redux";
import FacebookBtn from "./facebookBtn";
import TwitterBtn from "./twitterBtn";
import GoogleBtn from "./googleBtn";
import {
  loginPopUpStatusToggle,
  loginRequest,
  generateCode,
  reserErrorMsg,
  resetResponseMsgs,
  toggleIsEmail
} from "../../actions/loginPopUp/loginActions";
import { fpwPopUpStatusToggle } from "../../actions/fpwPopUp/fpwActions";
import { getStringVal } from "../../scripts/multiLang";
import { signupPopUpStatusToggle } from "../../actions/signupPopUp/signupActions";

import { updateRedirectToChechout } from "../../actions/myCart/myCartActions";

import GoogleLogin from 'react-google-login';
import { googleLoginRequest } from "../../actions/socialMediaBtns/socialMediaActions";
export class LoginPopup extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.forgetPwPopUp = this.forgetPwPopUp.bind(this);
    this.signupPopUp = this.signupPopUp.bind(this);
    this.handleGenerateCode = this.handleGenerateCode.bind(this);
    this.togglePasswordVisibility = this.togglePasswordVisibility.bind(this);
  }

   responseGoogle = (response) => {
     console.log('====================================');
     console.log(response);
     console.log('====================================');
    this.props.googleLoginRequest(response.accessToken, this.props.queryValue)
  }

  forgetPwPopUp() {
    this.props.loginPopUpStatusToggle(false);
    this.props.fpwPopUpStatusToggle(true);
  }
  handleClick() {
    this.props.loginPopUpStatusToggle(false);
    this.props.resetResponseMsgs();
    this.props.updateRedirectToChechout(false);
  }
  componentDidMount() {
    //remove "please enter your name or password" msg on focus
    // return below if there is an issue
    // $('body').on('focusin','.emailInput',function(){
    //   $(".loginPopup__content__form__field.email input").css({'border-bottom':'1px solid #6ebe32'});
    //   let display = $(".invalidInput__email").css('display');
    //   if(display !== 'none'){
    //       $(".invalidInput__email").css({'display':'none'});
    //       $(".loginPopup__content__form__field.email input").css({'margin-bottom':'15px'});
    //   }
    // })
    // $('body').on('focusin','.passwordInput',function(){
    //   $(".loginPopup__content__form__field.password input").css({'border-bottom':'1px solid #6ebe32'});
    //   let display = $(".invalidInput__password").css('display');
    //   if(display !== 'none'){
    //       $(".invalidInput__password").css({'display':'none'});
    //       $(".loginPopup__content__form__field.password input").css({'margin-bottom':'15px'});
    //   }
    // })
    // $('body').on('focusout','.passwordInput',function(){
    //       $(".loginPopup__content__form__field.password input").css({'border-bottom':'1px solid #dedede'});
    // })
    // $('body').on('focusout','.emailInput',function(){
    //       $(".loginPopup__content__form__field.email input").css({'border-bottom':'1px solid #dedede'});
    // })

    var listInputs = $(".loginPopup__content__form__field input");
    const _this = this;
    listInputs.each(function(idx, item) {
      var inputItem = $(item);
      if (
        inputItem.value !== "" ||
        inputItem.value === inputItem.defaultValue
      ) {
        _this.onFocusHandle(inputItem);
      }
    });
  }
  signupPopUp() {
    this.props.loginPopUpStatusToggle(false);
    this.props.signupPopUpStatusToggle(true);
  }
  handleGenerateCode() {
    this.props.generateCode(this.props.userEmail);
    var isnum = /^[0-9 +]+$/.test(this.props.userEmail);
    if(isnum) {
      this.props.toggleIsEmail(false);
    }
  }
  handleLogin(e) {
    e.preventDefault();
    this.props.reserErrorMsg();

    var password, email;

    password = this.refs.password.value;

    email = this.refs.email.value;
    var isEmail = /^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/.test(
      email
    );

    var isnum = /^[0-9 +]+$/.test(email);

    $(".invalidInput__email,.invalidInput__password").css({ display: "none" });
    //if empty email input...get msg and change input bottom border
    if (
      email == "" ||
      (!isEmail && !isnum) ||
      (isnum && email.length < 5) ||
      (isEmail && email.length < 9)
    ) {
      if (email == "") {
        $(".invalidInput__email").text(
          getStringVal(
            this.props.language,
            "PLEASE_ENTER_THE_NUMBER_OR_YOUR_EMAIL"
          )
        );
      } else if (!isEmail && !isnum) {
        $(".invalidInput__email").text(
          getStringVal(
            this.props.language,
            "EMAIL_FORMAT_IS_INCORRECT_MUST_BE_COORDINATION"
          )
        );
      } else if (isnum && email.length < 5) {
        $(".invalidInput__email").text(
          getStringVal(this.props.language, "NO_MOBILE_IS_INCOMPLETE")
        );
      } else {
        $(".invalidInput__email").text(
          getStringVal(this.props.language, "EMAIL_IS_INCOMPLETE")
        );
      }

      $(".invalidInput__email").css({ display: "inline-block" });
      $(".loginPopup__content__form__field.email input").css({
        "margin-bottom": "0",
        "border-bottom": "1px solid #ff552e"
      });
    }
    //if empty password input...get msg and change input bottom border
    if (password === "" || password.length < 3) {
      if (password === "") {
        $(".invalidInput__password").text(
          getStringVal(this.props.language, "PLEASE_ENTER_YOUR_PASSWORD")
        );
      } else {
        $(".invalidInput__password").text(
          getStringVal(
            this.props.language,
            "THE_PASSWORD_IS_NOT_ENOUGH_MUST_BE_PASSWORD_COMPOSED_OF_8_DIGITS_OR_LETTERS"
          )
        );
      }
      $(".invalidInput__password").css({ display: "inline-block" });
      $(".loginPopup__content__form__field.password input").css({
        "margin-bottom": "0",
        "border-bottom": "1px solid #ff552e"
      });
    }
    if (
      password !== "" &&
      password.length >= 3 &&
      email !== "" &&
      ((isnum && email.length >= 5) || (isEmail && email.length >= 7))
    ) {
      this.props.loginRequest(
        email,
        password,
        this.props.queryValue,
        this.props.redirectToChechout,
        this.props.allSizesComplete,
        this.props.language === false ? 1 : 2,
        this.props.fromProductDetails,
        this.props.slug,
        this.props.fromMyCart
      );
    }
  }

  onFocusHandle = e => {
    Array.from($(".formInput")).forEach(input => {
      if (!(input.value.length > 0)) {
        $(input)
          .parent(".loginPopup__content__form__field")
          .addClass("notFocused");
      } else {
        $(input)
          .parent(".loginPopup__content__form__field")
          .removeClass("notFocused");
      }
    });

    $(e.target)
      .parent(".loginPopup__content__form__field")
      .removeClass("notFocused");
  };

  onBlurHandle = e => {
    if (!(e.target.value.length > 0)) {
      $(e.target)
        .parent(".loginPopup__content__form__field")
        .addClass("notFocused");
    }
  };

  togglePasswordVisibility() {
    let passwordInput = document.getElementById('password');
    let passwordToggle = document.getElementsByClassName('show-hide-password');
    let passType = passwordInput.getAttribute('type');
    passType = passType == 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', passType);
    passwordToggle[0].classList.toggle('active');
  }

  render() {
    return (
      <div className="loginPopup">
        <div className="loginPopup__content boxShadow">
          <div className="loginPopup__content__header">
            <p>{getStringVal(this.props.language, "LOG_IN")}</p>
            <p onClick={this.handleClick}>
              <span className="icon-close" />
            </p>
          </div>
          <div className="loginPopup__content__mediaBtns">
            <div className="loginPopup__content__mediaBtns__facebook">
              <FacebookBtn queryValue={this.props.queryValue} />
            </div>
            <div className="loginPopup__content__mediaBtns__google">
              <GoogleBtn queryValue={this.props.queryValue} />
              {/* <GoogleLogin
                clientId="467086662365-goo1lbvda0ei1q1vndu3061d263a6gm1.apps.googleusercontent.com"
                buttonText={getStringVal(this.props.language, "SIGN_IN_WITH_GOOGLE")}
                onSuccess={this.responseGoogle}
                cookiePolicy={'single_host_origin'}
              /> */}
            </div>
            <div className="loginPopup__content__mediaBtns__twitter">
              <TwitterBtn queryValue={this.props.queryValue} />
            </div>
          </div>
          <div className="loginPopup__content__or row">
            <div className="col-5 line" />
            <div className="col-2">
              <p>{getStringVal(this.props.language, "OR")}</p>
            </div>
            <div className="col-5 line" />
          </div>
          {this.props.gooStatus === false &&
          this.props.gooErrorMessage !== "" ? (
            <div className="loginPopup__content__fail">
              <div className="loginPopup__content__fail__content d-flex align-items-center">
                <img src={require('../../images/error.png')} alt="errorMsg" />
                <p>{this.props.gooErrorMessage}</p>
              </div>
            </div>
          ) : this.props.twiStatus === false &&
            this.props.twiErrorMessage !== "" ? (
            <div className="loginPopup__content__fail">
              <div className="loginPopup__content__fail__content d-flex align-items-center">
                <img src={require('../../images/error.png')} alt="errorMsg" />
                <p>{this.props.twiErrorMessage}</p>
              </div>
            </div>
          ) : this.props.fbStatus === false &&
            this.props.fbErrorMessage !== "" ? (
            <div className="loginPopup__content__fail">
              <div className="loginPopup__content__fail__content d-flex align-items-center">
                <img src={require('../../images/error.png')} alt="errorMsg" />
                <p>{this.props.fbErrorMessage}</p>
              </div>
            </div>
          ) : (
            ""
          )}
          {this.props.loginRequestStatus === false &&
          this.props.loginMsg !== "" ? (
            <div className="loginPopup__content__fail">
              <div className="loginPopup__content__fail__content d-flex align-items-center">
                <img src={require('../../images/error.png')} alt="errorMsg" />
                <p>{this.props.loginMsg}</p>
              </div>
            </div>
          ) : this.props.loginRequestStatus === true &&
            this.props.usertype === "oldSystem" &&
            this.props.loginMsg !== "" ? (
            <div className="loginPopup__content__success">
              <div className="loginPopup__content__success__content d-flex align-items-center">
                <img src={require('../../images/tick.png')} alt="successMsg" />
                <p>
                  {this.props.loginMsg}{" "}
                  <span onClick={this.handleGenerateCode}>
                    {/* هل تريد انشاء حساب و أستعاده جميع مقاساتك و طلباتك السابقه لدى أى ثوب؟ */}
                    {getStringVal(
                      this.props.language,
                      "DO_YOU_WANT_TO_SET_UP_AN_ACCOUNT_AND_RESTORE_ALL_MQASATK_AND_PREVIOUS_REQUESTS_HAVE_ANY_DRESS"
                    )}
                  </span>
                </p>
              </div>
            </div>
          ) : (
            ""
          )}
          <form
            className="loginPopup__content__form"
            onSubmit={e => this.handleLogin(e)}
          >
            <div className="loginPopup__content__form__field notFocused email">
              <label htmlFor="email">
                {getStringVal(this.props.language, "E_MAIL")}/
                {getStringVal(this.props.language, "MOBILE")}
              </label>
              <input
                ref="email"
                className="emailInput formInput"
                maxLength="50"
                id="email"
                onFocus={e => this.onFocusHandle(e)}
                onBlur={e => this.onBlurHandle(e)}
              />
            </div>
            <h4 className="invalidInput__email" />
            <div className="loginPopup__content__form__field notFocused password">
              <div className="pwTitleForget d-flex justify-content-between">
                <label htmlFor="password">
                  {/* كلمه المرور */}

                  {getStringVal(this.props.language, "PASSWORD")}
                </label>
              </div>
              <input
                type="password"
                ref="password"
                maxLength="50"
                className="passwordInput formInput"
                id="password"
                onFocus={e => this.onFocusHandle(e)}
                onBlur={e => this.onBlurHandle(e)}
              />
              <span className="show-hide-password" onClick={this.togglePasswordVisibility}>
                <img src={require('../../images/eye.png')} alt="Show/Hide Password" />
              </span>
            </div>
            <h4 className="invalidInput__password" />
            <p
              className="pwTitleForget__forget"
              onClick={this.forgetPwPopUp}
            >
              {/* نسيت كلمة المرور */}
              {getStringVal(this.props.language, "FORGOT_YOUR_PASSWORD")}
            </p>
            <div className="btnStyle">
              <button onClick={e => this.handleLogin(e)}>
                {/* تسجيل الدخول */}
                {getStringVal(this.props.language, "LOG_IN")}
              </button>
            </div>
          </form>
          <div
            className="loginPopup__content__signUpBtn"
            onClick={this.signupPopUp}
          >
            <p>
              {/* ليس لديك حساب ؟إنشيء حساب */}
              {getStringVal(
                this.props.language,
                "YOU_DO_NOT_HAVE_AN_ACCOUNT_CREATE_AN_ACCOUNT"
              )}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userEmail: state.loginReducer.userEmail,
    loginRequestStatus: state.loginReducer.loginRequestStatus,
    loginMsg: state.loginReducer.loginMsg,
    usertype: state.loginReducer.usertype,
    signupPopUpStatus: state.signupReducer.signupPopUpStatus,
    language: state.generalReducer.language,
    redirectToChechout: state.myCart.redirectToChechout,
    allSizesComplete: state.myCart.allSizesComplete,
    // allSizesComplete: state.cartHeader.allSizesComplete,
    fromProductDetails: state.addMeasurement.fromProductDetails,
    slug: state.addMeasurement.query.slug,
    fromMyCart: state.addMeasurement.fromMyCart,
    fbErrorMessage: state.socialMediaReducer.fbErrorMessage,
    twiErrorMessage: state.socialMediaReducer.twiErrorMessage,
    gooErrorMessage: state.socialMediaReducer.gooErrorMessage,
    fbStatus: state.socialMediaReducer.fbStatus,
    twiStatus: state.socialMediaReducer.twiStatus,
    gooStatus: state.socialMediaReducer.gooStatus
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loginPopUpStatusToggle(value) {
      dispatch(loginPopUpStatusToggle(value));
    },
    loginRequest(
      email,
      password,
      query,
      redirectToChechout,
      allSizesComplete,
      language,
      fromProductDetails,
      slug,
      fromMyCart
    ) {
      dispatch(
        loginRequest(
          email,
          password,
          query,
          redirectToChechout,
          allSizesComplete,
          language,
          fromProductDetails,
          slug,
          fromMyCart
        )
      );
    },
    fpwPopUpStatusToggle(value) {
      dispatch(fpwPopUpStatusToggle(value));
    },
    signupPopUpStatusToggle(value) {
      dispatch(signupPopUpStatusToggle(value));
    },
    generateCode(email) {
      dispatch(generateCode(email));
    },
    reserErrorMsg() {
      dispatch(reserErrorMsg());
    },
    resetResponseMsgs() {
      dispatch(resetResponseMsgs());
    },
    updateRedirectToChechout: status => {
      dispatch(updateRedirectToChechout(status));
    },
    toggleIsEmail(data) {
      dispatch(toggleIsEmail(data));
    },
    googleLoginRequest(accessToken,query){
      dispatch(googleLoginRequest(accessToken,query))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPopup);
