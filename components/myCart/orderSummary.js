import React, { Component } from "react";
import { connect } from "react-redux";
import Link from "next/link";
//actions
import { loginPopUpStatusToggle } from "../../actions/loginPopUp/loginActions";
import {
  updateErrMsgStatus,
  updateMeasurementsIsComplateStatus,
  updateRedirectToChechout
} from "../../actions/myCart/myCartActions";
import { getStringVal } from "../../scripts/multiLang";
import { signUpFromPaymentBtn } from "../../actions/signupPopUp/signupActions";

import AvailableDiscounts from "../includes/AvailableDiscounts"
import { deletePartnerDiscountLocalStorage } from "../../actions/myCart/getCode";

class OrderSummary extends Component {
  constructor(props) {
    super(props);
    this.msgAppear = this.msgAppear.bind(this);
    this.msgDisappear = this.msgDisappear.bind(this);
    this.outOfCoverageMsgAppear = this.outOfCoverageMsgAppear.bind(this);
    this.outOfCoverageMsgDisappear = this.outOfCoverageMsgDisappear.bind(this);
  }
  componentDidMount() {
    // this.props.signUpFromPaymentBtn(true);
    this.props.deletePartnerDiscountLocalStorage();
  }
  outOfCoverageMsgAppear(e) {
    $(e.target)
      .parent()
      .find("span.outOfCoverageDesc")
      .css({ display: "inline-flex", "flex-direction": "column" });
  }

  outOfCoverageMsgDisappear(e) {
    $(e.target)
      .parents()
      .find(".descParent span.outOfCoverageDesc")
      .css("display", "none");
  }

  msgAppear(e) {
    $(e.target)
      .parent()
      .find("span.desc")
      .css("display", "block");
  }

  msgDisappear(e) {
    $(e.target)
      .parent()
      .find("span.desc")
      .css("display", "none");
  }

  showPopup = () => {
    this.props.signUpFromPaymentBtn(true);
    this.props.loginPopUpStatusToggle(true);
    this.props.updateRedirectToChechout(true);
  };

  confirmPaymentClick = () => {
    this.props.updateErrMsgStatus(true);
  };

  componentWillUnmount() {
    this.props.updateErrMsgStatus(false);
    this.props.signUpFromPaymentBtn(false);
  }

  isFloat = n => {
    return Number(n) === n && n % 1 !== 0 ? n.toFixed(2) : n.toFixed();
  };

