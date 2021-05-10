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
class SizeSection extends Component {
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
    this.checkQuery();
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
    // if (
    //   this.props.sizeManStatus !== prevProps.sizeManStatus &&
    //   this.props.sizeManStatus
    // ) {
    //   $(".sizeManInput").attr("checked", "checked");
    // } else {
    //   $(".sizeManInput").removeAttr("checked");
    // }
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
  checkQuery = () => {
    if (this.props.pathname.includes("productDetails")) {
      this.props.updateFromProductDetails(
        true,
        this.props.dataCategorySlug,
        false
      );
    } else if (this.props.pathname.includes("myCart")) {
      this.props.updateFromProductDetails(
        false,
        this.props.dataCategorySlug,
        true
      );
    } else {
      // from customizations
    }
  };
  render() {
    // from size part
    // if (this.props.ithoobCookie !== -1) {
    if (
      this.props.measurementsitems &&
      this.props.measurementsitems.items &&
      this.props.sizeType != "accessories"
    ) {
      return (
        <div className="measurementsCustom sizeSection">
          {this.props.measurementsTable ? (
            <MeasurementPopUp
              measurementsTable={this.props.measurementsTable}
            />
          ) : (
            ""
          )}
          {this.props.sizeType != "shoes" ? (
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
                            {getStringVal(
                              this.props.language,
                              "ADD_FILE_FORMAT"
                            )}
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

                {!this.props.pathname.includes("customizations") && <div className="contentItem p-0 d-none d-md-flex align-items-center justify-content-start">
                  <div
                    className={
                      this.props.itemPresent.sizeId === "s"
                        ? "item-selected"
                        : ""
                    }
                    onClick={() => this.props.storeSizeID("s")}
                  >
                    <label>S</label>
                    <p
                      className="tickCircle text-center"
                      style={
                        this.props.itemPresent.sizeId === "s"
                          ? { visibility: "visible" }
                          : { visibility: "hidden" }
                      }
                    >
                      <span className="icon-tick">
                        <span className="path1" />
                        <span className="path2" />
                      </span>
                    </p>
                  </div>
                  <div
                    className={
                      this.props.itemPresent.sizeId === "m"
                        ? "item-selected"
                        : ""
                    }
                    onClick={() => this.props.storeSizeID("m")}
                  >
                    <label>M</label>
                    <p
                      className="tickCircle text-center"
                      style={
                        this.props.itemPresent.sizeId === "m"
                          ? { visibility: "visible" }
                          : { visibility: "hidden" }
                      }
                    >
                      <span className="icon-tick">
                        <span className="path1" />
                        <span className="path2" />
                      </span>
                    </p>
                  </div>
                  <div
                    className={
                      this.props.itemPresent.sizeId === "l"
                        ? "item-selected"
                        : ""
                    }
                    onClick={() => this.props.storeSizeID("l")}
                  >
                    <label>L</label>
                    <p
                      className="tickCircle text-center"
                      style={
                        this.props.itemPresent.sizeId === "l"
                          ? { visibility: "visible" }
                          : { visibility: "hidden" }
                      }
                    >
                      <span className="icon-tick">
                        <span className="path1" />
                        <span className="path2" />
                      </span>
                    </p>
                  </div>
                </div>}

                {this.props.measurementsTable && !this.props.pathname.includes("customizations") ? (
                  <span className="showMeasurementTable d-none d-md-block">
                    <a onClick={(e) => this.measurementPopUp(e)}>
                      {/* جدول المقاسات */}
                      {getStringVal(this.props.language, "MEASUREMENTS_TABLE")}
                    </a>
                  </span>
                ) : (
                  ""
                )}
              </div>
              {!this.props.pathname.includes("customizations") && <div className="contentItem p-0 d-flex d-md-none align-items-center justify-content-start">
                <div
                  className={
                    this.props.itemPresent.sizeId === "s" ? "item-selected" : ""
                  }
                  onClick={() => this.props.storeSizeID("s")}
                >
                  <label>Sm</label>
                  <p
                    className="tickCircle text-center"
                    style={
                      this.props.itemPresent.sizeId === "s"
                        ? { visibility: "visible" }
                        : { visibility: "hidden" }
                    }
                  >
                    <span className="icon-tick">
                      <span className="path1" />
                      <span className="path2" />
                    </span>
                  </p>
                </div>
                <div
                  className={
                    this.props.itemPresent.sizeId === "m" ? "item-selected" : ""
                  }
                  onClick={() => this.props.storeSizeID("m")}
                >
                  <label>M</label>
                  <p
                    className="tickCircle text-center"
                    style={
                      this.props.itemPresent.sizeId === "m"
                        ? { visibility: "visible" }
                        : { visibility: "hidden" }
                    }
                  >
                    <span className="icon-tick">
                      <span className="path1" />
                      <span className="path2" />
                    </span>
                  </p>
                </div>
                <div
                  className={
                    this.props.itemPresent.sizeId === "l" ? "item-selected" : ""
                  }
                  onClick={() => this.props.storeSizeID("l")}
                >
                  <label>L</label>
                  <p
                    className="tickCircle text-center"
                    style={
                      this.props.itemPresent.sizeId === "l"
                        ? { visibility: "visible" }
                        : { visibility: "hidden" }
                    }
                  >
                    <span className="icon-tick">
                      <span className="path1" />
                      <span className="path2" />
                    </span>
                  </p>
                </div>
              </div>}
              {this.props.measurementsTable && !this.props.pathname.includes("customizations") ? (
                <span className="showMeasurementTable d-block d-md-none">
                  <a onClick={(e) => this.measurementPopUp(e)}>
                    {/* جدول المقاسات */}
                    {getStringVal(this.props.language, "MEASUREMENTS_TABLE")}
                  </a>
                </span>
              ) : (
                ""
              )}
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
                {/* <input
                    type="checkbox"
                    name="sizeMan"
                    id="sizeMan"
                    className="sizeManInput"
                    checked="true"
                    onChange={e => this.sizeManStatus(e)}
                  /> */}

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

                  <span>
                    &nbsp;&nbsp;
                    {/* تكلفة اضاقية تبدا من */}
                    {getStringVal(
                      this.props.language,
                      "THE_EXTRA_COST_STARTING_FROM"
                    )}
                    &nbsp; 30
                    {/* ريال */}
                    &nbsp;
                    {getStringVal(this.props.language, "SR")}
                    {/* حسب المنطقة */}
                    &nbsp;
                    {getStringVal(this.props.language, "BY_REGION")}
                  </span>
                </label>
              </div>
            </div>
          ) : (
            // SizeType is shoes..
            ""
            /* <div className="d-flex align-items-center justify-content-start">
                <input
                  type="text"
                  onChange={$event => this.changeShoesSize($event)}
                  maxLength="2"
                />

                {this.props.measurementsTable ? (
                  <span className="showMeasurementTable">
                    <a onClick={e => this.measurementPopUp(e)}>
                      {getStringVal(this.props.language, "MEASUREMENTS_TABLE")}
                    </a>
                  </span>
                ) : (
                  ""
                )}
              </div>*/
          )}
        </div>
      );
    } else if (
      this.props.measurementsitems &&
      this.props.measurementsitems.items == undefined &&
      this.props.sizeType != "accessories"
    ) {
      return (
        <div className="measurementsCustom sizeSection">
          {this.props.measurementsTable ? (
            <MeasurementPopUp
              measurementsTable={this.props.measurementsTable}
            />
          ) : (
            ""
          )}
          <p className="title">
            {/* المقاس */}
            {getStringVal(this.props.language, "SIZE")}
          </p>
          {this.props.sizeType != "shoes" ? (
            <div>
              <div className="d-flex align-items-center justify-content-start">
                <p className="dropdownHeader measurementsLink">
                  <Link href="/addMeasurement" as="/add-measurement">
                    <a onClick={this.handleChange}>
                      +{/* إضافه ملف مقاسات */}
                      {getStringVal(this.props.language, "ADD_FILE_FORMAT")}
                    </a>
                  </Link>
                </p>
                <div className="contentItem p-0 d-flex align-items-between align-items-md-center flex-column flex-md-row justify-content-center">
                  {!this.props.pathname.includes("customizations") && <div className="d-flex align-items-center justify-content-center">
                    <div
                      className={
                        this.props.itemPresent.sizeId === "s"
                          ? "item-selected"
                          : ""
                      }
                      onClick={() => this.props.storeSizeID("s")}
                    >
                      <label>S</label>
                      <p
                        className="tickCircle text-center"
                        style={
                          this.props.itemPresent.sizeId === "s"
                            ? { visibility: "visible" }
                            : { visibility: "hidden" }
                        }
                      >
                        <span className="icon-tick">
                          <span className="path1" />
                          <span className="path2" />
                        </span>
                      </p>
                    </div>
                    <div
                      className={
                        this.props.itemPresent.sizeId === "m"
                          ? "item-selected"
                          : ""
                      }
                      onClick={() => this.props.storeSizeID("m")}
                    >
                      <label>M</label>
                      <p
                        className="tickCircle text-center"
                        style={
                          this.props.itemPresent.sizeId === "m"
                            ? { visibility: "visible" }
                            : { visibility: "hidden" }
                        }
                      >
                        <span className="icon-tick">
                          <span className="path1" />
                          <span className="path2" />
                        </span>
                      </p>
                    </div>
                    <div
                      className={
                        this.props.itemPresent.sizeId === "l"
                          ? "item-selected"
                          : ""
                      }
                      onClick={() => this.props.storeSizeID("l")}
                    >
                      <label>L</label>
                      <p
                        className="tickCircle text-center"
                        style={
                          this.props.itemPresent.sizeId === "l"
                            ? { visibility: "visible" }
                            : { visibility: "hidden" }
                        }
                      >
                        <span className="icon-tick">
                          <span className="path1" />
                          <span className="path2" />
                        </span>
                      </p>
                    </div>
                  </div>}
                  {this.props.measurementsTable && !this.props.pathname.includes("customizations")  ? (
                    <span className="showMeasurementTable">
                      <a onClick={(e) => this.measurementPopUp(e)}>
                        {/* جدول المقاسات */}
                        {getStringVal(
                          this.props.language,
                          "MEASUREMENTS_TABLE"
                        )}
                      </a>
                    </span>
                  ) : (
                    ""
                  )}
                </div>
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
                {/* <input
                    type="checkbox"
                    name="sizeMan"
                    id="sizeMan"
                    className="sizeManInput"
                    // checked={this.props.itemPresent.sizeManStatus}
                    onChange={e => this.sizeManStatus(e)}
                  /> */}
                <label htmlFor="sizeMan">
                  {/* أريد ترزى لأخذ مقاساتى بالمنزل */}
                  {getStringVal(
                    this.props.language,
                    "I_WANT_TO_TAKE_SIZE_TAILOR_HOME"
                  )}

                  <span>
                    {/* تكلفة اضاقية تبدا من */}
                    {getStringVal(
                      this.props.language,
                      "THE_EXTRA_COST_STARTING_FROM"
                    )}
                    )<span>{this.props.measurementsitems.sizeMan}</span>(
                    {/* ريال */}
                    {getStringVal(this.props.language, "SR")}
                    {/* حسب المنطقة */}
                    {getStringVal(this.props.language, "BY_REGION")}
                  </span>
                </label>
              </div>
            </div>
          ) : (
            <div className="d-flex align-items-center justify-content-start">
              <input
                type="text"
                onChange={($event) => this.changeShoesSize($event)}
                maxLength="2"
              />
              {this.props.measurementsTable ? (
                <span className="showMeasurementTable">
                  <a onClick={(e) => this.measurementPopUp(e)}>
                    {/* جدول المقاسات */}
                    {getStringVal(this.props.language, "MEASUREMENTS_TABLE")}
                  </a>
                </span>
              ) : (
                ""
              )}
            </div>
          )}
          {this.props.shoesSizeStatuse ? (
            ""
          ) : (
            <p className="errMsg">
              {getStringVal(
                this.props.language,
                "SHOE_SIZE_SHOULD_BE_BETWEEN_41_TO_45"
              )}
            </p>
          )}
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
    // } else {
    //   return this.props.sizeType == "sizeable" ? (
    //     <Link href="/add-measurement">
    //       <button
    //         className="button sizeBtn mb-3"
    //         onClick={() => this.checkQuery()}
    //       >
    //         {getStringVal(this.props.language, "ADD_FILE_FORMAT")}
    //       </button>
    //     </Link>
    //   ) : (
    //     ""
    //   );
    // }
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
export default connect(mapStateToProps, mapDispatchToProps)(SizeSection);
