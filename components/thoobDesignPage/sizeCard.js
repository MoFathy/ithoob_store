import React, { Component } from "react";
import Link from "next/link";
import { connect } from "react-redux";
import MeasurementPopUp from "../../components/includes/measurementQuide";
import { measurementPopUpStatus } from "../../actions/includes/measurementsListActions";
import { getMeasurments } from "../../actions/customizationsPage/measurementsActions";
import { storeNote } from "../../actions/customizationsPage/othersActions";
import { getStringVal } from "../../scripts/multiLang";
import { getCookie } from "../../scripts/getCookieFile";
import {
  storeSizeID,
  toggleSizeManBtn,
  userMeasureId,
  changeShoesSize,
} from "../../actions/includes/carouselActions";
import { updateMeasurementErrMsg } from "../../actions/myCart/editSizeActions";

import {
  updateShoesSizeStatus,
  updateFromProductDetails,
} from "../../actions/productDetails/productDetails";
class SizeCard extends Component {
  constructor(props) {
    super(props);
    this.sizeManStatus = this.sizeManStatus.bind(this);
    this.onListClick = this.onListClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      getMeasurmentsIsCalled: false,
    };
  }

  handleChange() {
    // var totalPrice=$('.sideBar__productImages__productDesc__cost p').text();
    var note = $(".notes__input__value").val();
    this.props.storeNote(note);
  }
  componentDidMount() {
    // if (this.state.getMeasurmentsIsCall == false) {
    // console.log("getMeasurmentsIsCalled inside if");
    //patams language
    this.props.getMeasurments(
      this.props.language === false ? 1 : 2,
      getCookie("ithoobUser", "authenticationToken")
    );
    this.setState({ getMeasurmentsIsCalled: true });

    if (!this.props.itemPresent.sizeManStatus || !this.props.sizeManStatus) {
      $(".sizeManInput").removeAttr("checked");
    } else {
      $(".sizeManInput").attr("checked", "checked");
    }
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.language !== prevProps.language ||
      (this.props.ithoobCookie !== prevProps.ithoobCookie &&
        this.props.ithoobCookie !== -1)
    ) {
      this.props.getMeasurments(
        this.props.language === false ? 1 : 2,
        getCookie("ithoobUser", "authenticationToken")
      );
    }
  }
  measurementPopUp(e) {
    e.preventDefault();
    this.props.measurementPopUpStatus();
  }
  onDropDownClick() {
    $(".dropdownList").slideToggle("slow").css({ display: "inline-block" });
  }

  onListClick(e, itemID) {
    this.props.userMeasureId(itemID);
    this.props.updateMeasurementErrMsg("");
    $(".dropdownList").css({ display: "none" });

    $(".dropdownHeaderCopy").text($(e.target).text());
    $(".dropdown").addClass("active");
  }

  sizeManStatus(e) {
    this.props.toggleSizeManBtn();
    this.props.updateMeasurementErrMsg("");
  }
  changeShoesSize(e) {
    this.props.changeShoesSize($(e.target).val());
    this.props.updateShoesSizeStatus(true);
  }

  render() {
    // from size part
    // if (this.props.ithoobCookie !== -1) {
    if (this.props.measurementsitems && this.props.measurementsitems.items) {
      console.log("====================================");
      console.log("hello one");
      console.log("====================================");
      return (
        <div className="sizeCardPart  ">
          {this.props.measurementsTable ? (
            <MeasurementPopUp
              measurementsTable={this.props.measurementsTable}
            />
          ) : (
            ""
          )}
          <div>
            <p className="title">
              {/* المقاس */}
              {getStringVal(this.props.language, "SIZE")}
            </p>
            <div className="d-flex align-items-center justify-content-start dropdownContainer flex-wrap">
              {this.props.measurementsitems.items.length > 0 ? (
                <div className="dropdownForm">
                  <div
                    className={
                      this.props.itemPresent.measurementId === "" ||
                      this.props.itemPresent.measurementId === undefined
                        ? "dropdown"
                        : "dropdown active"
                    }
                    onClick={() => this.onDropDownClick(this)}
                  >
                    {this.props.currentItemSize &&
                    this.props.currentItemSize != "" &&
                    this.props.ithoobCookie !== -1 &&
                    this.props.itemPresent.measurementId
                      ? this.props.measurementsitems.items.map((item) =>
                          item.id === this.props.itemPresent.measurementId ? (
                            <p className="dropdownHeaderCopy">{item.title}</p>
                          ) : (
                            ""
                          )
                        )
                      : this.props.measurementsitems.items.map((item) =>
                          item.default === true ? (
                            <p className="dropdownHeaderCopy">{item.title}</p>
                          ) : (
                            ""
                          )
                        )}
                  </div>
                  <div className="dropdownList">
                    {this.props.measurementsitems.items.map((item, index) => {
                      return (
                        <div className="dropdownList__item" key={item.id}>
                          <p
                            className="dropdownHeader"
                            key={item.id}
                            onClick={(e) => this.onListClick(e, item.id)}
                          >
                            {item.title}
                          </p>
                          {item.percentage !== "100%" ? (
                            <p className="uncomplete">
                              (
                              {/* هذا الملف غير مكتمل .. يجب إكمال الملف قبل الشراء */}
                              {getStringVal(
                                this.props.language,
                                "THIS_FILE_IS_INCOMPLETE_MUST_COMPLETE_THE_FILE_BEFORE_PURCHASE"
                              )}
                              )
                            </p>
                          ) : (
                            ""
                          )}
                        </div>
                      );
                    })}
                    <p className="dropdownHeader">
                      <Link href="/addMeasurement" as="/add-measurement">
                        <a onClick={this.handleChange}>
                          +{/* إضافه ملف مقاسات */}
                          {getStringVal(this.props.language, "ADD_FILE_FORMAT")}
                        </a>
                      </Link>
                    </p>
                  </div>
                </div>
              ) : (
                <p className="dropdownHeader measurementsLink">
                  <Link href="/addMeasurement" as="/add-measurement">
                    <a onClick={this.handleChange}>
                      +{/* إضافه ملف مقاسات */}
                      {getStringVal(this.props.language, "ADD_FILE_FORMAT")}
                    </a>
                  </Link>
                </p>
              )}
            </div>

            <div className="radioBtn d-flex align-items-center justify-content-start">
              {this.props.itemPresent.sizeManStatus ? (
                <input
                  type="checkbox"
                  name="sizeMan"
                  id="sizeMan"
                  className="sizeManInput"
                  checked="true"
                  onChange={(e) => this.sizeManStatus(e)}
                />
              ) : (
                <input
                  type="checkbox"
                  name="sizeMan"
                  id="sizeMan"
                  className="sizeManInput"
                  onChange={(e) => this.sizeManStatus(e)}
                />
              )}

              <label htmlFor="sizeMan">
                {/* أريد ترزى لأخذ مقاساتى بالمنزل */}
                {getStringVal(
                  this.props.language,
                  "I_WANT_TO_TAKE_SIZE_TAILOR_HOME"
                )}

                {/**
                 * TODO: Sizeman cost doesn't retreive correctly.
                 * Only static "70" is retreived as sizeman cost,
                 * not synced with "Admin > Places" sizeman value
                 * [TEMP] Use "30" as a temporary static value.
                 *
                 * [FILE] ithoobapi > routes > categories.js:712
                 *
                 * DELETE this comment & temp solution after solving the core issue
                 * TIP: This happens with "deliveryPrice" as well, it has a static "100" cost. But it works fine in the "Cart"
                 */}
                {/* <span>
                      &nbsp;
                      {getStringVal(
                        this.props.language,
                        "THE_EXTRA_COST_STARTING_FROM"
                      )}
                      {this.props.measurementsitems.sizeMan}
                      &nbsp;
                      {getStringVal(this.props.language, "SR")}
                      &nbsp;
                      {getStringVal(this.props.language, "BY_REGION")}
                    </span> */}

                  {/* تكلفة اضاقية تبدا من */}
                  {/* ريال */}
                  {/* حسب المنطقة */}
                {/* <span>
                  &nbsp;&nbsp;
                  {getStringVal(
                    this.props.language,
                    "THE_EXTRA_COST_STARTING_FROM"
                  )}
                  &nbsp; 30
                  &nbsp;
                  {getStringVal(this.props.language, "SR")}
                  &nbsp;
                  {getStringVal(this.props.language, "BY_REGION")}
                </span> */}
              </label>
            </div>
          </div>
        </div>
      );
    } else if (
      this.props.measurementsitems &&
      this.props.measurementsitems.items == undefined
    ) {
      console.log("====================================");
      console.log("hello to");
      console.log("====================================");
      return (
        <div className="sizeCardPart  ">
          <div className="warningNote">
            {getStringVal(
              this.props.language,
              "DID_NOT_COMPLETE_THE_BASIC_CHOICES_FOR_THIS_DRESS_PLEASE_END_THE_FIRST_AMENDMENTS"
            )}
          </div>
          {
            // User must have a measurement || size || sizeMan selected
            this.props.itemPresent.sizeManStatus ||
            this.props.itemPresent.measurementId !== "" ||
            this.props.itemPresent.sizeId !== "" ? (
              ""
            ) : (
              <div className="not-available">
                {getStringVal(
                  this.props.language,
                  "CHOOSE_MEASUREMENT_BEFORE_OTHER_OPTIONS"
                )}
              </div>
            )
          }
          {this.props.measurementsTable ? (
            <MeasurementPopUp
              measurementsTable={this.props.measurementsTable}
            />
          ) : (
            ""
          )}

          <div>
            <div className="addMeasurement">
              <Link href="/addMeasurement" as="/add-measurement">
                <a className="btn" onClick={this.handleChange}>
                  +
                </a>
              </Link>
              <p>
                {/* إضافه ملف مقاسات */}
                {getStringVal(this.props.language, "ADD_FILE_FORMAT")}
              </p>
            </div>
            <div className="radioBtn d-flex align-items-center justify-content-start">
              <input
                type="checkbox"
                name="sizeMan"
                id="sizeMan"
                className="sizeManInput"
                checked={this.props.itemPresent.sizeManStatus}
                onChange={(e) => this.sizeManStatus(e)}
              />

              <label htmlFor="sizeMan">
                {/* أريد ترزى لأخذ مقاساتى بالمنزل */}
                {getStringVal(
                  this.props.language,
                  "I_WANT_TO_TAKE_SIZE_TAILOR_HOME"
                )}
                  {/* تكلفة اضاقية تبدا من */}
                  {/* ريال */}
                  {/* حسب المنطقة */}

                {/* <span>
                  {getStringVal(
                    this.props.language,
                    "THE_EXTRA_COST_STARTING_FROM"
                  )}
                  )<span>{this.props.measurementsitems.sizeMan}</span>(
                  {getStringVal(this.props.language, "SR")}
                  {getStringVal(this.props.language, "BY_REGION")}
                </span> */}
              </label>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          {/* loading  */}
          {getStringVal(this.props.language, "LOADING")}
          ...{" "}
        </div>
      );
    }
  }
}
function mapStateToProps(state) {
  return {
    measurementsitems: state.customsReducer.measurementsitems,
    itemPresent: state.carouselReducer.present,
    language: state.generalReducer.language,
    ithoobCookie: state.loginReducer.ithoobCookie,
    shoesSizeStatuse: state.productDetails.shoesSizeStatuse,
    fromProductDetials: state.addMeasurement.fromProductDetials,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    measurementPopUpStatus() {
      dispatch(measurementPopUpStatus());
    },
    getMeasurments(language, authorization) {
      dispatch(getMeasurments(language, authorization));
    },
    userMeasureId(measureId) {
      dispatch(userMeasureId(measureId));
    },
    storeSizeID(sizeId) {
      $(".dropdownList").slideUp("slow");
      // .css({ display: "none" });
      dispatch(storeSizeID(sizeId));
      dispatch(updateMeasurementErrMsg(""));
    },
    toggleSizeManBtn() {
      dispatch(toggleSizeManBtn());
    },
    changeShoesSize(size) {
      dispatch(changeShoesSize(size));
    },
    storeNote(note, totalPrice) {
      dispatch(storeNote(note, totalPrice));
    },
    updateMeasurementErrMsg: (msg) => {
      dispatch(updateMeasurementErrMsg(msg));
    },
    updateShoesSizeStatus: (status) => {
      dispatch(updateShoesSizeStatus(status));
    },
    updateFromProductDetails: (status, query, fromMyCartStatus) => {
      dispatch(updateFromProductDetails(status, query, fromMyCartStatus));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SizeCard);
