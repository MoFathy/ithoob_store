import React, { Component } from "react";
import { connect } from "react-redux";
import Link from "next/link";
//scripts
import { getCookie } from "../../scripts/getCookieFile";
import { getStringVal } from "../../scripts/multiLang";

//actions
import {
  updateConfirmationModal,
  updateSizeNameModal,
  updateSuccessModal
} from "../../actions/addMeasurement/closeMeasurementCases.js";
import { loginPopUpStatusToggle } from "../../actions/loginPopUp/loginActions.js";
import {
  saveMeasurement,
  updateSizeFileName,
  editMeasurement
} from "../../actions/addMeasurement/saveMeasurement";

class SizeNamePopup extends Component {
  componentDidMount() {
    require("bootstrap/js/dist/modal");
  }

  componentWillUnmount() {
    this.props.updateSizeNameModal(false);
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.showSizeNameModal !== prevProps.showSizeNameModal &&
      this.props.showSizeNameModal
    ) {
      $("#sizeNameModal").modal("show");
      this.props.updateConfirmationModal(false);
    } else if (this.props.showSizeNameModal !== prevProps.showSizeNameModal) {
      $("#sizeNameModal").modal("hide");
    }
  }

  closeModal = () => {
    this.props.updateSizeNameModal(false);
  };

  submitHandle = e => {
    e.preventDefault();
    if (this.props.ithoobCookie !== -1) {

      if (this.props.profileId == 0) {
        this.props.saveMeasurement(
          this.props.language === false ? 1 : 2,
          getCookie("ithoobUser", "authenticationToken"),
          $("#sizeTitle").val(),
          $("#val1").val(),
          $("#val2").val(),
          $("#val3").val(),
          $("#val4").val(),
          $("#val5").val(),
          $("#val6").val(),
          $("#val7").val(),
          this.props.fromProductDetails,
          this.props.slug,
          this.props.fromMyCart
        );
      } else {
        this.props.editMeasurement(
          this.props.language === false ? 1 : 2,
          getCookie("ithoobUser", "authenticationToken"),
          this.props.profileId,
          this.props.fileName,
          $("#val1").val(),
          $("#val2").val(),
          $("#val3").val(),
          $("#val4").val(),
          $("#val5").val(),
          $("#val6").val(),
          $("#val7").val()
        );
      }
      this.props.updateSuccessModal(true);
    } else {
      this.props.updateSizeNameModal(false);
      this.props.loginPopUpStatusToggle(true);
    }
  };

  activeSumbitBtn = () => {
    if (
      $("#sizeTitle1")
        .val()
        .trim().length == 0
    ) {
      $("#sizeNameSubmitBtn").attr("disabled", true);
    } else {
      $("#sizeNameSubmitBtn").removeAttr("disabled");
    }
    this.props.updateSizeFileName($("#sizeTitle1").val());
  };

  render() {
    return (
      <div
        className="modal fade sizeNameModal"
        tabIndex="-1"
        role="dialog"
        id="sizeNameModal"
        data-backdrop="static"
        data-keyboard="false"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content boxShadow">
            <div className="modal-header">
              <h5 className="modal-title">
                {getStringVal(this.props.language, "NAME_FILE_SIZES")}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={this.closeModal}
              >
                <span aria-hidden="true">
                  {" "}
                  <span className="icon-close" />
                </span>
              </button>
            </div>

            <form onSubmit={this.submitHandle}>
              <div className="modal-body">
                <div className="form-group">
                  <label>{getStringVal(this.props.language, "THE_NAME")}</label>
                  <input
                    type="text"
                    className="form-control"
                    id="sizeTitle1"
                    name="sizeTitle"
                    onChange={this.activeSumbitBtn}
                    maxLength="25"
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="submit"
                  className="button d-block w-100"
                  disabled
                  id="sizeNameSubmitBtn"
                >
                  {getStringVal(this.props.language, "SAVE_THE_FILE_SIZES")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  language: state.generalReducer.language,
  ithoobUser: state.loginReducer.ithoobUser,
  ithoobCookie: state.loginReducer.ithoobCookie,
  showSizeNameModal: state.addMeasurement.showSizeNameModal,
  profileId: state.addMeasurement.profileId,
  fileName: state.addMeasurement.name,
  fromProductDetails: state.addMeasurement.fromProductDetails,
  slug: state.addMeasurement.query.slug,
  fromMyCart: state.addMeasurement.fromMyCart
});

const mapDispatchToProps = dispatch => ({
  updateConfirmationModal: status => {
    dispatch(updateConfirmationModal(status));
  },
  updateSizeNameModal: status => {
    dispatch(updateSizeNameModal(status));
  },
  loginPopUpStatusToggle: value => {
    dispatch(loginPopUpStatusToggle(value));
  },
  updateSuccessModal: status => {
    dispatch(updateSuccessModal(status));
  },
  saveMeasurement: (
    language,
    authorization,
    fileName,
    val1,
    val2,
    val3,
    val4,
    val5,
    val6,
    val7,
    fromProductDetails,
    slug,
    fromMyCart
  ) => {
    dispatch(
      saveMeasurement(
        language,
        authorization,
        fileName,
        val1,
        val2,
        val3,
        val4,
        val5,
        val6,
        val7,
        fromProductDetails,
        slug,
        fromMyCart
      )
    );
  },
  updateSizeFileName: name => {
    dispatch(updateSizeFileName(name));
  },
  editMeasurement: (
    language,
    authorization,
    profileId,
    fileName,
    val1,
    val2,
    val3,
    val4,
    val5,
    val6,
    val7
  ) => {
    dispatch(
      editMeasurement(
        language,
        authorization,
        profileId,
        fileName,
        val1,
        val2,
        val3,
        val4,
        val5,
        val6,
        val7
      )
    );
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SizeNamePopup);
