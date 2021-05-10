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
import { decrementQuantity, incrementQuantity, resetPresentData } from "../../actions/includes/carouselActions";
import { myModule } from "../../scripts/collapsersModule.js";
import { getCookie, deleteCookie } from "../../scripts/getCookieFile";
import { fromCartToEditcustomsState } from "../../actions/myCart/myCartActions";
import { emailSignupPopUpToggle } from "../../actions/signupPopUp/signupActions";
import { twitterLoginSuccess } from "../../actions/socialMediaBtns/socialMediaActions";
import { setOpenedSection } from '../../actions/customizationsPage/othersActions';

//layout of customizations page
export class CartPart extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.updatePostition = this.updatePostition.bind(this);
    this.handleUndo = this.handleUndo.bind(this);
    this.handleRedo = this.handleRedo.bind(this);
    this.updateFromMyCartstatus = this.updateFromMyCartstatus.bind(this);
    // this.state = { activeBtn: false };
    this.handleMinusClick = this.handleMinusClick.bind(this);
    this.handlePlusClick = this.handlePlusClick.bind(this);
    this._handleSelectedSection = this._handleSelectedSection.bind(this);
  }

  handlePlusClick(){
    this.props.incrementQuantity();
  }
  handleMinusClick(){
    this.props.decrementQuantity();
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
  _handleSelectedSection(section, image){
    this.props.setOpenedSection(section, image);
  }

  handleClick(e) {
    if(this.props.fabricRequired){
      $(".warningNote").css("display", "block");
      $(".requiredNote").css("display", "block");
      $(".requiredNote__txt").text(getStringVal(this.props.language, "YOU_DO_NOT_EXIT_SELECTIONS_AFTER_THE_CLOTH"))
      this._handleSelectedSection("fabric", "komasha");
      return;
    }
    if(this.props.yakaRequired){
      $(".warningNote").css("display", "block");
      $(".requiredNote").css("display", "block");
      $(".requiredNote__txt").text(getStringVal(this.props.language, "YOU_DO_NOT_EXIT_SELECTIONS_AFTER_COLLAR"))
      this._handleSelectedSection("collar","yaka");
      return;
    }
    if(this.props.akmamRequired){
      $(".warningNote").css("display", "block");
      $(".requiredNote").css("display", "block");
      $(".requiredNote__txt").text(getStringVal(this.props.language, "YOU_DO_NOT_EXIT_SELECTIONS_SLEEVES_AFTER"))
      this._handleSelectedSection("sleeve", "sleeve")
      return;
    }
    if(this.props.zarzourRequired){
      $(".warningNote").css("display", "block");
      $(".requiredNote").css("display", "block");
      $(".requiredNote__txt").text(getStringVal(this.props.language, "YOU_DO_NOT_EXIT_SELECTIONS_AFTER_STARLINGS"))
      this._handleSelectedSection("starlings", "starlings");
      return;
    }
    if(this.props.othersRequired){
      $(".warningNote").css("display", "block");
      $(".requiredNote").css("display", "block");
      $(".requiredNote__txt").text(getStringVal(this.props.language, "YOU_DO_NOT_EXIT_OPTIONS_ADDITIONS_AFTER"))
      this._handleSelectedSection("additions", "komasha");
      return;
    }
    this.props.toggleSubPopUpStatus(true);

    // if (
    //   $("#accordion").find(".fabricChildrens[data-required=true]").length === 0
    // ) {
    //   this.props.toggleSubPopUpStatus(true);
    // } else {
    //   $(".warningNote").css("display", "block");
    // }
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
        <div className="cart-part">
            <div className="count-part d-flex align-items-center justify-content-center">
            {this.props.position === "footer" && <span>{getStringVal(this.props.language, "QUANTITY")}</span>}
            <button type="button" class="btn" onClick={this.handlePlusClick}>+</button>
            <span>{this.props.quantity}</span>
            <button type="button" class="btn" onClick={this.handleMinusClick}>-</button>
            </div>
            <button
            className="d-flex align-items-center cartBtn"
            onClick={e => this.handleClick(e)}
            >
            {this.props.position === "footer" && <p>{getStringVal(this.props.language, "ADD_TO_CART")}</p>}
            {this.props.position === "header" && <span className="icon-shopping-cart1"></span>}
            <p>{fullCost} <span>{getStringVal(this.props.language, "SR")}</span></p>

            </button>
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
    fromCartStatus: state.myCart.fromCartToEditCustomsStatus,
    fabricRequired: state.carouselReducer.present.fabricRequired,
    yakaRequired: state.carouselReducer.present.yakaRequired,
    zarzourRequired: state.carouselReducer.present.zarzourRequired,
    akmamRequired: state.carouselReducer.present.akmamRequired,
    othersRequired: state.carouselReducer.present.othersRequired,
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
    },
    decrementQuantity(){
      dispatch(decrementQuantity())
    },
    incrementQuantity(){
      dispatch(incrementQuantity())
    },
    setOpenedSection(section, image){
      dispatch(setOpenedSection(section, image))
  }
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartPart);
