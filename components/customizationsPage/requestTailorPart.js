import React, { Component } from "react";
import { connect } from "react-redux";
import { getCookie } from "../../scripts/getCookieFile";

import { getStringVal } from "../../scripts/multiLang";
import { requestTailor, requestTailorPopupToggle } from "../../actions/requestTailor/requestTailorActions";
import { loginPopUpStatusToggle } from "../../actions/loginPopUp/loginActions";
export class RequestTailorPart extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleRequestTailor = this.handleRequestTailor.bind(this);
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
  handleClick() {
    this.props.requestTailorPopupToggle(false);
  }
  handleRequestTailor() {
    if(!getCookie("ithoobUser", "authenticationToken")){
        this.props.loginPopUpStatusToggle(true);
        return
    }
    $(
      ".signupPopup__content__form__field.password input,.signupPopup__content__form__field.email input,.signupPopup__content__form__field.mobile input,.signupPopup__content__form__field.address input,.signupPopup__content__form__field.region select"
    ).css({ "border-bottom": "1px solid #dedede" });
    $(
      ".invalidInput__milestone,.invalidInput__from,.invalidInput__to,.invalidInput__street,.invalidInput__naighborhood,.invalidInput__region"
    ).css({ display: "none" });
    
    var naighborhood, street, milestone, from, details, to, region, pieces_number;
    
    milestone = this.refs.milestone.value;
    details = this.refs.details.value;
    naighborhood = this.refs.naighborhood.value;
    street = this.refs.street.value;
    from = this.refs.from.value;
    to = this.refs.to.value;
    region = "الرياض";
    pieces_number = this.refs.pieces_number.value;


    this.props.requestTailor(
      this.props.language === false ? 1 : 2,
      getCookie("ithoobUser", "authenticationToken"),
      {
      region, naighborhood, street, milestone, from, details, to, pieces_number
      }
    )
  }

  
  onFocusHandle = (e) => {
    Array.from($(".formInput")).forEach((input) => {
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

  onBlurHandle = (e) => {
    if (!(e.target.value.length > 0)) {
      $(e.target)
        .parent(".signupPopup__content__form__field")
        .addClass("notFocused");
    }
  };


  render() {
    return (
      <div className=" requestTailorPart">
        <div className="requestTailor_content boxShadow">
          <div className="signupPopup__content__header">
            <p>{getStringVal(this.props.language, "REQUEST_TAILOR")}</p>
          </div>

          {this.props.requestTailorState.requestTailorMessage !== "" ? (
            <div className="signupPopup__content__fail">
              <div className="signupPopup__content__fail__content d-flex align-items-center">
                <img src={require("../../images/error.png")} alt="errorMsg" />
                <p>
                  {this.props.requestTailorState.requestTailorMessage}
                  &nbsp;&nbsp;
                </p>
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="signupPopup__content__form">
            <div className="row">
              <div className="col-6">
                <div className="signupPopup__content__form__field notFocused region">
                  <label htmlFor="region">
                    {getStringVal(this.props.language, "REGION")}
                  </label>
                  <input
                    type="text"
                    ref="region"
                    className="nameInput formInput"
                    id="region"
                    onFocus={(e) => this.onFocusHandle(e)}
                    onBlur={(e) => this.onBlurHandle(e)}
                    disabled
                    value="الرياض"
                  />
                </div>
                <p className="invalidInput__region" />
              </div>
              <div className="col-6">
                <div className="signupPopup__content__form__field notFocused naighborhood">
                  <label htmlFor="naighborhood">
                    {getStringVal(this.props.language, "THE_NAIGHBORHOOD")}
                  </label>
                  <input
                    type="text"
                    ref="naighborhood"
                    className="nameInput formInput"
                    maxLength="25"
                    id="naighborhood"
                    onFocus={(e) => this.onFocusHandle(e)}
                    onBlur={(e) => this.onBlurHandle(e)}
                  />
                </div>
                <p className="invalidInput__naighborhood" />
              </div>
              <div className="col-6">
                <div className="signupPopup__content__form__field notFocused street">
                  <label htmlFor="street">
                    {getStringVal(this.props.language, "THE_STREET")}
                  </label>
                  <input
                    type="text"
                    ref="street"
                    maxLength="15"
                    className="formInput"
                    id="street"
                    onFocus={(e) => this.onFocusHandle(e)}
                    onBlur={(e) => this.onBlurHandle(e)}
                  />
                </div>

                <p className="invalidInput__street" />
              </div>
              <div className="col-6">
                <div className="signupPopup__content__form__field notFocused milestone">
                  <label htmlFor="milestone">
                    {getStringVal(this.props.language, "NERABY_MILESTONE")}
                  </label>
                  <input
                    type="text"
                    ref="milestone"
                    maxLength="15"
                    className="formInput"
                    id="milestone"
                    onFocus={(e) => this.onFocusHandle(e)}
                    onBlur={(e) => this.onBlurHandle(e)}
                  />
                </div>
                <p className="invalidInput__milestone" />

              </div>
              <div className="col-12">
                <div className="signupPopup__content__form__field notFocused details">
                  <label htmlFor="details">
                    {getStringVal(this.props.language, "OTHER_DETAILS")}
                  </label>
                  <textarea
                    className="form-control"
                    rows="3"
                    type="text"
                    ref="details"
                    maxLength="15"
                    className="formInput"
                    id="details"
                    onFocus={(e) => this.onFocusHandle(e)}
                    onBlur={(e) => this.onBlurHandle(e)}
                  ></textarea>
                </div>

              </div>
              <div className="col-12">
                <p className="mt-2">{getStringVal(this.props.language, "THE_SUITABLE_TIME")}</p>
              </div>
              <div className="col-6">

                <div className="signupPopup__content__form__field notFocused from">
                  <label htmlFor="from" className="time-label">
                    {getStringVal(this.props.language, "FROM")}
                  </label>
                  <input
                    type="time"
                    ref="from"
                    maxLength="15"
                    className="formInput"
                    id="from"
                    onFocus={(e) => this.onFocusHandle(e)}
                    onBlur={(e) => this.onBlurHandle(e)}
                  />
                </div>
                <p className="invalidInput__from" />

              </div>
              <div className="col-6">
                <div className="signupPopup__content__form__field notFocused to">
                  <label htmlFor="to" className="time-label">
                    {getStringVal(this.props.language, "TO")}
                  </label>
                  <input
                    type="time"
                    ref="to"
                    maxLength="15"
                    className="formInput"
                    id="to"
                    onFocus={(e) => this.onFocusHandle(e)}
                    onBlur={(e) => this.onBlurHandle(e)}
                  />
                </div>
                <p className="invalidInput__to" />
              </div>
              <div className="col-6">
                <div className="signupPopup__content__form__field notFocused pieces_number">
                  <label htmlFor="pieces_number">
                    {getStringVal(this.props.language, "PIECES_NUMBER")}
                  </label>
                  <input
                    type="number"
                    ref="pieces_number"
                    min="1"
                    className="formInput"
                    id="pieces_number"
                    onFocus={(e) => this.onFocusHandle(e)}
                    onBlur={(e) => this.onBlurHandle(e)}
                  />
                </div>
                <p className="invalidInput__pieces_number" />
              </div>
              <div className="col-12">
                <p className="mt-2"> <span className="hint">*</span> {getStringVal(this.props.language, "PIECES_NUMBER_HENT")}</p>
              </div>
            </div>

            <div className="btnStyle">
              <button onClick={this.handleRequestTailor}>
                {getStringVal(this.props.language, "CONFIRM_REQUEST")}
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
    language: state.generalReducer.language,
    requestTailorState: state.requestTailorReducer,
    countries: state.signupReducer.countries,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    requestTailorPopupToggle(value) {
      dispatch(requestTailorPopupToggle(value));
    },
    requestTailor(language, user, data){
      dispatch(requestTailor(language, user, data))
    },
    loginPopUpStatusToggle(value) {
        dispatch(loginPopUpStatusToggle(value));
      },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestTailorPart);
