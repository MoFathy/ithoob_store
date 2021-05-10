import React, { Component } from "react";
import { connect } from "react-redux";
import Link from "next/link";
//scripts
import { getCookie } from "../../scripts/getCookieFile";
import { getStringVal } from "../../scripts/multiLang";

//actions
import {
  updateSizeNameModal,
  updateSuccessModal
} from "../../actions/addMeasurement/closeMeasurementCases.js";
import { loginPopUpStatusToggle } from "../../actions/loginPopUp/loginActions.js";

class SuccessPopup extends Component {
  componentDidMount() {
    require("bootstrap/js/dist/modal");
  }

  componentWillUnmount() {
    this.props.updateSuccessModal(false);
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.showSuccessModal !== prevProps.showSuccessModal &&
      this.props.showSuccessModal
    ) {
      $("#successModal").modal("show");
      this.props.updateSizeNameModal(false);
    } else if (this.props.showSuccessModal !== prevProps.showSuccessModal) {
      $("#successModal").modal("hide");
      this.props.updateSuccessModal(false);
    }
  }
  closeModal = () => {
    this.props.updateSuccessModal(false);
  };
  render() {
    const { name, saveMeasurementStatus, saveMeasurementMessage } = this.props;
    return (
      <div
        className="modal fade successModal"
        tabIndex="-1"
        role="dialog"
        id="successModal"
        data-backdrop="static"
        data-keyboard="false"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content boxShadow">
            <div className="modal-header">
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
            {saveMeasurementStatus ? (
              <div className="modal-body">
                <img src={require('../../images/tick.png')} alt="" className="mb-3 mx-auto d-block" />
                <h3 className="text-center">
                  {getStringVal(
                    this.props.language,
                    "FILE_SIZES_HAVE_BEEN_ADDED"
                  )}{" "}
                  <span className="sizeName">{name}</span>{" "}
                  {getStringVal(this.props.language, "SUCCESSFULLY_ADDED")}
                </h3>
              </div>
            ) : (
              <div className="modal-body">
                {/* <img src={require('../../images/error.png')} alt="" className="mb-3 mx-auto d-block" /> */}
                <h3 className="text-center">{saveMeasurementMessage}</h3>
              </div>
            )}
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
  showSuccessModal: state.addMeasurement.showSuccessModal,
  saveMeasurementStatus: state.addMeasurement.saveMeasurementStatus,
  saveMeasurementMessage: state.addMeasurement.saveMeasurementMessage,
  name: state.addMeasurement.name
});

const mapDispatchToProps = dispatch => ({
  updateSizeNameModal: status => {
    dispatch(updateSizeNameModal(status));
  },

  updateSuccessModal: status => {
    dispatch(updateSuccessModal(status));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SuccessPopup);
