import React, { Component } from "react";
import { connect } from "react-redux";
//components
import SizeSection from "../includes/measurementPart";
import {
  updateSize,
  updateMeasurementErrMsg
} from "../../actions/myCart/editSizeActions";
import { getCartItems } from "../../actions/myCart/myCartActions";
// actions
import { getCookie } from "../../scripts/getCookieFile";
import { getStringVal } from "../../scripts/multiLang";
import {
  updateErrMsgStatus,
  updateMeasurementsIsComplateStatus
} from "../../actions/myCart/myCartActions";
import {
  userMeasureId,
  storeSizeID
} from "../../actions/includes/carouselActions";
class EditSize extends Component {
  compnentDidMount() {
    const $ = require("jquery");
  }

  updateSize = id => {
    if (Number.isInteger(this.props.size)) {
      if (this.props.savedSizes.length > 0) {
        let size = this.props.savedSizes.find(
          size => size.id == this.props.size
        );
        if (size.complete) {
          this.props.updateSize(
            this.props.language === false ? 1 : 2,
            getCookie("ithoobUser", "authenticationToken"),
            id,
            this.props.sizeManFlag,
            this.props.size
          );
          this.props.updateErrMsgStatus(false);
          this.props.updateMeasurementsIsComplateStatus(true);
        } else {
          this.props.updateMeasurementErrMsg(
            getStringVal(
              this.props.language,
              "SELECTED_SIZES_IS_INCOMPLETE_FILE_MUST_BE_COMPLETED_OR_CHOOSE_ANOTHER_SIZE"
            )
          );
        }
      }
    } else if (
      this.props.sizeManFlag == true ||
      this.props.size == "s" ||
      this.props.size == "m" ||
      this.props.size == "l"
    ) {
      this.props.updateSize(
        this.props.language === false ? 1 : 2,
        getCookie("ithoobUser", "authenticationToken"),
        id,
        this.props.sizeManFlag,
        this.props.size
      );
      this.props.updateErrMsgStatus(false);
      this.props.updateMeasurementsIsComplateStatus(true);
    } else {
      this.props.updateMeasurementErrMsg(
        getStringVal(
          this.props.language,
          "YOU_MUST_CHOOSE_A_SPECIFIC_SIZE_BEFORE_ADDING_TO_RICKSHAW"
        )
      );
    }
  };

  hideEditSize = () => {
    $(".editSizeContainer")
      .removeClass("d-block")
      .addClass("d-none");
    this.props.updateMeasurementErrMsg("");
    let defaultSize;
    this.props.measurementsitems.items.map(item =>
      item.default === true ? (defaultSize = item.id) : ""
    );

    this.props.userMeasureId(defaultSize);
    // this.props.storeSizeID(defaultSize);
    // userMeasureId
  };

  render() {
    return (
      <div className="editSizeContainer d-none" key={this.props.key}>
        <div className="editSize">
          <h2 className="mainTitle">
            {this.props.title} <span onClick={this.hideEditSize}>X</span>
          </h2>
          <SizeSection
            sizeType={this.props.sizeType}
            measurementsTable={this.props.measurementsTable}
            currentItemSize={
              this.props.currentItemSize &&
              this.props.currentItemSize != "" &&
              this.props.ithoobCookie !== -1
                ? this.props.currentItemSize
                : ""
            }
            sizeManStatus={this.props.sizeManStatus}
            pathname={this.props.pathname}
            dataCategorySlug={this.props.dataCategorySlug}
          />

          {this.props.measurementErrMsg.length > 0 ? (
            <p className="errMsg mx-auto text-danger mb-2">
              <small>{this.props.measurementErrMsg}</small>
            </p>
          ) : (
            ""
          )}

          <button
            type="submit"
            className="button d-block w-100"
            onClick={() => this.updateSize(this.props.id)}
          >
            {getStringVal(this.props.language, "EDIT_SIZE")}
          </button>
        </div>
        <div className="overlay" />
      </div>
    );
  }
}
const mapEditSizeStateToProps = state => ({
  //   editSizeDisplayStatus: state.myCart.editSizeDisplayStatus,
  language: state.generalReducer.language,
  sizeManFlag: state.carouselReducer.present.sizeManStatus,
  measurementsIsComplate: state.myCart.measurementsIsComplate,
  items: state.myCart.items,
  sizeStatus: state.myCart.sizeStatus,
  measurementErrMsg: state.myCart.measurementErrMsg,
  savedSizes: state.myCart.savedSizes,
  measurementsitems: state.customsReducer.measurementsitems,
  size:
    state.carouselReducer.present.sizeId == ""
      ? parseInt(state.carouselReducer.present.measurementId)
      : state.carouselReducer.present.sizeId
});

const mapEditSizeDispatchToProps = dispatch => ({
  updateSize: (language, authorization, productId, sizeManFlag, size) => {
    dispatch(updateSize(language, authorization, productId, sizeManFlag, size));
  },
  getCartItems: (lang, authToken) => {
    dispatch(getCartItems(lang, authToken));
  },
  updateErrMsgStatus: status => {
    dispatch(updateErrMsgStatus(status));
  },
  updateMeasurementsIsComplateStatus: status => {
    dispatch(updateMeasurementsIsComplateStatus(status));
  },
  updateMeasurementErrMsg: msg => {
    dispatch(updateMeasurementErrMsg(msg));
  },
  userMeasureId: id => {
    dispatch(userMeasureId(id));
  },
  storeSizeID: sizeId => {
    dispatch(storeSizeID(sizeId));
  }
});

export default connect(
  mapEditSizeStateToProps,
  mapEditSizeDispatchToProps
)(EditSize);
