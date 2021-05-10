import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fpwPopUpStatusToggle,
  fpwRequest
} from "../../actions/fpwPopUp/fpwActions";
import { getStringVal } from "../../scripts/multiLang";
export class FpwPopup extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleEmaiRequest = this.handleEmaiRequest.bind(this);
  }
  handleClick(e) {
    this.props.fpwPopUpStatusToggle(false);
  }
  componentDidMount() {
    //remove "error" msg on focus
    // $('body').on('focusin','.emailInput',function(){
    //   $(".fpwPopup__content__form__field.email input").css({'border-bottom':'1px solid #6ebe32'});
    //   let display = $(".invalidInput__email").css('display');
    //   if(display !== 'none'){
    //     console.log("make noene")
    //       $(".invalidInput__email").css({'display':'none'});
    //       $(".fpwPopup__content__form__field.email input").css({'margin-bottom':'15px'});
    //   }
    // })
    // $('body').on('focusout','.emailInput',function(){
    //       $(".fpwPopup__content__form__field.email input").css({'border-bottom':'1px solid #dedede'});
    // })
  }
  handleEmaiRequest() {
    var email;
    email = this.refs.email.value;
    var isEmail = /^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/.test(
      email
    );
    $(".fpwPopup__content__form__field.email input").css({
      "margin-bottom": "15px",
      "border-bottom": "1px solid #dedede"
    });
    $(".invalidInput__email").css({ display: "none" });
    // if empty email input...get msg and change input bottom border
    if (email == "" || email.length < 7 || !isEmail) {
      $(".invalidInput__email").text(
        getStringVal(
          this.props.language,
          "THIS_E_MAIL_IS_INCORRECT_PLEASE_MAKE_SURE_OF_IT_AND_TRY_AGAIN"
        )
      );
      $(".invalidInput__email").css({ display: "inline-block" });
    }
    if (email !== "" && isEmail) {
      this.props.fpwRequest(
        this.props.language === false ? 1 : 2,
        email,
        window.location.href
      );
    }
  }

  onFocusHandle = e => {
    Array.from($(".formInput")).forEach(input => {
      if (!(input.value.length > 0)) {
        $(input)
          .parent(".fpwPopup__content__form__field")
          .addClass("notFocused");
      } else {
        $(input)
          .parent(".fpwPopup__content__form__field")
          .removeClass("notFocused");
      }
    });

    $(e.target)
      .parent(".fpwPopup__content__form__field")
      .removeClass("notFocused");
  };

  onBlurHandle = e => {
    if (!(e.target.value.length > 0)) {
      $(e.target)
        .parent(".fpwPopup__content__form__field")
        .addClass("notFocused");
    }
  };

  render() {
    return (
      <div
        className="fpwPopup"
        style={
          this.props.fpwPopUpStatus === true
            ? { display: "flex" }
            : { display: "none" }
        }
      >
        <div className="fpwPopup__content boxShadow">
          <div className="fpwPopup__content__header">
            <p>
              {/* استرجاع كلمه المرور */}

              {getStringVal(this.props.language, "PASSWORD_RECOVERY")}
            </p>
            <p onClick={e => this.handleClick(e)}>
              {" "}
              <span className="icon-close" />
            </p>
          </div>
          {this.props.emailRequestStatus === false &&
          this.props.fpwMsg !== "" ? (
            <div className="fpwPopup__content__fail">
              <div className="fpwPopup__content__fail__content d-flex align-items-center">
                <img src={require('../../images/error.png')} alt="errorMsg" />
                <p>{this.props.fpwMsg}</p>
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="fpwPopup__content__form">
            <div className="fpwPopup__content__form__field notFocused email">
              <label for="email">
                {/* البريد الإلكترونى */}
                {getStringVal(this.props.language, "E_MAIL")}
              </label>
              <input
                type="email"
                ref="email"
                className="emailInput formInput"
                maxLength="50"
                id="email"
                onFocus={e => this.onFocusHandle(e)}
                onBlur={e => this.onBlurHandle(e)}
              />
            </div>
            <h4 className="invalidInput__email" />
            <div className="btnStyle">
              <button onClick={this.handleEmaiRequest}>
                {/* أسترجاع كلمه المرور */}

                {getStringVal(this.props.language, "PASSWORD_RECOVERY")}
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
    fpwPopUpStatus: state.forgetPwReducer.fpwPopUpStatus,
    emailRequestStatus: state.forgetPwReducer.emailRequestStatus,
    fpwMsg: state.forgetPwReducer.fpwMsg,
    language: state.generalReducer.language
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fpwPopUpStatusToggle(value) {
      dispatch(fpwPopUpStatusToggle(value));
    },
    fpwRequest(lang, email, url) {
      dispatch(fpwRequest(lang, email, url));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FpwPopup);
