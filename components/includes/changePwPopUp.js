import React, { Component } from "react";
import { connect } from "react-redux";
import {
  changePwPopUpStatusToggle,
  changePwRequest
} from "../../actions/fpwPopUp/fpwActions";
import { getStringVal } from "../../scripts/multiLang";

export class ChangePwPopup extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handlePwRequest = this.handlePwRequest.bind(this);
  }
  handleClick(e) {
    this.props.changePwPopUpStatusToggle();
  }

  handlePwRequest() {
    //if there is failure response add it to html

    $(".changePwPopup__content__form__field.password input").css({
      "margin-bottom": "15px",
      "border-bottom": "1px solid #dedede"
    });
    $(".invalidInput__password").css({ display: "none" });
    var password;
    password = this.refs.password.value;
    if (password === "" || password.length < 8) {
      if (password === "") {
        $(".invalidInput__password").text(
          getStringVal(this.props.language, "YOU_MUST_ENTER_THE_NEW_PASSWORD")
        );
      } else {
        $(".invalidInput__password").text(
          getStringVal(
            this.props.language,
            "THE_PASSWORD_YOU_ENTERED_IS_CAFE_MUST_BE_YOUR_PASSWORD_CONSISTING_OF_8_DIGITS_OR_LETTERS"
          )
        );
      }
      $(".invalidInput__password").css({ display: "inline-block" });
      $(".changePwPopup__content__form__field.password input").css({
        "margin-bottom": "0",
        "border-bottom": "1px solid #ff552e"
      });
    }
    if (password !== "" && password.length >= 8) {
      this.props.changePwRequest(this.props.language === false ? 1 : 2, password, this.props.queryString);
    }
  }

  onFocusHandle = e => {
    Array.from($(".formInput")).forEach(input => {
      if (!(input.value.length > 0)) {
        // not greater than 0
        $(input)
          .parent(".changePwPopup__content__form__field")
          .addClass("notFocused");
      } else {
        // greater than 0
        $(input)
          .parent(".changePwPopup__content__form__field")
          .removeClass("notFocused");
      }
    });

    $(e.target)
      .parent(".changePwPopup__content__form__field")
      .removeClass("notFocused");
  };

  onBlurHandle = e => {
    if (!(e.target.value.length > 0)) {
      $(e.target)
        .parent(".changePwPopup__content__form__field")
        .addClass("notFocused");
    }
  };

  render() {
    return (
      <div className="changePwPopup">
        <div className="changePwPopup__content boxShadow">
          <div className="changePwPopup__content__header">
            <p>
              {/* تغيير كلمة المرور */}
              {getStringVal(this.props.language, "CHANGE_PASSWORD")}
            </p>
            <p onClick={this.handleClick}>
              {" "}
              <span className="icon-close" />
            </p>
          </div>
          {this.props.changePwReqStatus === false && this.props.changePwMsg !== ""? <div className="changePwPopup__content__fail">
           <div className="changePwPopup__content__fail__content d-flex align-items-center">
               <img src={require('../../images/error.png')} alt="errorMsg"/>
              <p>{this.props.changePwMsg}</p>
            </div>
          </div>:""}
          <div className="changePwPopup__content__form">
            <div className="changePwPopup__content__form__field notFocused password">
              <label for="password">
                {/* كلمة المرور الجديدة */}

                {getStringVal(this.props.language, "NEW_PASSWORD")}
              </label>
              <input
                type="password"
                ref="password"
                className="passwordInput formInput"
                maxLength="50"
                id="password"
                onFocus={e => this.onFocusHandle(e)}
                onBlur={e => this.onBlurHandle(e)}
              />
            </div>

            <h4 className="invalidInput__password"></h4>
            <div className="btnStyle">
              <button onClick={this.handlePwRequest}>
                {/* تغيير كلمه المرور */}
                {getStringVal(this.props.language, "CHANGE_PASSWORD")}
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
    changePwMsg: state.forgetPwReducer.changePwMsg,
    changePwReqStatus: state.forgetPwReducer.changePwReqStatus,
    language: state.generalReducer.language
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changePwRequest(lang, pw, code) {
      dispatch(changePwRequest(lang, pw, code));
    },
    changePwPopUpStatusToggle() {
      dispatch(changePwPopUpStatusToggle());
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePwPopup);
