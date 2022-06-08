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
  editMeasurement
} from "../../actions/addMeasurement/saveMeasurement";
class ConfirmationPopup extends Component {
  componentDidMount() {
    require("bootstrap/js/dist/modal");
  }

  componentWillUnmount() {
    $("#confirmationModal").modal("hide");
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.showConfirmationModal !== prevProps.showConfirmationModal &&
      this.props.showConfirmationModal
    ) {
      $("#confirmationModal").modal("show");
    } else if (
      this.props.showConfirmationModal !== prevProps.showConfirmationModal
    ) {
      $("#confirmationModal").modal("hide");
    }
  }

  closeModal = () => {
    $("#confirmationModal").modal("hide");
    this.props.updateConfirmationModal(false);
  };

  submitHandle = e => {
    e.preventDefault();
    if (this.props.name && this.props.name.length > 0) {
      if (this.props.ithoobCookie !== -1) {
        this.props.updateConfirmationModal(false);

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
            $("#val8").val(),
            $("#val9").val(),
            $("#val10").val(),
            $("#val11").val(),
            $("#val12").val(),
            this.props.fromProductDetails,
            this.props.slug,
            this.props.fromMyCart
          );
        } else {
          this.props.editMeasurement(
            this.props.language === false ? 1 : 2,
            getCookie("ithoobUser", "authenticationToken"),
            this.props.profileId,
            $("#sizeTitle").val(),
            $("#val1").val(),
            $("#val2").val(),
            $("#val3").val(),
            $("#val4").val(),
            $("#val5").val(),
            $("#val6").val(),
            $("#val7").val(),
            $("#val8").val(),
            $("#val9").val(),
            $("#val10").val(),
            $("#val11").val(),
            $("#val12").val(),
          );
        }

        this.props.updateSuccessModal(true);
      } else {
        this.props.updateConfirmationModal(false);
        this.props.loginPopUpStatusToggle(true);
      }
    } else {
      this.props.updateSizeNameModal(true);
    }
  };

  render() {
    return (
      <div
        className="modal fade confirmationModal"
        tabIndex="-1"
        role="dialog"
        id="confirmationModal"
        data-backdrop="static"
        data-keyboard="false"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content boxShadow">
            <div className="modal-header">
              <h5 className="modal-title">
                {getStringVal(
                  this.props.language,
                  "OUT_OF_THE_SITUATION_TAKE_MEASUREMENTS"
                )}
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
                <p>
                  {getStringVal(
                    this.props.language,
                    "DO_YOU_WANT_TO_GET_OUT_OF_THE_SITUATION_TAKE_MEASUREMENTS_YOU_WILL_HARNESS_ALL_THE_CHANGES_YOU_HAVE_MADE_AND_WILL_NOT_BE_ABLE_TO_RETRIEVE_IT_AGAIN"
                  )}
                </p>
              </div>

              <div className="modal-footer">
                <button type="submit" className="button d-block w-100">
                  {getStringVal(this.props.language, "REMEMBER_MQASATY_FILE")}
                </button>

                <Link href="/my-measurments" as="/my-measurements">
                  <button type="submit" className="button d-block w-100">
                    {getStringVal(this.props.language, "I_WANT_TO_GO_OUT")}
                  </button>
                </Link>
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
  showConfirmationModal: state.addMeasurement.showConfirmationModal,
  name: state.addMeasurement.name,
  profileId: state.addMeasurement.profileId,
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
  updateSuccessModal: status => {
    dispatch(updateSuccessModal(status));
  },
  loginPopUpStatusToggle: value => {
    dispatch(loginPopUpStatusToggle(value));
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
    val8,
    val9,
    val10,
    val11,
    val12,
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
        val8,
        val9,
        val10,
        val11,
        val12,
        fromProductDetails,
        slug,
        fromMyCart
      )
    );
  },
  editMeasurement: (
    language,
    authorization,
    profileId,
    name,
    val1,
    val2,
    val3,
    val4,
    val5,
    val6,
    val7,
    val8,
    val9,
    val10,
    val11,
    val12,
  ) => {
    dispatch(
      editMeasurement(
        language,
        authorization,
        profileId,
        name,
        val1,
        val2,
        val3,
        val4,
        val5,
        val6,
        val7,
        val8,
        val9,
        val10,
        val11,
        val12
      )
    );
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationPopup);
