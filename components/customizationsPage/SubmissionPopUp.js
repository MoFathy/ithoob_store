import React, { Component } from "react";
import { connect } from "react-redux";
import {
  submitCustoms,
  toggleSubPopUpStatus,
  editCustoms,
  setCustomsLocalIndex
} from "../../actions/customizationsPage/fabricsActions";
import { cartInit } from "../../actions/header/cartHeader";
import { getCookie } from "../../scripts/getCookieFile";
import Router from "next/router";
import { getStringVal } from "../../scripts/multiLang";
export class SubmissionPopup extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.submitCustomizations = this.submitCustomizations.bind(this);
  }
  componentDidMount() {
    if (this.props.itemid !== undefined) {
      if ("uc" in localStorage) {
        var index = this.props.itemid;
        let productsObject = JSON.parse(localStorage.getItem("uc"));
        var productCustoms = productsObject.products[index];
        this.props.setCustomsLocalIndex(productCustoms);
      }
    }
  }
  handleClick() {
    this.props.toggleSubPopUpStatus(false);
  }
  submitCustomizations() {
    // var notes = document.querySelector(".notes__input__value").value;
    var notes = '';

    let attachments = null;
    // if (document.querySelector("#attach").files[0]) {
    //   attachments = new FormData();
    //   [...document.querySelector("#attach").files].forEach((item, index) => {
    //     attachments.append("images", item);
    //   });
    // }

    // calc price
    let fullCost = this.props.totalCost;
    fullCost =
      fullCost && this.props.fabricCost
        ? parseFloat(fullCost) + parseFloat(this.props.fabricCost)
        : fullCost;
    fullCost =
      fullCost && this.props.yakaCost
        ? parseFloat(fullCost) + parseFloat(this.props.yakaCost)
        : fullCost;
    fullCost =
      fullCost && this.props.zarzourCost
        ? parseFloat(fullCost) + parseFloat(this.props.zarzourCost)
        : fullCost;
    fullCost =
      fullCost && this.props.akmamCost
        ? parseFloat(fullCost) + parseFloat(this.props.akmamCost)
        : fullCost;
    fullCost =
      fullCost && this.props.othersCost
        ? parseFloat(fullCost) + parseFloat(this.props.othersCost)
        : fullCost;

    if (this.props.itemid !== undefined) {
      if (this.props.ithoobCookie !== -1) {
        this.props.editCustoms(
          this.props.language === "false" ? 1 : 2,
          this.props.itemid,
          fullCost,
          this.props.quantity,
          this.props.sizeManFlag,
          this.props.size,
          this.props.shoesSize,
          this.props.fabricImages,
          this.props.yakaImages,
          this.props.zarzourImages,
          this.props.akmamImages,
          this.props.othersImages,
          attachments,
          notes,
          getCookie("ithoobUser", "authenticationToken"),
          this.props.sizeType
        );
      } else {
        if ("uc" in localStorage) {
          var index = this.props.itemid;
          let productsObject = JSON.parse(localStorage.getItem("uc"));
          var productCustoms = productsObject.products[index];
          var object = {
            slug: this.props.slug,
            title_ar: this.props.title_ar,
            title_en: this.props.title_en,
            img: this.props.img[0],
            productId: this.props.productId,
            price: fullCost,
            quantity: this.props.quantity,
            sizeManFlag: this.props.sizeManFlag,
            size: this.props.size,
            shoesSize: this.props.shoesSize,
            fabrics: this.props.fabricImages,
            yaka: this.props.yakaImages,
            zarzour: this.props.zarzourImages,
            akmam: this.props.akmamImages,
            others: this.props.othersImages,
            attachments: attachments,
            notes: notes,
            sizeType: this.props.sizeType,
            basicPrice: this.props.totalCost,
            customized: true
          };
          productsObject.products[index] = object;
          localStorage.setItem("uc", JSON.stringify(productsObject));
          Router.push("/my-cart");
        }
      }
    } else {
      this.props.submitCustoms(
        this.props.language === "false" ? 1 : 2,
        this.props.slug,
        this.props.title_ar,
        this.props.title_en,
        this.props.img[0],
        this.props.productId,
        fullCost,
        this.props.quantity,
        this.props.sizeManFlag,
        this.props.size,
        this.props.shoesSize,
        this.props.fabricImages,
        this.props.yakaImages,
        this.props.zarzourImages,
        this.props.akmamImages,
        this.props.othersImages,
        attachments,
        notes,
        this.props.sizeType,
        this.props.totalCost
      );
    }
  }
  render() {
    return (
      <div
        className="messagePopup"
        style={
          this.props.subPopUpStatus === true
            ? { display: "flex" }
            : { display: "none" }
        }
      >
        {this.props.indexStatus === undefined &&
        this.props.ithoobCookie == -1 ? (
          <div className="messagePopup__content subMsg boxShadow">
            <div
              className="messagePopup__content__closeIcon text-center"
              onClick={this.handleClick}
            >
              {" "}
              <span className="icon-close" />
            </div>
            <h2 className="pr-5">
              {getStringVal(
                this.props.language,
                "THERE_IS_A_LINE_IN_THIS_LINK_AWANK_YOU_NEED_TO_LOG_IN"
              )}
            </h2>
          </div>
        ) : (
          <div className="messagePopup__content subMsg boxShadow">
            <div
              className="messagePopup__content__closeIcon text-center"
              onClick={this.handleClick}
            >
              {" "}
              <span className="icon-close" />
            </div>
            <h3
              style={
                this.props.failStatus === true
                  ? { display: "block" }
                  : { display: "none" }
              }
            >
              {getStringVal(this.props.language, "DID_NOT_WORK")}
            </h3>
            <h3
              style={
                this.props.uploadStatus === false &&
                this.props.cartStatus !== false
                  ? { display: "block" }
                  : { display: "none" }
              }
            >
              {getStringVal(this.props.language, "UPLOADING_FILES")}
            </h3>
            <h3
              style={
                this.props.cartStatus === false
                  ? { display: "block" }
                  : { display: "none" }
              }
            >
              {getStringVal(this.props.language, "GARY_ADD_TO_CART")}
            </h3>
            <h3
              style={
                this.props.cartStatus === true &&
                this.props.uploadStatus === true
                  ? { display: "block" }
                  : { display: "none" }
              }
            >
              {getStringVal(this.props.language, "ADDING_TO_CART")}
            </h3>
            <p
              className={
                this.props.cartStatus === true &&
                this.props.uploadStatus === true
                  ? "pt-3 pb-3 pl-3 pr-3"
                  : "invisible"
              }
            >
              {getStringVal(
                this.props.language,
                "ARE_YOU_SURE_YOU_COMPLETE_ALL_THE_AMENDMENTS_TO_THE_DRESS"
              )}
            </p>
            <div
              className={
                this.props.cartStatus === true &&
                this.props.uploadStatus === true
                  ? "messagePopup__content__btns mr-4 ml-4 d-flex justify-content-center align-items-center"
                  : "messagePopup__content__btns d-flex justify-content-center align-items-center invisible"
              }
            >
              <div
                className="btnStyle Btn"
                onClick={() => this.submitCustomizations()}
              >
                <button>
                  {this.props.indexStatus !== undefined
                    ? getStringVal(this.props.language, "YES_ADD_TO_CART")
                    : getStringVal(
                        this.props.language,
                        "YES_ADD_TO_CART_ADJUSTMENT"
                      )}
                </button>
              </div>
              <div className="btnStyle oppBtn" onClick={this.handleClick}>
                <button>
                  {getStringVal(this.props.language, "COMPLETE_THE_AMENDMENT")}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    subPopUpStatus: state.customsReducer.subPopUpStatus,
    // measurementsObject:state.carouselReducer.present.measurementsObject,
    fabricImages: state.carouselReducer.present.fabricArray,
    yakaImages: state.carouselReducer.present.yakaArray,
    zarzourImages: state.carouselReducer.present.zarzourArray,
    akmamImages: state.carouselReducer.present.akmamArray,
    othersImages: state.carouselReducer.present.othersArray,
    attachementsNames: state.customsReducer.attachementsNames,
    quantity: state.carouselReducer.present.quantity,
    totalCost: state.customsReducer.totalCost,
    fabricCost: state.carouselReducer.present.fabricCost,
    yakaCost: state.carouselReducer.present.yakaCost,
    zarzourCost: state.carouselReducer.present.zarzourCost,
    akmamCost: state.carouselReducer.present.akmamCost,
    othersCost: state.carouselReducer.present.othersCost,
    img: state.customsReducer.images,
    productId: state.customsReducer.productId,
    slug: state.customsReducer.slug,
    title_ar: state.customsReducer.title_ar,
    title_en: state.customsReducer.title_en,
    sizeManFlag: state.carouselReducer.present.sizeManStatus,
    size:
      state.carouselReducer.present.sizeId == ""
        ? parseInt(state.carouselReducer.present.measurementId)
        : state.carouselReducer.present.sizeId,
    shoesSize: state.carouselReducer.present.shoesSize,
    uploadStatus: state.customsReducer.uploadStatus,
    cartStatus: state.customsReducer.cartStatus,
    failStatus: state.customsReducer.failStatus,
    language: state.generalReducer.language,
    indexStatus: state.customsReducer.indexStatus,
    ithoobCookie: state.loginReducer.ithoobCookie,
    sizeType: state.customsReducer.sizeType,
    totalCost: state.customsReducer.totalCost
  };
}

function mapDispatchToProps(dispatch) {
  return {
    submitCustoms(
      language,
      slug,
      title_ar,
      title_en,
      img,
      productId,
      fullCost,
      quantity,
      sizeManFlag,
      size,
      shoesSize,
      fabrics,
      yaka,
      zarzour,
      akmam,
      others,
      attachments,
      notes,
      sizeType,
      basicPrice
    ) {
      dispatch(
        submitCustoms(
          language,
          slug,
          title_ar,
          title_en,
          img,
          productId,
          fullCost,
          quantity,
          sizeManFlag,
          size,
          shoesSize,
          fabrics,
          yaka,
          zarzour,
          akmam,
          others,
          attachments,
          notes,
          sizeType,
          basicPrice
        )
      );
    },
    toggleSubPopUpStatus(value) {
      dispatch(toggleSubPopUpStatus(value));
    },
    cartInit() {
      dispatch(cartInit());
    },
    editCustoms(
      lang,
      productId,
      fullCost,
      quantity,
      sizeManFlag,
      size,
      shoesSize,
      fabrics,
      yaka,
      zarzour,
      akmam,
      others,
      attachments,
      notes,
      auth,
      sizeType
    ) {
      dispatch(
        editCustoms(
          lang,
          productId,
          fullCost,
          quantity,
          sizeManFlag,
          size,
          shoesSize,
          fabrics,
          yaka,
          zarzour,
          akmam,
          others,
          attachments,
          notes,
          auth,
          sizeType
        )
      );
    },
    setCustomsLocalIndex(value) {
      dispatch(setCustomsLocalIndex(value));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubmissionPopup);