  render() {
    // OrderSummary
// let products = this.props.cartItems;
var sebhaArray =[];
var khatemArray =[];
var asweraArray =[];
var deblaArray =[];
var thoobsArray =[];

this.props.items.forEach(item =>{
  if(item.subCategory === "daily-thoob"){
    for(let i = 0; i < item.quantity; i++){
      thoobsArray.push(Number(item.price_discount) || Number(item.price))
    }
  }
  if(item.subCategory == 'all-sebah-'){
    for(let i = 0; i < item.quantity; i++){
      sebhaArray.push(Number(item.price_discount) || Number(item.price))
    }
  }
  if(item.subCategory == 'all-rings'){
    for(let i = 0; i < item.quantity; i++){
      khatemArray.push(Number(item.price_discount) || Number(item.price))
    }
  }
  if(item.subCategory == 'ring2'){
    for(let i = 0; i < item.quantity; i++){
      deblaArray.push(Number(item.price_discount) || Number(item.price))
    }
  }
  if(item.subCategory == 'bracelets'){
    for(let i = 0; i < item.quantity; i++){
      asweraArray.push(Number(item.price_discount) || Number(item.price))
    }
  }
  
});


var quantity_discount = 0;
  if(sebhaArray.length && sebhaArray.length > 1){
    var count = Math.floor(sebhaArray.length / 2);
    const newArr = sebhaArray.sort(function(a, b) {
      return b - a;
    });
    for(let i = 0; i <newArr.length; i++){
      if(i >= newArr.length - count){
        quantity_discount +=  Number(newArr[i]);
      }
    }
  }
  if(khatemArray.length && khatemArray.length > 1){
    var count = Math.floor(khatemArray.length / 2);
    const newArr = khatemArray.sort(function(a, b) {
      return b - a;
    });
    for(let i = 0; i <newArr.length; i++){
      if(i >= newArr.length - count){
        quantity_discount +=  Number(newArr[i]);
      }
    }
  }
  if(asweraArray.length && asweraArray.length > 1){
    var count = Math.floor(asweraArray.length / 2);
    const newArr = asweraArray.sort(function(a, b) {
      return b - a;
    });
    for(let i = 0; i <newArr.length; i++){
      if(i >= newArr.length - count){
        quantity_discount +=  Number(newArr[i]);
      }
    }
  }
  if(deblaArray.length && deblaArray.length > 1){
    var count = Math.floor(deblaArray.length / 2);
    const newArr = deblaArray.sort(function(a, b) {
      return b - a;
    });
    for(let i = 0; i <newArr.length; i++){
      if(i >= newArr.length - count){
        quantity_discount +=  Number(newArr[i]);
      }
    }
  }
  if(thoobsArray.length && thoobsArray.length > 2){
    var count = Math.ceil(thoobsArray.length / 3 * 2);
    const newArr = thoobsArray.sort(function(a, b) {
      return b - a;
    });
    for(let i = 0; i <newArr.length; i++){
      if(i >= count){
        quantity_discount +=  Number(newArr[i]);
      }
    }
  }

  console.log('====================================');
    console.log(thoobsArray);
    console.log(quantity_discount);

    console.log('====================================');
    let wantSizeManLength = 0;
    var cartTotal = 0;
    this.props.items.length > 0
      ? (this.props.items.map(
          item =>
            (cartTotal +=
              item.price_discount > 0
                ? item.price_discount * item.quantity
                : item.price * item.quantity)
        ),
        this.props.items.map(item =>
          item.sizeManFlag == true
            ? (wantSizeManLength = wantSizeManLength + item.quantity)
            : ""
        ))
      : "";

    return this.props.items.length > 0 ? (
      <div className="card orderSammury">
        <div className="descParent">
          <h5 className="card-title">
            {getStringVal(this.props.language, "ORDER_SUMMARY")}
          </h5>

          <div className="card-text d-flex">
            <div className="title">
              {getStringVal(this.props.language, "TOTAL_PRODUCTS")}
            </div>
            <div className="price">
              {this.props.ithoobCookie !== -1 ? (
                <span>{this.props.orderSummary.total}</span>
              ) : this.props.items.length > 0 ? (
                <span>{cartTotal}</span>
              ) : (
                " "
              )}
              {getStringVal(this.props.language, "SR")}
            </div>
          </div>

          <div className="card-text d-flex">
            <div className="title">
              {getStringVal(this.props.language, "SHIPPING")}
              <span
                className="icon-round-error-symbol"
                onMouseEnter={e => this.msgAppear(e)}
                onMouseLeave={e => this.msgDisappear(e)}
              ></span>
              <span className="desc">
                {getStringVal(
                  this.props.language,
                  "YOU_WILL_DETERMINE_THE_COST_OF_SHIPPING_BASED_ON_YOUR_AREA_AND_YOUR_ADDRESS"
                )}
              </span>
            </div>
            <div className="price">
              {this.props.ithoobCookie !== -1 ? (
                <span>{this.props.orderSummary.delivery}</span>
              ) : (
                <span>
                  <small className="text-muted">
                    {getStringVal(this.props.language, "STARTS_FROM")}
                  </small>
                  {this.props.deliveryPrice}
                </span>
              )}
              {getStringVal(this.props.language, "SR")}
            </div>
          </div>

          {this.props.orderSummary.costOfsizeMan || wantSizeManLength > 0 ? (
            <div className="card-text d-flex">
              <div className="title">
                {getStringVal(this.props.language, "THE_COST_TAILOR")}
                <span
                  className="icon-round-error-symbol"
                  onMouseEnter={e => this.msgAppear(e)}
                  onMouseLeave={e => this.msgDisappear(e)}
                ></span>
                <span className="desc">
                  {getStringVal(
                    this.props.language,
                    "YOU_WILL_DETERMINE_THE_COST_TARAZI_BASED_ON_YOUR_AREA_AND_YOUR_ADDRESS"
                  )}
                </span>
              </div>
              <div className="price">
                {this.props.ithoobCookie !== -1 ? (
                  <span>{this.props.orderSummary.costOfsizeMan}</span>
                ) : (
                  <span>
                    <small className="text-muted">
                      {getStringVal(this.props.language, "STARTS_FROM")}
                    </small>
                    {wantSizeManLength > 0 ? this.props.sizeManPrice : 0}
                  </span>
                )}
                {getStringVal(this.props.language, "SR")}
              </div>
            </div>
          ) : (
            ""
          )}

          <AvailableDiscounts 
            msgAppear={this.msgAppear} 
            msgDisappear={this.msgDisappear}
            userDiscount={this.props.userDiscount}
            partnerDiscount={this.props.partnerDiscount}
            total={cartTotal}
            language={this.props.language}
          />

          <hr />

          <div className="card-text d-flex total  align-items-center">
            <div className="title">
              {getStringVal(this.props.language, "TOTAL_PRODUCTS")}{" "}
              {this.props.ithoobCookie !== -1 ? (
                ""
              ) : (
                <span>
                  {getStringVal(
                    this.props.language,
                    "WITHOUT_SHIPPING_AND_TAILOR"
                  )}
                </span>
              )}
            </div>

            <div className="price">
              {this.props.ithoobCookie !== -1 ? (
                <span>
                  {this.props.orderSummary.expectTotal
                    ? this.isFloat(
                        parseFloat(this.props.orderSummary.expectTotal)
                      )
                    : "0"}
                </span>
              ) : this.props.items.length > 0 ? (
                this.props.partnerDiscount ? (
                  <span>
                    {cartTotal - (cartTotal * this.props.partnerDiscount) / 100}
                  </span>
                ) : (
                  <span>{cartTotal}</span>
                )
              ) : (
                ""
              )}
              {getStringVal(this.props.language, "SR")}
            </div>
            
          </div>
          {Number(quantity_discount) ? (<div className="card-text d-flex total  align-items-center">
            <div className="title">
              {getStringVal(this.props.language, "quantity_discount")}
            </div>
            <div className="price">
                    <span id="quantity_discount">{quantity_discount}</span>
                {getStringVal(this.props.language, "SR")}
            </div>
          </div>) : ""}
          {this.props.ithoobCookie !== -1 ? (
            /* one or more items are out of stock! */
            this.props.items.filter(item => item.inStock === false).length > 0 ? (
            <div>
                <p className="card-text text-danger">{getStringVal(this.props.language, "THERE_IS_ONE_OR_MORE_UNAVAILABLE_ITEMS")}</p><button
                className="button card-link forMsg disabled"
                onMouseEnter={e => this.outOfCoverageMsgAppear(e)}
              >
                {getStringVal(this.props.language, "GO_TO_PAYMENT")}
              </button>
            </div>
           ) :
             /* one or more items aren't avaiable! (Deleted item) */
             this.props.hasUnavailableItem === true ? (
               <div>
                  <p className="card-text text-danger">{getStringVal(this.props.language, "THERE_IS_ONE_OR_MORE_UNAVAILABLE_ITEMS")}</p>
                  <button
                    className="button card-link forMsg disabled"
                    onMouseEnter={e => this.outOfCoverageMsgAppear(e)}
                  >
                   {getStringVal(this.props.language, "GO_TO_PAYMENT")}
                 </button>
              </div>
            ) :
            /*sizes complete and not outof coverage country -> normal button (x !y)*/
            this.props.allSizesComplete && !this.props.outOfCoverage ? (
              <Link href="/checkout">
                <a className="button card-link forRout checkout-btn">
                  {getStringVal(this.props.language, "GO_TO_PAYMENT")}
                </a>
              </Link>
            ) : /*sizes complete and  out of coverage country -> dimmed button with desc on hover (x y)*/
            this.props.allSizesComplete && this.props.outOfCoverage ? (
              <button
                className="button card-link forMsg disabled"
                onMouseEnter={e => this.outOfCoverageMsgAppear(e)}
              >
                {getStringVal(this.props.language, "GO_TO_PAYMENT")}
              </button>
            ) : /*not sizes complete and not outof coverage country -> not dimmed button (!x !y)*/
            !this.props.allSizesComplete && !this.props.outOfCoverage ? (
              <button
                className="button card-link forMsg checkout-btn"
                onClick={this.confirmPaymentClick}
              >
                {getStringVal(this.props.language, "GO_TO_PAYMENT")}
              </button>
            ) :
            (
              /*not sizes complete and  outof coverage country -> normal button (!x y)*/
              <button
                className="button card-link forMsg disabled"
                onClick={this.confirmPaymentClick}
                onMouseEnter={e => this.outOfCoverageMsgAppear(e)}
              >
                {getStringVal(this.props.language, "GO_TO_PAYMENT")}
              </button>
            )
          ) : (
            <button
              type="button"
              className="button card-link checkout-btn"
              onClick={this.showPopup}
            >
              {getStringVal(this.props.language, "GO_TO_PAYMENT")}
            </button>
          )}
          <span className="outOfCoverageDesc">
            <span className="d-flex justify-content-end">
              <span
                className="close"
                onClick={e => this.outOfCoverageMsgDisappear(e)}
              >
                X
              </span>
            </span>
            <span>
              {getStringVal(
                this.props.language,
                "SHIPPING_SERVICE_NOT_AVAILABLE"
              )}{" "}
              <span>
                <Link href="/profile">
                  <a>
                    {/* معلوماتى الشخصيه */}
                    {getStringVal(this.props.language, "HERE")}
                  </a>
                </Link>
              </span>
            </span>
          </span>
        </div>
      </div>
    ) : (
      ""
    );
  }
}

