import React, { Component } from "react";
import { connect } from "react-redux";
// import $ from "jquery";
import { getContactUs } from "../../actions/contactPage/contactUsActions";
import { getStringVal } from "../../scripts/multiLang";
import { getProfileInfo } from "../../actions/profile/profileActions";
class ContactUs extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    const $ = require("jquery");
    //remove "please enter your name or email... msg on focus
    $("body").on("focusin", "#name", function() {
      let display = $(".invalidInput__name").css("display");
      if (display !== "none") {
        $(".invalidInput__name").css({
          display: "none"
        });
        $(".contactPage__contactUs__form__field.name").css({
          "padding-bottom": "20px"
        });
      }
    });
    $("body").on("focusin", "#email", function() {
      let display = $(".invalidInput__email").css("display");
      if (display !== "none") {
        $(".invalidInput__email").css({
          display: "none"
        });
        $(".contactPage__contactUs__form__field.email").css({
          "padding-bottom": "20px"
        });
      }
    });
    $("body").on("focusin", "#mobile", function() {
      let display = $(".invalidInput__mobile").css("display");
      if (display !== "none") {
        $(".invalidInput__mobile").css({
          display: "none"
        });
        $(".contactPage__contactUs__form__field.mobile").css({
          "padding-bottom": "20px"
        });
      }
    });
    $("body").on("focusin", "#message", function() {
      let display = $(".invalidInput__msg").css("display");
      if (display !== "none") {
        $(".invalidInput__msg").css({
          display: "none"
        });
        $(".contactPage__contactUs__form__field.msg").css({
          "padding-bottom": "20px"
        });
      }
    });
    //if user logged in
    if (document.cookie.indexOf("ithoobUser") !== -1) {
      this.props.getProfileInfo(
        this.props.language === false ? 1 : 2,
        this.props.ithoobUser.authenticationToken
      );
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    var name, email, mobile, msg;
    name = this.refs.name.value;
    email = this.refs.email.value;
    mobile = this.refs.mobile.value;
    msg = this.refs.msg.value;
    /////////name
    //if empty fullname input ...get msg and change input bottom border
    if (name == "" || name.length < 3) {
      if (name == "") {
        $(".invalidInput__name").text(
          getStringVal(this.props.language, "PLEASE_ENTER_YOUR_NAME")
        );
      } else {
        $(".invalidInput__name").text(
          getStringVal(
            this.props.language,
            "SHOULD_NOT_BE_LESS_THAN_THE_NUMBER_OF_CHARACTERS_NAME_3"
          )
        );
      }
      $(".invalidInput__name").css({
        display: "inline-block"
      });
      $(".contactPage__contactUs__form__field.name").css({
        "padding-bottom": "0"
      });
    }
    ///////email
    var regex = /^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/;
    var emailvalueState = regex.test(email);
    //if empty email input...get msg and change input bottom border
    if (email == "" || email.length < 7 || !emailvalueState) {
      if (email == "" || !emailvalueState) {
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
      $(".invalidInput__email").css({
        display: "inline-block"
      });
      $(".contactPage__contactUs__form__field.email").css({
        "padding-bottom": "0"
      });
    }
    /////////mobile
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
      $(".invalidInput__mobile").css({
        display: "inline-block"
      });
      $(".contactPage__contactUs__form__field.mobile").css({
        "padding-bottom": "0"
      });
    }
    if (msg === "") {
      $(".invalidInput__msg").text(
        getStringVal(this.props.language, "YOU_FORGET_TO_WRITE_YOUR_MESSAGE")
      );
      $(".invalidInput__msg").css({
        display: "inline-block"
      });
      $(".contactPage__contactUs__form__field.msg").css({
        "padding-bottom": "0"
      });
    }
    //if all inputs entered make a post request and get user data in success
    //mobile here optional
    if (
      msg !== "" &&
      name !== "" &&
      email !== "" &&
      isnum &&
      mobile.length > 7 &&
      email.length > 6 &&
      emailvalueState &&
      name.length > 2
    ) {
      this.props.getContactUs("2", name, email, mobile, msg);
    }
  }

  onFocusHandle = e => {
    Array.from($(".formInput")).forEach(input => {
      if (!(input.value.length > 0)) {
        $(input)
          .parent(".contactPage__contactUs__form__field")
          .addClass("notFocused");
      } else {
        $(input)
          .parent(".contactPage__contactUs__form__field")
          .removeClass("notFocused");
      }
    });

    $(e.target)
      .parent(".contactPage__contactUs__form__field")
      .removeClass("notFocused");
  };

  onBlurHandle = e => {
    if (!(e.target.value.length > 0)) {
      $(e.target)
        .parent(".contactPage__contactUs__form__field")
        .addClass("notFocused");
    }
  };

  render() {
    return (
      <div className="contactPage__contactUs">
        <h2> {getStringVal(this.props.language, "CONTACT_US")} </h2>{" "}
        <form
          className="contactPage__contactUs__form"
          onSubmit={$event => this.handleSubmit($event)}
        >
          <div className="contactPage__contactUs__form__field notFocused name">
            <label for="name">
              {" "}
              {getStringVal(this.props.language, "THE_NAME")}{" "}
            </label>{" "}
            <input
              className="formInput"
              type="text"
              ref="name"
              maxLength="25"
              id="name"
              onFocus={e => this.onFocusHandle(e)}
              onBlur={e => this.onBlurHandle(e)}
            />{" "}
            <h4 className="invalidInput__name"> </h4>{" "}
          </div>{" "}
          <div className="contactPage__contactUs__form__field notFocused email">
            <label for="email">
              {" "}
              {getStringVal(this.props.language, "E_MAIL")}{" "}
            </label>{" "}
            <input
              className="formInput"
              type="email"
              ref="email"
              maxLength="50"
              id="email"
              onFocus={e => this.onFocusHandle(e)}
              onBlur={e => this.onBlurHandle(e)}
            />{" "}
            <h4 className="invalidInput__email"> </h4>{" "}
          </div>{" "}
          <div className="contactPage__contactUs__form__field notFocused mobile">
            <label for="mobile">
              {" "}
              {getStringVal(this.props.language, "MOBILE")}{" "}
            </label>{" "}
            <input
              className="formInput"
              type="text"
              ref="mobile"
              maxLength="16"
              id="mobile"
              onFocus={e => this.onFocusHandle(e)}
              onBlur={e => this.onBlurHandle(e)}
            />{" "}
            <h4 className="invalidInput__mobile"> </h4>{" "}
          </div>{" "}
          <div className="contactPage__contactUs__form__field notFocused msg">
            <label for="message">
              {" "}
              {getStringVal(this.props.language, "THE_MESSAGE")}{" "}
            </label>{" "}
            <textarea
              className="formInput"
              id="message"
              ref="msg"
              maxLength="600"
              onFocus={e => this.onFocusHandle(e)}
              onBlur={e => this.onBlurHandle(e)}
            />{" "}
            <h4 className="invalidInput__msg"> </h4>{" "}
          </div>{" "}
          <div className="contactPage__contactUs__form__btnLink btnStyle">
            {" "}
            {this.props.isloading === true ? (
              <div className="loader">
                {" "}
                <div className="loader__load"> </div>
              </div>
            ) : (
              ""
            )}{" "}
            <button className="button">
              {" "}
              {getStringVal(this.props.language, "SEND")}{" "}
            </button>{" "}
          </div>{" "}
        </form>{" "}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    contactIthoob: state.contactReducer.contactIthoob,
    contactUsStatus: state.contactReducer.contactUsStatus,
    isloading: state.contactReducer.isloading,
    language: state.generalReducer.language,
    ithoobUser: state.loginReducer.ithoobUser,
    personalInfo: state.profile.personalInfo
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getContactUs(language, name, email, mobile, message) {
      dispatch(getContactUs(language, name, email, mobile, message));
    },
    getProfileInfo(lang, authToken) {
      dispatch(getProfileInfo(lang, authToken));
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);
