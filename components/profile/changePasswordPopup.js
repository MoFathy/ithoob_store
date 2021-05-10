import React, { Component } from "react";
import { connect } from "react-redux";
//actions
import { getCookie } from "../../scripts/getCookieFile";
import { getStringVal } from "../../scripts/multiLang";

import {
  changePassword,
  changePasswordFail,
  deleteMassage
} from "../../actions/profile/profileActions";
class ChangePasswordPopup extends Component {
  componentDidMount() {
    require("bootstrap/js/dist/modal");
  }

  onClickClose = e => {
    e.preventDefault();
    $("#oldPassword").val("");
    $("#newPassword").val("");
  };

  clickHandler = e => {
    e.preventDefault();
    this.props.deleteMassage();
    // getCookie("ithoobUser", "authenticationToken");
    if ($("#newPassword").val().length == 0 || $("#newPassword").val() == "") {
      this.props.changePasswordFail({
        status: false,
        message: getStringVal(
          this.props.language,
          "YOU_MUST_FILL_IN_THE_PASSWORD"
        )
      });
    } else if (
      $("#newPassword").val().length > 0 &&
      $("#newPassword").val().length < 8
    ) {
      this.props.changePasswordFail({
        status: false,
        message: getStringVal(
          this.props.language,
          "THE_NEW_PASSWORD_YOU_ENTERED_IS_CAFE_MUST_BE_YOUR_PASSWORD_CONSISTING_OF_8_DIGITS_OR_CHARACTERS"
        )
      });
    } else if ($("#newPassword").val().length >= 8) {
      this.props.changePassword(
        this.props.language === false ? 1 : 2,
        getCookie("ithoobUser", "authenticationToken"),
        $("#oldPassword").val(),
        $("#newPassword").val()
      );
      $("#oldPassword").val("");
      $("#newPassword").val("");
    }
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.changePasswordStatus !== prevProps.changePasswordStatus &&
      this.props.changePasswordStatus == true
    ) {
      $("#changePasswordModal").modal("hide");
      $("#passwordSuccessAlert").modal("show");
      setTimeout(() => {
        $("#passwordSuccessAlert").modal("hide");
      }, 1000);
    }
  }

  render() {
    return (
      <div className="changepPassword">
        <div
          className="modal fade"
          tabIndex="-1"
          role="dialog"
          id="changePasswordModal"
          data-backdrop="static"
          data-keyboard="false"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content boxShadow">
              <div className="modal-header">
                <h5 className="modal-title">
                  {getStringVal(this.props.language, "CHANGE_PASSWORD_TEXT")}
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={this.onClickClose}
                >
                  <span aria-hidden="true">
                    {" "}
                    <span className="icon-close" />
                  </span>
                </button>
              </div>
              <form onSubmit={this.clickHandler}>
                <div className="modal-body">
                  {this.props.changePasswordMessage.length > 0 ? (
                    <div className="alert alert-danger d-block">
                      <img src={require('../../images/error.png')} alt="password error" />
                      {this.props.changePasswordMessage}
                    </div>
                  ) : (
                    ""
                  )}

                  <div className="form-group">
                    <label>
                      {getStringVal(this.props.language, "CURRENT_PASSWORD")}
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="oldPassword"
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      {getStringVal(this.props.language, "NEW_PASSWORD")}
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="newPassword"
                    />
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="submit" className="button d-block w-100">
                    {getStringVal(this.props.language, "CHANGE_PASSWORD")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div
          tabIndex="-1"
          role="dialog"
          id="passwordSuccessAlert"
          className="modal fade"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content boxShadow">
              <div className="modal-body">
                <div className="alert alert-success text-center mb-0">
                  <img src={require('../../images/tick.png')} alt="password changed" className="mb-3" />
                  <p className="text-center">
                    {getStringVal(
                      this.props.language,
                      "PASSWORD_CHANGED_SUCCESSFULLY"
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapChangePasswordStateToProps = state => ({
  language: state.generalReducer.language,
  ithoobUser: state.loginReducer.ithoobUser,
  changePasswordStatus: state.profile.changePasswordStatus,
  changePasswordMessage: state.profile.changePasswordMessage,
  status: state.profile.status,
  message: state.profile.message
});

const mapChangePasswordDispatchToProps = dispatch => ({
  changePassword: (language, authorization, oldPassword, newPassword) => {
    dispatch(changePassword(language, authorization, oldPassword, newPassword));
  },
  changePasswordFail: payload => {
    dispatch(changePasswordFail(payload));
  },
  deleteMassage: () => {
    dispatch(deleteMassage());
  }
});

export default connect(
  mapChangePasswordStateToProps,
  mapChangePasswordDispatchToProps
)(ChangePasswordPopup);
