import React, { Component } from "react";
import { connect } from "react-redux";
import Link from "next/link";
//actions
import {
  updateDataIsChangedStatus,
  saveMeasurement,
  updateSizeFileName,
  editMeasurement
} from "../../actions/addMeasurement/saveMeasurement";
import {
  updateConfirmationModal,
  updateSizeNameModal,
  updateSuccessModal
} from "../../actions/addMeasurement/closeMeasurementCases.js";
import { loginPopUpStatusToggle } from "../../actions/loginPopUp/loginActions.js";
// scripts
import { getStringVal } from "../../scripts/multiLang";
import { getCookie } from "../../scripts/getCookieFile";

class PageHeader extends Component {
  componentDidMount() {
    require("bootstrap/js/dist/modal");
    this.props.updateConfirmationModal(false);
    this.props.updateSizeNameModal(false);
    this.props.updateSuccessModal(false);
  }
  componentWillUnmount() {
    this.props.updateConfirmationModal(false);
    this.props.updateSizeNameModal(false);
    this.props.updateSuccessModal(false);
    $("#confirmationModal").modal("hide");
    $("#sizeNameModal").modal("hide");
    $("#successModal").modal("hide");
  }
  addNewSizeFile = () => {
    if ($("#sizeTitle").val().length > 0) {
      if (this.props.ithoobCookie !== -1) {

        if (this.props.profileId == 0) {
          ///to add new

          if ($(".active.innerFooter input").val().length > 0) {
            if (
              parseFloat($(".active.innerFooter input").val()) >=
                this.props.minVal &&
              parseFloat($(".active.innerFooter input").val()) <=
                this.props.maxVal
            ) {
              this.props.updateConfirmationModal(false);
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
              this.props.updateSuccessModal(true);
              $(".PageFooter__errMsg.active p").css({ opacity: 0 });
            } else {
              $(".PageFooter__errMsg.active p").css({ opacity: 1 });
            }
          } else {
            this.props.updateConfirmationModal(false);
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
            this.props.updateSuccessModal(true);
          }

          ///////////////////this.props.profileId == 0
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
          this.props.updateSuccessModal(true);
        }
      } else {
        this.props.updateConfirmationModal(false);
        this.props.loginPopUpStatusToggle(true);
      }
    } else {
      this.props.updateSizeNameModal(true);
    }
  };

  showConfirmationModal = () => {
    this.props.updateConfirmationModal(true);
  };

  changeHandle = () => {
    this.props.updateDataIsChangedStatus(true);
    this.props.updateSizeFileName($("#sizeTitle").val());
  };
  render() {
    const { name, dataIsChanged, language } = this.props;
    return (
      <div className="pageHeaderContainer">
        <div className="container">
          <div className="pageHeader">
            <div className="fileName">
              <label>{getStringVal(language, "ENTER_THE_NAME_OF_SIZE")}:</label>

              <input
                type="text"
                placeholder={getStringVal(language, "NEW_SIZE")}
                defaultValue={name}
                onChange={this.changeHandle}
                id="sizeTitle"
                required
                maxLength="25"
              />
              <p className="tooltip">
                {getStringVal(
                  language,
                  "NAME_THE_FILE_SIZES_TO_REACH_IT_FASTER"
                )}
              </p>
            </div>
            <div className="buttonsContainer">
              <button className="button" onClick={this.addNewSizeFile}>
                {getStringVal(language, "SAVE_THE_FILE_SIZES")}
              </button>

              {dataIsChanged ? (
                <span className="closeBtn" onClick={this.showConfirmationModal}>
                  <span className="icon-close"></span>
                </span>
              ) : (
                <Link href="/my-measurments" as="/my-measurements">
                  <a className="closeBtn">
                    <span className="icon-close"></span>
                  </a>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  language: state.generalReducer.language,
  name: state.addMeasurement.name,
  dataIsChanged: state.addMeasurement.dataIsChanged,
  ithoobUser: state.loginReducer.ithoobUser,
  ithoobCookie: state.loginReducer.ithoobCookie,

  measurementDetailsStatus: state.addMeasurement.measurementDetailsStatus,
  profileDetails: state.addMeasurement.profileDetails,
  profileId: state.addMeasurement.profileId,
  value1: state.addMeasurement.value1,
  value2: state.addMeasurement.value2,
  value3: state.addMeasurement.value3,
  value4: state.addMeasurement.value4,
  value5: state.addMeasurement.value5,
  value6: state.addMeasurement.value6,
  value7: state.addMeasurement.value7,
  value8: state.addMeasurement.value8,
  value9: state.addMeasurement.value9,
  value10: state.addMeasurement.value10,
  value11: state.addMeasurement.value11,
  value12: state.addMeasurement.value12,
  currentVal: state.addMeasurement.currentVal,
  minVal: state.addMeasurement.minVal,
  maxVal: state.addMeasurement.maxVal,
  fromProductDetails: state.addMeasurement.fromProductDetails,
  slug: state.addMeasurement.query.slug,
  fromMyCart: state.addMeasurement.fromMyCart
});

const mapDispatchToProps = dispatch => ({
  updateDataIsChangedStatus: status => {
    dispatch(updateDataIsChangedStatus(status));
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
  updateSizeFileName: name => {
    dispatch(updateSizeFileName(name));
  },
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
        val12,
      )
    );
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PageHeader);
