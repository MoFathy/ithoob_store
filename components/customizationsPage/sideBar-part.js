import React, { Component } from "react";
import { connect } from "react-redux";
import ProductImages from "../productDetails/productImages";
import {
  toggleSubPopUpStatus,
  updateCost
} from "../../actions/customizationsPage/fabricsActions";
import { getStringVal } from "../../scripts/multiLang";
import $ from "jquery";
import { ActionCreators } from "redux-undo";
import Link from "next/link";
import { toggleClosePopup } from "../../actions/loginPopUp/loginActions";
import { resetPresentData } from "../../actions/includes/carouselActions";
import { myModule } from "../../scripts/collapsersModule.js";
import { getCookie, deleteCookie } from "../../scripts/getCookieFile";
import { fromCartToEditcustomsState } from "../../actions/myCart/myCartActions";
import { emailSignupPopUpToggle } from "../../actions/signupPopUp/signupActions";
import { twitterLoginSuccess } from "../../actions/socialMediaBtns/socialMediaActions";
//layout of customizations page
export class CustomizationsSidebar extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.updatePostition = this.updatePostition.bind(this);
    this.handleUndo = this.handleUndo.bind(this);
    this.handleRedo = this.handleRedo.bind(this);
    this.updateFromMyCartstatus = this.updateFromMyCartstatus.bind(this);
    // this.state = { activeBtn: false };
  }
  handleUndo(e) {
    this.props.undoHandler(); // undo the last action
  }
  updateFromMyCartstatus() {
    if (this.props.fromCartStatus === true) {
      this.props.fromCartToEditcustomsState();
    }
  }
  handleRedo(e) {
    this.props.redoHandler(); // redo the last action
  }
  componentDidMount() {
    window.onload = this.updatePostition();
    if (
      $("#accordion").find(".fabricChildrens[data-required=true]").length === 0
    ) {
      $(".sideBar__productImages__productDesc__btn")
        .find("button")
        .addClass("active");
      if ($(".warningNote").css("display") == "block") {
        $(".warningNote").css("display", "none");
      }
    } else {
      $(".sideBar__productImages__productDesc__btn")
        .find("button")
        .removeClass("active");
    }

    if (getCookie("twitterNewUser")) {
      deleteCookie("twitterNewUser");
      this.propsemailSignupPopUpToggle(true);
      this.props.twitterLoginSuccess(
        getCookie("twitterNewData", "data"),
        getCookie("twitterNewData", "accessToken"),
        getCookie("twitterNewData", "secret")
      );
    }
  }
  updatePostition() {
    if (window.innerHeight <= 768 && window.innerWidth >= 991) {
      $(".productImages__main").height(
        $(".sidebarContainer").outerHeight(true) -
          $(".sideBar__header").outerHeight(true) -
          $(".sideBar__productImages").outerHeight(true) -
          $(".productImages__thumbs").outerHeight(true) -
          $(".warningNote").outerHeight(true) -
          50
      );
    } else {
      $(".productImages__main").removeAttr("style");
      // $(".sideBar").css('position',"fixed");
    }
  }
  handleClick(e) {
    if (
      $("#accordion").find(".fabricChildrens[data-required=true]").length === 0
    ) {
      this.props.toggleSubPopUpStatus(true);
    } else {
      $(".warningNote").css("display", "block");
    }
  }
  componentDidUpdate(prevProps) {
    //  let fullCost = this.props.totalCost;
    //  console.log("fabics cost");
    //  console.log(this.props.fabricCost);
    //  console.log(prevProps.fabricCost);
    // if(this.props.fabricCost !== prevProps.fabricCost){
    //   fullCost = fullCost && this.props.fabricCost ? parseFloat(fullCost)+parseFloat(this.props.fabricCost) : fullCost
    //   this.props.updateCost(fullCost);
    // }
    // if(this.props.yakaCost !== prevProps.yakaCost){
    //   fullCost = fullCost && this.props.yakaCost ? parseFloat(fullCost)+parseFloat(this.props.yakaCost) : fullCost
    //   this.props.updateCost(fullCost);
    // }
    // if(this.props.zarzourCost !== prevProps.zarzourCost){
    //   fullCost = fullCost && this.props.zarzourCost ? parseFloat(fullCost)+parseFloat(this.props.zarzourCost) : fullCost
    //   this.props.updateCost(fullCost);
    // }
    // if(this.props.akmamCost !== prevProps.akmamCost){
    //   fullCost = fullCost && this.props.akmamCost ? parseFloat(fullCost)+parseFloat(this.props.akmamCost) : fullCost
    //   this.props.updateCost(fullCost);
    // }
    // if(this.props.othersCost !== prevProps.othersCost){
    //   fullCost = fullCost && this.props.othersCost ? parseFloat(fullCost)+parseFloat(this.props.othersCost) : fullCost
    //   this.props.updateCost(fullCost);
    // }
  }
  closeCollapse = () => {
    // .collapse('hide')
    $(".collapse").collapse("hide");
  };
  render() {
    let { images } = this.props;
    let fullCost = this.props.totalCost;
    // if(this.props.itemid === undefined ){
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
    // }
    fullCost = fullCost * this.props.quantity;
    if (images.length > 0) {
      return (
        <div className="sideBar">
          <div className="customizationsContent__actionBar d-block d-md-none pb-0">
            {this.props.language === false ? (
              <ul className="d-flex justify-content-end">
                <li onClick={e => this.handleUndo(e)}>
                  <span
                    className={
                      this.props.pastArray.length >= 1
                        ? "icon-undo1 active"
                        : "icon-undo1"
                    }
                  ></span>
                </li>
                <li onClick={e => this.handleRedo(e)}>
                  <span
                    className={
                      this.props.futureArray.length >= 1
                        ? "icon-redo1 active"
                        : "icon-redo1"
                    }
                  ></span>
                </li>
                <li>
                  {this.props.pastArray.length >= 1 ||
                  this.props.futureArray.length >= 1 ? (
                    <div
                      className="close"
                      onClick={() => this.props.toggleClosePopup(true)}
                    >
                    <Link
                      href={
                        this.props.fromCartStatus === true ? "/my-cart" : "/"
                      }
                    >
                      <span className="icon-close"></span>
                      </Link>
                    </div>
                  ) : (
                    <div
                      className="close"
                      onClick={() => this.props.clearPastFutureHistory()}
                    >
                      <Link
                        href={
                          this.props.fromCartStatus === true ? "/my-cart" : "/"
                        }
                      >
                        <a onClick={this.updateFromMyCartstatus}>
                          <span className="icon-close"></span>
                        </a>
                      </Link>
                    </div>
                  )}
                </li>
              </ul>
            ) : (
              <ul className="d-flex justify-content-end">
                <li onClick={e => this.handleRedo(e)}>
                  <span
                    className={
                      this.props.futureArray.length >= 1
                        ? "icon-redo1 active"
                        : "icon-redo1"
                    }
                  ></span>
                </li>
                <li onClick={e => this.handleUndo(e)}>
                  <span
                    className={
                      this.props.pastArray.length >= 1
                        ? "icon-undo1 active"
                        : "icon-undo1"
                    }
                  ></span>
                </li>
                <li>
                  {this.props.pastArray.length >= 1 ||
                  this.props.futureArray.length >= 1 ? (
                    <div
                      className="close"
                      onClick={() => this.props.toggleClosePopup(true)}
                    >
                    <Link
                      href={
                        this.props.fromCartStatus === true ? "/my-cart" : "/"
                      }
                    >
                      <span className="icon-close"></span>
                      </Link>
                    </div>
                  ) : (
                    <div
                      className="close"
                      onClick={() => this.props.clearPastFutureHistory()}
                    >
                      <Link
                        href={
                          this.props.fromCartStatus === true ? "/my-cart" : "/"
                        }
                      >
                        <a onClick={this.updateFromMyCartstatus}>
                          <span className="icon-close"></span>
                        </a>
                      </Link>
                    </div>
                  )}
                </li>
              </ul>
            )}
          </div>
          <h2 className="sideBar__header">
            {this.props.itemid !== undefined
              ? getStringVal(this.props.language, "MODIFY") +
                " " +
                (this.props.language
                  ? this.props.title_ar
                  : this.props.title_en)
              : getStringVal(this.props.language, "DESIGN") +
                " " +
                getStringVal(this.props.language, "NEW_DRESS")}
          </h2>
          <ProductImages productImages={images} />
          <div className="sideBar__productImages">
            <div className="warningNote">
              {getStringVal(
                this.props.language,
                "DID_NOT_COMPLETE_THE_BASIC_CHOICES_FOR_THIS_DRESS_PLEASE_END_THE_FIRST_AMENDMENTS"
              )}
            </div>
            <div
              className="sideBar__productImages__productDesc d-flex justify-content-between"
              onClick={this.closeCollapse}
            >
              <div className="sideBar__productImages__productDesc__cost d-flex align-items-center">
                <p className={this.props.language ? "arabicNumber" : ""}>
                  {fullCost}
                </p>
                <span>{getStringVal(this.props.language, "SR")}</span>
              </div>
              <div className="sideBar__productImages__productDesc__btn">
                <button
                  className="d-flex align-items-center justify-content-center"
                  onClick={e => this.handleClick(e)}
                >
                  <span className="icon-shopping-cart1"></span>
                  {this.props.itemid !== undefined ? (
                    <p>{getStringVal(this.props.language, "MODIFY")}</p>
                  ) : (
                    <p>{getStringVal(this.props.language, "ADD_TO_CART")}</p>
                  )}
                </button>
                <p className="d-none">
                  {getStringVal(
                    this.props.language,
                    "THIS_PRICE_INCLUDES_THE_PRICE_OF_THE_ORIGINAL_DRESS_WITH_ADDITIONS"
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <div>test</div>;
    }
  }
}
function mapStateToProps(state) {
  return {
    images: state.customsReducer.images,
    totalCost: state.customsReducer.totalCost,
    title_ar: state.customsReducer.title_ar,
    title_en: state.customsReducer.title_en,
    fabricCost: state.carouselReducer.present.fabricCost,
    yakaCost: state.carouselReducer.present.yakaCost,
    zarzourCost: state.carouselReducer.present.zarzourCost,
    akmamCost: state.carouselReducer.present.akmamCost,
    othersCost: state.carouselReducer.present.othersCost,
    quantity: state.carouselReducer.present.quantity,
    language: state.generalReducer.language,
    pastArray: state.carouselReducer.past,
    futureArray: state.carouselReducer.future,
    fromCartStatus: state.myCart.fromCartToEditCustomsStatus
  };
}
function mapDispatchToProps(dispatch) {
  return {
    toggleSubPopUpStatus(value) {
      dispatch(toggleSubPopUpStatus(value));
    },
    undoHandler() {
      dispatch(ActionCreators.undo());
    },
    redoHandler() {
      dispatch(ActionCreators.redo());
    },
    clearPastFutureHistory() {
      dispatch(ActionCreators.clearHistory());
      dispatch(resetPresentData());
    },
    toggleClosePopup(value) {
      dispatch(toggleClosePopup(value));
    },
    emailSignupPopUpToggle(flag) {
      dispatch(emailSignupPopUpToggle(flag));
    },
    twitterLoginSuccess(data, accessToken, secret) {
      dispatch(twitterLoginSuccess(data, accessToken, secret));
    },
    updateCost(cost) {
      dispatch(updateCost(cost));
    },
    fromCartToEditcustomsState() {
      dispatch(fromCartToEditcustomsState());
    }
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomizationsSidebar);
