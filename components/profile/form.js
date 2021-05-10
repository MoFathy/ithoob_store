import React, { Component } from "react";
import CitiesDropdown from "../includes/citiesDropdown";
import { connect } from "react-redux";
import { getStringVal } from "../../scripts/multiLang";

//actions
import {
  updateProfileInfo,
  deleteMassage,
  updateSubmitStatus
} from "../../actions/profile/profileActions";
import { getCookie } from "../../scripts/getCookieFile";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addressIsValid: true,
      nameIsRequired: true,
      nameLengthIsValide: true
    };
  }

  componentDidMount() {
    this.props.updateSubmitStatus(false);
  }
  componentWillUnmount() {
    this.props.updateSubmitStatus(false);
  }

  showModal = () => {
    this.props.deleteMassage();
    $("#changePasswordModal").modal("show");
    this.props.updateSubmitStatus(false);
  };

  submitHandler = e => {
    e.preventDefault();
    const ithoobUserObj = this.props.ithoobUser
      ? JSON.parse(this.props.ithoobUser)
      : null;
    const authToken = this.props.ithoobUser
      ? ithoobUserObj.authenticationToken
      : null;

    if (
      ($("#name").val().length < 3 || $("#name").val().length > 49) &&
      !$("#address").val().length == 0 &&
      !($("#address").val().length >= 20 && $("#address").val().length < 101)
    ) {
      this.setState({
        nameIsRequired: true,
        nameLengthIsValide: false,
        addressIsValid: false
      });
    } else if ($("#name").val().length == 0) {
      this.setState({ nameIsRequired: false, nameLengthIsValide: true });
    } else if ($("#name").val().length < 3 || $("#name").val().length > 49) {
      this.setState({ nameLengthIsValide: false, nameIsRequired: true });
    } else if (
      $("#name").val().length > 2 &&
      $("#name").val().length < 51 &&
      ($("#address").val().length == 0 ||
        ($("#address").val().length >= 20 && $("#address").val().length < 101))
    ) {
      this.setState({
        nameIsRequired: true,
        nameLengthIsValide: true,
        addressIsValid: true
      });
      this.props.updateProfileInfo(
        this.props.language === false ? 1 : 2,
        getCookie("ithoobUser", "authenticationToken"),
        $("#name").val(),
        $("#address").val(),
        $("#dropdownMenuButton2").attr("data-id")
      );
    } else if ($("#address").val().length == 0) {
      this.setState({ addressIsValid: true });
    } else if (
      $("#address").val().length < 3 ||
      $("#address").val().length < 99
    ) {
      this.setState({ addressIsValid: false });
    }
  };

  handleChange = e => {
    $("#submit").attr("disabled", false);
    if (!/^[a-zA-Zء-ي ]*$/g.test($("#name").val())) {
      $(".invalid-feedback.splChar").css({ display: "inline-block" });
    } else {
      $(".invalid-feedback.splChar").css({ display: "none" });
    }
    this.props.updateSubmitStatus(false);
    this.setState({
      nameIsRequired: true,
      nameLengthIsValide: true,
      addressIsValid: true
    });
  };

  render() {
    var style = {
      display: "none"
    };
    return (
      <div className="formContainer">
        <h1 className="title">
          {getStringVal(this.props.language, "MY_PERSONAL")}
        </h1>
        <form onSubmit={this.submitHandler}>
          <div className="row">
            <div className="col-12 col-md-6">
              <h4>{getStringVal(this.props.language, "BASIC_INFORMATION")}</h4>
              <div className="form-group">
                <label>{getStringVal(this.props.language, "THE_NAME")}</label>
                <input
                  type="text"
                  className={
                    this.state.nameIsRequired && this.state.nameLengthIsValide
                      ? "form-control"
                      : "form-control is-invalid"
                  }
                  defaultValue={this.props.personalInfo.name}
                  id="name"
                  // required={true}
                  // minLength="3"
                  // maxLength="50"
                  onChange={e => this.handleChange(e)}
                />
                {
                  <div className="invalid-feedback splChar" style={style}>
                    {getStringVal(
                      this.props.language,
                      "SHOULD_NOT_CONTAIN_SPECIAL_CHARACTERS"
                    )}
                    .
                  </div>
                }
                {this.state.nameIsRequired ? (
                  ""
                ) : (
                  <div className="invalid-feedback">
                    {getStringVal(
                      this.props.language,
                      "PLEASE_ENTER_YOUR_NAME"
                    )}
                    .
                  </div>
                )}
                {this.state.nameLengthIsValide ? (
                  ""
                ) : (
                  <div className="invalid-feedback">
                    {getStringVal(
                      this.props.language,
                      "NAME_YOU_MUST_BE_BETWEEN_3_TO_50_CHARACTERS"
                    )}
                  </div>
                )}
              </div>
              <div className="form-group email">
                <label>{getStringVal(this.props.language, "E_MAIL")}</label>
                <input
                  type="email"
                  className="form-control"
                  defaultValue={this.props.personalInfo.email}
                  readOnly
                />
              </div>
              {this.props.fbStatus !== true &&
              this.props.gooStatus !== true &&
              this.props.twiStatus !== true ? (
                <div className="form-group">
                  <label>{getStringVal(this.props.language, "PASSWORD")}</label>
                  <button
                    type="button"
                    className="btn forgetPasswordBtn"
                    onClick={this.showModal}
                  >
                    {getStringVal(
                      this.props.language,
                      "DO_YOU_WANT_TO_CHANGE_YOUR_PASSWORD"
                    )}
                    <span>
                      {getStringVal(this.props.language, "PRESS_HERE")}
                    </span>
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="col-12 col-md-6">
              <h4>{getStringVal(this.props.language, "CONTACT_INFO")}</h4>
              <div className="form-group">
                <label>{getStringVal(this.props.language, "MOBILE")}</label>
                <input
                  type="text"
                  className="form-control mobile"
                  defaultValue={this.props.contactInfo.mobileNo}
                  readOnly
                />
              </div>
              <CitiesDropdown
                fromSignUpForm={false}
                onChange={e => this.handleChange(e)}
                defaultCity={this.props.contactInfo.city}
                defaultCountry={this.props.contactInfo.country}
              />
              <div className="form-group">
                <label>
                  {getStringVal(this.props.language, "TITLE_OPTIONAL")}
                </label>
                <input
                  type="text"
                  className={
                    this.state.addressIsValid
                      ? "form-control"
                      : "form-control is-invalid"
                  }
                  defaultValue={this.props.contactInfo.optionalAdd}
                  id="address"
                  // minLength="3"
                  // maxLength="100"
                  onChange={e => this.handleChange(e)}
                />
                <div className="invalid-feedback">
                  {getStringVal(
                    this.props.language,
                    "TITLE_MUST_BE_BETWEEN_3_TO_100_CHARACTERS"
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div
                className={
                  this.props.submitStatus == true
                    ? "alert alert-success d-block"
                    : "alert alert-success d-none"
                }
              >
                {getStringVal(
                  this.props.language,
                  "YOUR_INFORMATION_HAS_BEEN_UPDATED_SUCCESSFULLY"
                )}
              </div>
              <button
                id="submit"
                type="submit"
                className="button"
                disabled
                // onClick={this.submitHandler}
              >
                {getStringVal(this.props.language, "SAVING_INFORMATION")}
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapFormStateToProps = state => ({
  language: state.generalReducer.language,
  ithoobUser: state.loginReducer.ithoobUser,
  submitStatus: state.profile.submitStatus,
  submitMessage: state.profile.submitMessage,
  status: state.profile.status,
  message: state.profile.message,
  personalInfo: state.profile.personalInfo,
  contactInfo: state.profile.contactInfo,
  fbStatus: state.socialMediaReducer.fbStatus,
  twiStatus: state.socialMediaReducer.twiStatus,
  gooStatus: state.socialMediaReducer.gooStatus
});

const mapFormDispatchToProps = dispatch => ({
  updateProfileInfo: (language, authorization, name, address, areaId) => {
    dispatch(updateProfileInfo(language, authorization, name, address, areaId));
  },
  deleteMassage: () => {
    dispatch(deleteMassage());
  },
  updateSubmitStatus: status => {
    dispatch(updateSubmitStatus(status));
  }
});

export default connect(mapFormStateToProps, mapFormDispatchToProps)(Form);