const mapOrderSummaryStateToProps = state => ({
  language: state.generalReducer.language,
  status: state.myCart.status,
  message: state.myCart.message,
  orderSummary: state.myCart.orderSummary,
  ithoobUser: state.loginReducer.ithoobUser,
  ithoobCookie: state.loginReducer.ithoobCookie,
  deliveryPrice: state.categories.deliveryPrice,
  sizeManPrice: state.categories.sizeManPrice,
  discountStatus: state.myCart.discountStatus,
  partnerDiscount: state.myCart.partnerDiscount,
  userDiscount: state.myCart.userDiscount,
  discountMessage: state.myCart.discountMessage,
  total: state.myCart.total,
  items: state.myCart.items,
  loginPopUpStatus: state.loginReducer.loginPopUpStatus,
  measurementsIsComplate: state.myCart.measurementsIsComplate,
  sizeStatus: state.myCart.sizeStatus,
  items: state.myCart.items,
  allSizesComplete: state.myCart.allSizesComplete,
  redirectToChechout: state.myCart.redirectToChechout,
  successSignupFromMycart: state.signupReducer.successSignupFromMycart,
  outOfCoverage: state.myCart.outOfCoverage,
  hasUnavailableItem: state.myCart.hasUnavailableItem
});

const mapOrderSummaryDispatchToProps = dispatch => ({
  loginPopUpStatusToggle: value => {
    dispatch(loginPopUpStatusToggle(value));
  },
  updateErrMsgStatus: status => {
    dispatch(updateErrMsgStatus(status));
  },
  updateMeasurementsIsComplateStatus: status => {
    dispatch(updateMeasurementsIsComplateStatus(status));
  },
  signUpFromPaymentBtn(value) {
    dispatch(signUpFromPaymentBtn(value));
  },
  updateRedirectToChechout: status => {
    dispatch(updateRedirectToChechout(status));
  },
  deletePartnerDiscountLocalStorage() {
    dispatch(deletePartnerDiscountLocalStorage());
  }
});

export default connect(
  mapOrderSummaryStateToProps,
  mapOrderSummaryDispatchToProps
)(OrderSummary);
