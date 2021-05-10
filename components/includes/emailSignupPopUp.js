import React, { Component } from "react";
import { connect } from "react-redux";
import CitiesDropdown from "./citiesDropdown";
import { getCookie, deleteCookie } from "../../scripts/getCookieFile";
import {
  loginPopUpStatusToggle,
  loginRequest,
  generateCode
} from "../../actions/loginPopUp/loginActions";
import { fpwPopUpStatusToggle } from "../../actions/fpwPopUp/fpwActions";
import {
  signupPopUpStatusToggle,
  emailSignupPopUpToggle,
  signupRequest,
  signupFbRequest,
  signupTwiRequest,
  signupGooRequest,
  confirmUser,
  storeUserData,
  resetAnyUserData,
  addUserMobile
} from "../../actions/signupPopUp/signupActions";

import { getStringVal } from "../../scripts/multiLang";
export class EmailSignUpPopup extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handlesignUp = this.handlesignUp.bind(this);
    this.forgetPwPopUp = this.forgetPwPopUp.bind(this);
    this.handleGenerateCode = this.handleGenerateCode.bind(this);
    this.togglePasswordVisibility = this.togglePasswordVisibility.bind(this);
  }
  componentDidMount() {
    var listInputs = $(".signupPopup__content__form__field input");
    const _this = this;
    listInputs.each(function (idx, item) {
      var inputItem = $(item);
      if (
        inputItem.value !== "" ||
        inputItem.value === inputItem.defaultValue
      ) {
        _this.onFocusHandle(inputItem);
      }
    });
  }
  forgetPwPopUp() {
    this.props.emailSignupPopUpToggle(false);
    this.props.fpwPopUpStatusToggle(true);
  }
  handleClick() {
    this.props.emailSignupPopUpToggle(false);
    this.props.resetAnyUserData();
    deleteCookie("socialtoken");
  }
  handleGenerateCode() {
    var emailOrpassword = "";
    if (this.props.wasFoundByEmail === true) {
      emailOrpassword = this.refs.email.value;
    } else {
      emailOrpassword = this.refs.mobile.value;
    }
    this.props.generateCode(emailOrpassword);
    this.props.emailSignupPopUpToggle(false);
    this.props.resetAnyUserData();
  }
  handlesignUp() {
    $(
      ".signupPopup__content__form__field.password input,.signupPopup__content__form__field.email input,.signupPopup__content__form__field.mobile input,.signupPopup__content__form__field.address input,.signupPopup__content__form__field.name input"
    ).css({ "border-bottom": "1px solid #dedede" });
    $(
      ".invalidInput__email,.invalidInput__password,.invalidInput__mobile,.invalidInput__name,.invalidInput__address"
    ).css({ display: "none" });
    var socialcookie = getCookie("socialtoken", "authenticationToken");
    var password, email, mobile, name, areaID, address;
    areaID = $("#dropdownMenuButton2").attr("data-id");
    //if password div present not in complete social sign up
    if (socialcookie === "") {
      password = this.refs.password.value;
      //if empty password input...get msg and change input bottom border
      if (password === "" || password.length < 8) {
        if (password === "") {
          $(".invalidInput__password").text(
            getStringVal(this.props.language, "PLEASE_ENTER_YOUR_PASSWORD")
          );
        } else {
          $(".invalidInput__password").text(
            getStringVal(
              this.props.language,
              "THE_PASSWORD_YOU_ENTERED_IS_CAFE_MUST_BE_YOUR_PASSWORD_CONSISTING_OF_8_DIGITS_OR_CHARACTERS"
            )
          );
        }
        $(".invalidInput__password").css({ display: "inline-block" });
        $(".signupPopup__content__form__field.password input").css({
          "border-bottom": "1px solid #ff552e"
        });
      }
    }
    email = this.refs.email.value;
    mobile = this.refs.mobile.value;
    name = this.refs.name.value;
    address = this.refs.address.value;

    this.props.addUserMobile(mobile);

    if (name === "" || name.length < 3 || !/^[a-zA-Zء-ي ]*$/g.test(name)) {
      if (name === "") {
        $(".invalidInput__name").text(
          getStringVal(this.props.language, "PLEASE_ENTER_YOUR_NAME")
        );
      } else if (!/^[a-zA-Zء-ي ]*$/g.test(name)) {
        //has special characters
        $(".invalidInput__name").text(
          getStringVal(
            this.props.language,
            "SHOULD_NOT_CONTAIN_SPECIAL_CHARACTERS"
          )
        );
      } else {
        $(".invalidInput__name").text(
          getStringVal(
            this.props.language,
            "SHOULD_NOT_BE_LESS_THAN_THE_NUMBER_OF_CHARACTERS_NAME_3"
          )
        );
      }
      $(".invalidInput__name").css({ display: "inline-block" });
      $(".signupPopup__content__form__field.name input").css({
        "border-bottom": "1px solid #ff552e"
      });
    }
    if (address.length > 0) {
      if (address.length < 20 || address.length > 100) {
        $(".invalidInput__address").text(
          getStringVal(
            this.props.language,
            "TITLE_MUST_BE_BETWEEN_3_TO_100_CHARACTERS"
          )
        );

        $(".invalidInput__address").css({ display: "inline-block" });
        $(".signupPopup__content__form__field.address input").css({
          "border-bottom": "1px solid #ff552e"
        });
      }
    }
    var isEmail = /^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/.test(
      email
    );

    //if empty email input...get msg and change input bottom border
    if (email === "" || email.length < 5 || !isEmail) {
      if (email === "" || !isEmail) {
        $(".invalidInput__email").text(
          getStringVal(
            this.props.language,
            "PLEASE_WRITE_YOUR_CORRECT_EMAIL_AND_TRY_AGAIN"
          )
        );
      } else {
        $(".invalidInput__email").text(
          getStringVal(
            this.props.language,
            "EMAIL_SEEMS_SHORT_PLEASE_ENTER_A_VALID_EMAIL"
          )
        );
      }
      $(".invalidInput__email").css({ display: "inline-block" });
      $(".signupPopup__content__form__field.email input").css({
        "border-bottom": "1px solid #ff552e"
      });
    }

    var isnum = /^[0-9 +]+$/.test(mobile);
    if (mobile === "" || mobile.length < 8 || !isnum) {
      if (mobile === "") {
        $(".invalidInput__mobile").text(
          getStringVal(this.props.language, "PLEASE_ENTER_YOUR_PHONE_NUMBER")
        );
      } else if (mobile.length < 8) {
        $(".invalidInput__mobile").text(
          getStringVal(
            this.props.language,
            "THE_PHONE_NUMBER_IS_NOT_ENOUGH_PLEASE_ENTER_THE_NUMBERS_8_OR_MORE"
          )
        );
      } else {
        $(".invalidInput__mobile").text(
          getStringVal(this.props.language, "PLEASE_ENTER_NUMBERS_ONLY")
        );
      }
      $(".invalidInput__mobile").css({ display: "inline-block" });
      $(".signupPopup__content__form__field.mobile input").css({
        "border-bottom": "1px solid #ff552e"
      });
    }
    if (socialcookie === "") {
      // no social cookie
      if (
        name !== "" &&
        name.length >= 3 &&
        /^[a-zA-Zء-ي ]*$/g.test(name) &&
        password !== "" &&
        password.length >= 8 &&
        email !== "" &&
        isEmail &&
        areaID !== "" &&
        mobile !== "" &&
        mobile.length >= 8 &&
        isnum
      ) {
        //signupRequest
        if (this.props.codeConfirmUser !== "") {
          var object = {
            name: name,
            email: email,
            password: password,
            mobile: mobile,
            area: areaID,
            address: address
          };
          this.props.confirmUser(
            object,
            this.props.codeConfirmUser,
            this.props.queryValue,
            this.props.signPaymentBtn
          );
        } else {
          this.props.storeUserData(
            name,
            email,
            password,
            mobile,
            areaID,
            address
          );
          if (address !== "") {
            if (address.length >= 20 && address.length <= 100) {
              this.props.signupRequest(
                name,
                email,
                password,
                mobile,
                areaID,
                address,
                this.props.queryValue,
                this.props.signPaymentBtn,
                this.props.language === false ? 1 : 2
              );
            }
          } else {
            this.props.signupRequest(
              name,
              email,
              password,
              mobile,
              areaID,
              address,
              this.props.queryValue,
              this.props.signPaymentBtn,
              this.props.language === false ? 1 : 2
            );
          }
        }
      }
    } else {
      if (
        name !== "" &&
        name.length >= 3 &&
        /^[a-zA-Zء-ي ]*$/g.test(name) &&
        email !== "" &&
        isEmail &&
        areaID !== "" &&
        mobile !== "" &&
        mobile.length >= 8 &&
        isnum
      ) {
        //signupRequest
        if (this.props.fbToken !== "") {
          if (address !== "") {
            if (address.length >= 20 && address.length <= 100) {
              this.props.signupFbRequest(
                name,
                email,
                mobile,
                areaID,
                address,
                socialcookie,
                this.props.queryValue,
                this.props.signPaymentBtn,
                this.props.language === false ? 1 : 2
              );
            }
          } else {
            this.props.signupFbRequest(
              name,
              email,
              mobile,
              areaID,
              address,
              socialcookie,
              this.props.queryValue,
              this.props.signPaymentBtn,
              this.props.language === false ? 1 : 2
            );
          }
        } else if (this.props.twiToken !== "") {
          if (address !== "") {
            if (address.length >= 20 && address.length <= 100) {
              this.props.signupTwiRequest(
                name,
                email,
                mobile,
                areaID,
                address,
                socialcookie,
                this.props.twiSecret,
                this.props.queryValue,
                this.props.signPaymentBtn,
                this.props.language === false ? 1 : 2
              );
            }
          } else {
            this.props.signupTwiRequest(
              name,
              email,
              mobile,
              areaID,
              address,
              socialcookie,
              this.props.twiSecret,
              this.props.queryValue,
              this.props.signPaymentBtn,
              this.props.language === false ? 1 : 2
            );
          }
        } else {
          if (address !== "") {
            if (address.length >= 20 && address.length <= 100) {
              this.props.signupGooRequest(
                name,
                email,
                mobile,
                areaID,
                address,
                socialcookie,
                this.props.queryValue,
                this.props.signPaymentBtn,
                this.props.language === false ? 1 : 2
              );
            }
          } else {
            this.props.signupGooRequest(
              name,
              email,
              mobile,
              areaID,
              address,
              socialcookie,
              this.props.queryValue,
              this.props.signPaymentBtn,
              this.props.language === false ? 1 : 2
            );
          }
        }
      }
    }
  }
  // defaultValue={
  //      this.props.userSignupData.password &&
  //       this.props.userSignupData.password !== ""
  //     ? this.props.userSignupData.password
  //     : ""
  // }
  onFocusHandle = e => {
    Array.from($(".formInput")).forEach(input => {
      if (!(input.value.length > 0)) {
        $(input)
          .parent(".signupPopup__content__form__field")
          .addClass("notFocused");
      } else {
        $(input)
          .parent(".signupPopup__content__form__field")
          .removeClass("notFocused");
      }
    });

    $(e.target)
      .parent(".signupPopup__content__form__field")
      .removeClass("notFocused");
  };

  onBlurHandle = e => {
    if (!(e.target.value.length > 0)) {
      $(e.target)
        .parent(".signupPopup__content__form__field")
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
    var socialcookie = getCookie("socialtoken", "authenticationToken");
    return (
      <div className="signupPopup">
        <div className="signupPopup__content boxShadow">
          <div className="signupPopup__content__header">
            <p>{getStringVal(this.props.language, "CREATE_A_NEW_ACCOUNT")}</p>
            <p onClick={this.handleClick}>
              <span className="icon-close"></span>
            </p>
          </div>

          {this.props.signupMsg !== "" ? (
            <div className="signupPopup__content__fail">
              <div className="signupPopup__content__fail__content d-flex align-items-center">
                <img src={require('../../images/error.png')} alt="errorMsg" />
                <p>
                  {this.props.signupMsg}
                  &nbsp;&nbsp;
                  {this.props.existingUser === true ? (
                    <span onClick={this.handleGenerateCode}>
                      {getStringVal(
                        this.props.language,
                        "DO_YOU_WANT_TO_SET_UP_AN_ACCOUNT_AND_RESTORE_ALL_MQASATK_AND_PREVIOUS_REQUESTS_HAVE_ANY_DRESS"
                      )}
                    </span>
                  ) : (
                      <span onClick={this.forgetPwPopUp}>
                        {getStringVal(
                          this.props.language,
                          "FORGOT_YOUR_PASSWORD"
                        )}
                      </span>
                    )}
                </p>
              </div>
            </div>
          ) : (
              ""
            )}
          {this.props.loginMsg !== "" ? (
            <div className="signupPopup__content__fail">
              <div className="signupPopup__content__fail__content d-flex align-items-center">
                <img src={require('../../images/error.png')} alt="errorMsg" />
                <p>
                  {this.props.loginMsg}
                  &nbsp;&nbsp;
                  {this.props.loginRequestStatus === true ? (
                    <span onClick={this.handleGenerateCode}>
                      {getStringVal(
                        this.props.language,
                        "DO_YOU_WANT_TO_SET_UP_AN_ACCOUNT_AND_RESTORE_ALL_MQASATK_AND_PREVIOUS_REQUESTS_HAVE_ANY_DRESS"
                      )}
                    </span>
                  ) : (
                      <span onClick={this.forgetPwPopUp}>
                        {getStringVal(
                          this.props.language,
                          "FORGOT_YOUR_PASSWORD"
                        )}
                      </span>
                    )}
                </p>
              </div>
            </div>
          ) : (
              ""
            )}
          {this.props.socialMediaMsg !== "" ? (
            <div className="signupPopup__content__fail">
              <div className="signupPopup__content__fail__content d-flex align-items-center">
                <img src={require('../../images/error.png')} alt="errorMsg" />
                <p>{this.props.socialMediaMsg}</p>
              </div>
            </div>
          ) : (
              ""
            )}

          <div className="signupPopup__content__form">
            <div className="signupPopup__content__form__field notFocused name">
              <label htmlFor="name">
                {getStringVal(this.props.language, "THE_NAME")}
              </label>
              <input
                type="text"
                ref="name"
                defaultValue={
                  this.props.userData.name && this.props.userData.name !== ""
                    ? this.props.userData.name
                    : this.props.userSignupData.name &&
                      this.props.userSignupData.name !== ""
                      ? this.props.userSignupData.name
                      : this.props.socialName !== ""
                        ? this.props.socialName
                        : ""
                }
                className="nameInput formInput"
                maxLength="25"
                id="name"
                onFocus={e => this.onFocusHandle(e)}
                onBlur={e => this.onBlurHandle(e)}
              />
            </div>
            <h4 className="invalidInput__name" />
            <div className="signupPopup__content__form__field notFocused  email">
              <label htmlFor="email">
                {getStringVal(this.props.language, "E_MAIL")}
              </label>
              <input
                type="email"
                ref="email"
                defaultValue={
                  this.props.userData.email && this.props.userData.email !== ""
                    ? this.props.userData.email
                    : this.props.userSignupData.email &&
                      this.props.userSignupData.email !== ""
                      ? this.props.userSignupData.email
                      : this.props.socialEmail !== ""
                        ? this.props.socialEmail
                        : ""
                }
                className="emailInput formInput"
                maxLength="50"
                id="email"
                onFocus={e => this.onFocusHandle(e)}
                onBlur={e => this.onBlurHandle(e)}
              />
            </div>

            <h4 className="invalidInput__email" />
            {socialcookie === "" ? (
              <div className="signupPopup__content__form__field notFocused password">
                <div className="pwTitleForget d-flex justify-content-between">
                  <label htmlFor="password">
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
            ) : (
                ""
              )}

            {socialcookie === "" ? (
              <h4 className="invalidInput__password" />
            ) : (
                ""
              )}

            <div className="signupPopup__content__form__field notFocused mobile">
              <label htmlFor="mobile">
                {getStringVal(this.props.language, "MOBILE")} ({getStringVal(this.props.language, "MOBILE_HINT")})
              </label>
              <input
                type="text"
                ref="mobile"
                maxLength="15"
                className="formInput"
                defaultValue={
                  this.props.userData.mobile &&
                    this.props.userData.mobile !== ""
                    ? this.props.userData.mobile
                    : this.props.userSignupData.mobile &&
                      this.props.userSignupData.mobile !== ""
                      ? this.props.userSignupData.mobile
                      : this.props.socialMobile !== ""
                        ? this.props.socialMobile
                        : ""
                }
                id="mobile"
                onFocus={e => this.onFocusHandle(e)}
                onBlur={e => this.onBlurHandle(e)}
              />
            </div>

            <h4 className="invalidInput__mobile" />
            <div className="signupPopup__content__form__place">
              {this.props.userSignupData.area ? (
                <CitiesDropdown
                  defaultAreaID={this.props.userSignupData.area.id}
                  defaultAreaName={this.props.userSignupData.area.name}
                />
              ) : (
                  <CitiesDropdown
                    fromSignUpForm={true}
                  />
                )}
            </div>

            <div className="signupPopup__content__form__field notFocused address">
              <label htmlFor="address">
                {getStringVal(this.props.language, "ADDRESS")}(
                {getStringVal(this.props.language, "OPTIONAL")})
              </label>
              <input
                type="text"
                ref="address"
                className="addressInput formInput"
                maxLength="100"
                minLength="20"
                id="address"
                defaultValue={
                  this.props.userData.address &&
                    this.props.userData.address !== ""
                    ? this.props.userData.address
                    : this.props.userSignupData.address &&
                    this.props.userSignupData.address !== ""
                    ? this.props.userSignupData.address
                    : ""
                }
                onFocus={e => this.onFocusHandle(e)}
                onBlur={e => this.onBlurHandle(e)}
              />
              <h4 className="invalidInput__address"></h4>
            </div>

            <div className="btnStyle">
              <button onClick={this.handlesignUp}>
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
    loginRequestStatus: state.loginReducer.loginRequestStatus,
    loginMsg: state.loginReducer.loginMsg,

    signupPopUpStatus: state.signupReducer.signupPopUpStatus,
    userData: state.loginReducer.userData,
    userSignupData: state.signupReducer.userSignupData,
    signupMsg: state.signupReducer.signupMsg,
    signupRequestStatus: state.signupReducer.signupRequestStatus,
    socialEmail: state.socialMediaReducer.socialEmail,
    socialName: state.socialMediaReducer.socialName,
    socialMobile: state.socialMediaReducer.socialMobile,
    fbToken: state.socialMediaReducer.fbToken,
    twiToken: state.socialMediaReducer.twiToken,
    gooToken: state.socialMediaReducer.gooToken,
    twiSecret: state.socialMediaReducer.twiSecret,
    codeConfirmUser: state.signupReducer.codeConfirmUser,
    language: state.generalReducer.language,
    socialMediaMsg: state.signupReducer.socialMediaMsg,
    existingUser: state.signupReducer.existingUser,
    wasFoundByEmail: state.signupReducer.wasFoundByEmail,
    signPaymentBtn: state.signupReducer.signPaymentBtn,
    userMobile: state.signupReducer.userMobile,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signupPopUpStatusToggle() {
      dispatch(signupPopUpStatusToggle());
    },
    fpwPopUpStatusToggle(value) {
      dispatch(fpwPopUpStatusToggle(value));
    },
    emailSignupPopUpToggle(value) {
      dispatch(emailSignupPopUpToggle(value));
    },

    signupRequest(
      name,
      email,
      password,
      mobile,
      areaID,
      address,
      query,
      signPaymentBtn,
      lang
    ) {
      dispatch(
        signupRequest(
          name,
          email,
          password,
          mobile,
          areaID,
          address,
          query,
          signPaymentBtn,
          lang
        )
      );
    },
    signupFbRequest(
      name,
      email,
      mobile,
      areaID,
      address,
      socialcookie,
      query,
      signPaymentBtn,
      lang
    ) {
      dispatch(
        signupFbRequest(
          name,
          email,
          mobile,
          areaID,
          address,
          socialcookie,
          query,
          signPaymentBtn,
          lang
        )
      );
    },
    signupTwiRequest(
      name,
      email,
      mobile,
      areaID,
      address,
      socialcookie,
      secret,
      query,
      signPaymentBtn,
      lang
    ) {
      dispatch(
        signupTwiRequest(
          name,
          email,
          mobile,
          areaID,
          address,
          socialcookie,
          secret,
          query,
          signPaymentBtn,
          lang
        )
      );
    },
    signupGooRequest(
      name,
      email,
      mobile,
      areaID,
      address,
      socialcookie,
      query,
      signPaymentBtn,
      lang
    ) {
      dispatch(
        signupGooRequest(
          name,
          email,
          mobile,
          areaID,
          address,
          socialcookie,
          query,
          signPaymentBtn,
          lang
        )
      );
    },
    confirmUser(userData, code, query, signPaymentBtn) {
      dispatch(confirmUser(userData, code, query, signPaymentBtn));
    },
    storeUserData(name, email, password, mobile, areaID, address) {
      dispatch(storeUserData(name, email, password, mobile, areaID, address));
    },
    resetAnyUserData() {
      dispatch(resetAnyUserData());
    },
    generateCode(emailOrPw) {
      dispatch(generateCode(emailOrPw));
    },
    addUserMobile(mobile) {
      dispatch(addUserMobile(mobile));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailSignUpPopup);
