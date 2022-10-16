import React, { Component } from "react";
import { connect } from "react-redux";
import Link from "next/link";
//actions
import { getCookie } from "../../scripts/getCookieFile";
import { updateShowConfrimPaymentPopup } from "../../actions/checkout/confirmPayment";
import { getStringVal } from "../../scripts/multiLang";
import AvailableDiscounts from "../includes/AvailableDiscounts";
import { checkForCouponDiscount, checkForCouponFailed } from "../../actions/checkout/checkoutActions";
import IthoobPartners from "../myCart/ithoobPartners";
import PartnerTablePopup from "../myCart/partnerTablePopup";

class OrderSummary extends Component {
  constructor(props) {
    super(props);
    // this.state = { showAlert: false };
    this.msgAppear = this.msgAppear.bind(this);
    this.msgDisappear = this.msgDisappear.bind(this);
  }
  state = {
    isMDN: false,
    expDiscount: 0,
  };

  handleAddCoupon = () => {
    let coupon_code = this.refs.coupon_code.value;
    let token = getCookie("ithoobUser", "authenticationToken");
    let language = this.props.language === false ? 1 : 2;
    let couponAllowed = true;
    //Temporary static coupon code

    let nowDate = new Date();
    let firstDate = new Date("4/6/2021");
    let secondDate = new Date("4/7/2021");
    this.props.cartItems.forEach((cartItem) => {
      if (
        cartItem.price_discount && cartItem.price_discount != 0
      ) {
        this.props.couponNotAllowed();
        couponAllowed = false;
        return;
      }
    });
    if(!couponAllowed) return;
    var disc = 0;
    if (
      coupon_code === "MDN" &&
      nowDate >= firstDate &&
      nowDate <= secondDate
    ) {
      this.props.cartItems.forEach((element) => {
        if (
          element.sizeType === "accessories" ||
          element.sizeType === "shoes"
        ) {
          disc += (element.price * element.quantity * 10) / 100;
        }
        if (element.sizeType === "sizeable") {
          disc += (element.price * element.quantity * 30) / 100;
        }
      });
      this.setState({ ...this.state, isMDN: true, expDiscount: disc });
      // return;
    }
    // console.log('====================================');
    // console.log(this.props.cartItems); 
    // console.log('====================================');
    // console.log(getCookie("ithoobUser", "authenticationToken"));
    this.props.checkForCouponDiscount(language, token, coupon_code, disc);
  };

  componentDidMount() {
    $(".showAlertmobile").css("display", "none");
    // $(".coupon_alert").css("display", "none");
    // $(".loading").css("display", "none");
  }
  msgAppear(e) {
    $(e.target).parent().find("span.desc").css("display", "block");
  }

  msgDisappear(e) {
    $(e.target).parent().find("span.desc").css("display", "none");
  }

  handleClick = () => {
    // console.log("this.props.deliveryMethod");
    // console.log(this.props.deliveryMethod);
    // console.log(" $('#addressInput').val().length ");
    // console.log($("#addressInput").val().length);
    if (this.props.deliveryMethod == "homeDelivery") {
      if (
        this.props.deliveryAddress.street !== "" &&
        this.props.deliveryAddress.naighborhood !== ""
      ) {
        this.props.updateShowConfrimPaymentPopup(true);
        $(".showAlert").css("display", "none");
        $("#addressInput").removeClass("alert");
        $(".showAlertmobile").css("display", "none");
      } else {
        if (this.props.deliveryAddress.street === "") {
          $("#street").addClass("alert");
        }
        if (this.props.deliveryAddress.naighborhood === "") {
          $("#naighborhood").addClass("alert");
        }
        if ($(window).width() < 600) {
          $(".showAlertmobile").css("display", "block");
        } else {
          // $("#addressInput").addClass("alert");
          $(".showAlert").css("display", "block");
        }
      }
      // if (
      //   $("#addressInput").val().length >= 20 &&
      //   $("#addressInput").val().length <= 100
      // ) {
      //   this.props.updateShowConfrimPaymentPopup(true);
      //   $(".showAlert").css("display", "none");
      //   $("#addressInput").removeClass("alert");
      //   $(".showAlertmobile").css("display", "none");
      // } else {
      //   if ($(window).width() < 600) {
      //     $(".showAlertmobile").css("display", "block");
      //   } else {
      //     $("#addressInput").addClass("alert");
      //     $(".showAlert").css("display", "block");
      //   }
      // }
    } else if (this.props.deliveryMethod == "branch") {
      this.props.updateShowConfrimPaymentPopup(true);

      $(".showAlert").css("display", "none");
      $("#addressInput").removeClass("alert");
      $("#street").removeClass("alert");
      $("#naighborhood").removeClass("alert");
    }
  };

  isFloat = (n) => {
    return Number(n) === n && n % 1 !== 0 ? n.toFixed(2) : n.toFixed();
  };

  render() {
    // let products = this.props.cartItems;
var sebhaArray =[];
var khatemArray =[];
var asweraArray =[];
var deblaArray =[];
var thoobsArray =[];

this.props.cartItems.forEach(item =>{
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
    return (
      <div className="card orderSammury">
        <div className="">
          <h5 className="card-title">
            {/* ملخص الطلب */}
            {getStringVal(this.props.language, "ORDER_SUMMARY")}
          </h5>

          <div className="card-text d-flex">
            <div className="title">
              {/* إجمالي المنتجات */}
              {getStringVal(this.props.language, "TOTAL_PRODUCTS")}
            </div>

            <div className="price">
              <span>{this.props.orderSummary.total}</span>

              {getStringVal(this.props.language, "SR")}

              {/* ريال */}
            </div>
          </div>

          {this.state.isMDN ? (
            <>
              <div className="card-text d-flex">
                <p>
                  {" "}
                  {getStringVal(
                    this.props.language,
                    "COUPON_DISCOUNT_FOR_THOOB"
                  )}{" "}
                </p>
                <p>{"30%"} </p>
              </div>
              <div className="card-text d-flex">
                <p>
                  {" "}
                  {getStringVal(
                    this.props.language,
                    "COUPON_DISCOUNT_FOR_THOOB_AND_SHOES"
                  )}{" "}
                </p>
                <p>{"10%"} </p>
              </div>
            </>
          ) : this.props.checkoutState.coupon_discount &&
            parseInt(this.props.checkoutState.coupon_discount) !== 0 ? (
            <div className="card-text d-flex">
              <p> {getStringVal(this.props.language, "COUPON_DISCOUNT")} </p>
              <p>
                {this.props.checkoutState.coupon_discount_type === "percent" ? this.props.orderSummary.total * (parseInt(this.props.checkoutState.coupon_discount) / 100) : parseInt(this.props.checkoutState.coupon_discount)}{" "}
                {getStringVal(this.props.language, "SR")}
              </p>
            </div>
          ) : (
            ""
          )}

          {this.props.deliveryMethod == "homeDelivery" ? (
            <div className="card-text d-flex">
              <div className="title">
                {/* الشحن */}

                {getStringVal(this.props.language, "SHIPPING")}
                <span
                  className="icon-round-error-symbol"
                  onMouseEnter={(e) => this.msgAppear(e)}
                  onMouseLeave={(e) => this.msgDisappear(e)}
                ></span>
                <span className="desc">
                  {getStringVal(
                    this.props.language,
                    "YOU_WILL_DETERMINE_THE_COST_OF_SHIPPING_BASED_ON_YOUR_AREA_AND_YOUR_ADDRESS"
                  )}
                  {/* سوف تحدد تكلفه الشحن بناءا على منطقتك و عنوانك */}
                </span>
              </div>

              <div className="price">
                <span>{this.props.orderSummary.delivery}</span>
                {/* ريال */}
                {getStringVal(this.props.language, "SR")}
              </div>
            </div>
          ) : (
            ""
          )}

          {this.props.sizeManFlag ? (
            <div className="card-text d-flex">
              <div className="title">
                {getStringVal(this.props.language, "THE_COST_TAILOR")}
                <span
                  className="icon-round-error-symbol"
                  onMouseEnter={(e) => this.msgAppear(e)}
                  onMouseLeave={(e) => this.msgDisappear(e)}
                ></span>
                <span className="desc">
                  {getStringVal(
                    this.props.language,
                    "YOU_WILL_DETERMINE_THE_COST_TARAZI_BASED_ON_YOUR_AREA_AND_YOUR_ADDRESS"
                  )}
                </span>
              </div>

              <div className="price">
                <span>{this.props.orderSummary.sizeMan}</span>

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
            total={this.props.orderSummary.total}
            language={this.props.language}
          />

          <hr />
          {Number(quantity_discount) ? (<div className="card-text d-flex total  align-items-center">
            <div className="title">
              {getStringVal(this.props.language, "quantity_discount")}
            </div>
            <div className="price">
                    <span id="quantity_discount">{quantity_discount}</span>
                {getStringVal(this.props.language, "SR")}
            </div>
          </div>) : ""}
          <hr />

          <div className="card-text d-flex total mb-0">
            <div className="title">
              {/* إجمالي المنتجات */}
              {getStringVal(this.props.language, "TOTAL_PRODUCTS")}
            </div>
            <div className="price">
              {this.props.deliveryMethod == "homeDelivery" ? (
                <span>
                  {this.props.checkoutState.coupon_discount
                    ? this.isFloat(parseFloat(this.props.orderSummary.expectedTotal)) -
                      (this.props.checkoutState.coupon_discount_type === "percent" ? this.props.orderSummary.total * (parseInt(this.props.checkoutState.coupon_discount) /100) : parseInt(this.props.checkoutState.coupon_discount)) - Number(quantity_discount)
                    : this.props.paymentMethod === "tabbyPayment"
                    ? this.isFloat(
                        parseFloat(
                          this.props.orderSummary.expectedTotal * 6.5 / 100
                        ) + 1 + parseFloat(
                          this.props.orderSummary.expectedTotal
                        )
                      ) - Number(quantity_discount)
                    : this.props.paymentMethod === "tabbyPayLater"
                    ? this.isFloat(
                        parseFloat(
                          this.props.orderSummary.expectedTotal * 5.5 / 100
                        ) + parseFloat(
                          this.props.orderSummary.expectedTotal
                        ) + 1
                      ) - Number(quantity_discount)
                    : this.isFloat(
                        parseFloat(this.props.orderSummary.expectedTotal)
                      )  - Number(quantity_discount)}
                  {/* {this.props.orderSummary.expectedTotal} */}
                </span>
              ) : (
                <span>
                  {/* {this.props.orderSummary.expectedTotal -
                    this.props.orderSummary.delivery} */}
                  {this.props.checkoutState.coupon_discount
                    ? this.isFloat(parseFloat(this.props.orderSummary.expectedTotal)) -
                      (this.props.checkoutState.coupon_discount_type === "percent" ? this.props.orderSummary.total * (parseInt(this.props.checkoutState.coupon_discount) / 100) : parseInt(this.props.checkoutState.coupon_discount)) -
                      parseFloat(this.props.orderSummary.delivery) - Number(quantity_discount)
                    : this.props.paymentMethod === "tabbyPayment"
                    ? this.isFloat(
                        parseFloat(
                          (parseFloat(this.props.orderSummary.expectedTotal) -
                            parseFloat(this.props.orderSummary.delivery)) * 6.5 / 100
                        ) + parseFloat(
                          parseFloat(this.props.orderSummary.expectedTotal) -
                            parseFloat(this.props.orderSummary.delivery)
                        )  + 1
                      ) - Number(quantity_discount)
                    : this.props.paymentMethod === "tabbyPayLater"
                    ? this.isFloat(
                        parseFloat(
                          parseFloat(this.props.orderSummary.expectedTotal) -
                            parseFloat(this.props.orderSummary.delivery)
                        ) * 5.5 / 100  + parseFloat(
                          parseFloat(this.props.orderSummary.expectedTotal) -
                            parseFloat(this.props.orderSummary.delivery)
                        ) + 
                          1
                      ) - Number(quantity_discount)
                    : this.isFloat(
                        parseFloat(
                          parseFloat(this.props.orderSummary.expectedTotal) -
                            parseFloat(this.props.orderSummary.delivery)
                        ) - Number(quantity_discount)
                      )}
                </span>
              )}

              {getStringVal(this.props.language, "SR")}
            </div>
          </div>
          {/* <Link href="/"> */}

          {/*  <div
            className={
              this.state.showAlert
                ? "alert alert-danger d-block"
                : "alert alert-danger d-none"
            }
            role="alert"
          >
            <img src={error} alt="password changed" />

            {getStringVal(
              this.props.language,
              "YOU_CAN_NOT_LEAVE_THE_TITLE_BOX_BLANK"
            )}
          </div> */}
          <label className="d-flex align-items-center">
            {/* العنوان */}
            &nbsp;&nbsp;
            <span className="showAlertmobile" style={{ color: "red" }}>
              {getStringVal(
                this.props.language,
                "YOU_CAN_NOT_LEAVE_THE_TITLE_BOX_BLANK"
              )}
              {".."}
              {getStringVal(
                this.props.language,
                "TITLE_MUST_BE_BETWEEN_3_TO_100_CHARACTERS"
              )}
            </span>
          </label>
          {/* <div class="form-group mx-4">
            <label htmlFor="coupon_code">
              {getStringVal(this.props.language, "DISCOUNT_COUPON")}
            </label>
            <div className="row">
              <div className="col-6">
                <input
                  type="text"
                  name="coupon_code"
                  id="coupon_code"
                  ref="coupon_code"
                  class="form-control"
                  placeholder={getStringVal(
                    this.props.language,
                    "DISCOUNT_COUPON"
                  )}
                  aria-describedby="discount"
                  required
                />
              </div>
              <div className="col-6">
                <button
                  type="button"
                  class="btn"
                  style={{ color: "#ffffff", backgroundColor: "#b78b1e" }}
                  onClick={this.handleAddCoupon}
                >
                  {this.props.checkoutState.coupon_loading ? (
                    <img
                      src={require("../../images/spinner.gif")}
                      className="loading"
                      width="60px"
                      height="24px"
                    />
                  ) : (
                    <span className="notLoading">
                      {getStringVal(this.props.language, "ADD_COUPN_CODE")}
                    </span>
                  )}
                </button>
              </div>
            </div>
            <small class="text-red coupon_alert p-2" style={{ color: "red" }}>
              {this.props.checkoutState.coupone_message &&
                this.props.checkoutState.coupone_message}
            </small>
          </div> */}

          {/* start coupon code section */}
          {!this.props.partnerDiscount &&
            this.props.paymentMethod != "tabbyPayment" &&
            this.props.paymentMethod != "tabbyPayLater" && (
              <div id="accordionTwo">
                <div className="card ithoobPartners m-0">
                  <div
                    className="card-header d-flex justify-content-between align-items-center"
                    id="headingTwo"
                  >
                    <div className="mb-0">
                      <h5
                        className="card-title collapsed"
                        data-toggle="collapse"
                        data-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                      >
                        {getStringVal(this.props.language, "DISCOUNT_COUPON")}
                      </h5>
                    </div>
                    <span
                      className="card-title collapsed"
                      data-toggle="collapse"
                      data-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      <span className="icon-arrow-right"></span>
                    </span>
                  </div>

                  <div
                    id="collapseTwo"
                    className="collapse "
                    aria-labelledby="headingTwo"
                    data-parent="#accordionTwo"
                  >
                    <div className="card-body">
                      <form className="form-inline">
                        <div className="form-group">
                          <input
                            type="text"
                            name="coupon_code"
                            id="coupon_code"
                            ref="coupon_code"
                            class="form-control"
                            placeholder={getStringVal(
                              this.props.language,
                              "DISCOUNT_COUPON"
                            )}
                            aria-describedby="discount"
                            required
                          />
                        </div>

                        <button
                          type="button"
                          className="btn button"
                          onClick={this.handleAddCoupon}
                        >
                          {this.props.checkoutState.coupon_loading ? (
                            <img
                              src={require("../../images/spinner.gif")}
                              className="loading"
                              width="60px"
                              height="24px"
                            />
                          ) : (
                            <span className="notLoading">
                              {getStringVal(this.props.language, "ENTER")}
                            </span>
                          )}
                        </button>
                      </form>
                      <small
                        class="text-red coupon_alert p-2"
                        style={{ color: "red" }}
                      >
                        {this.props.checkoutState.coupone_message &&
                          this.props.checkoutState.coupone_message}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            )}

          {!this.props.checkoutState.coupon_discount &&
            this.props.paymentMethod != "tabbyPayment" &&
            this.props.paymentMethod != "tabbyPayLater" && <IthoobPartners />}
          <PartnerTablePopup />
          <button
            type="button"
            className="button card-link mb-2"
            onClick={this.handleClick}
          >
            {/* الذهاب إلى الدفع */}
            {getStringVal(this.props.language, "PAYMENT_CONFIRMATION")}
          </button>
          <Link href="/my-cart" as="/my-cart">
            <a
              // href="#"
              className=" text-center d-block"
              // onClick={e => this.loginClick(e)}
            >
              {getStringVal(this.props.language, "BACK_TO_THE_SHOPPING_CART")}
            </a>
          </Link>
        </div>
      </div>
    );
  }
}
const mapOrderSummaryStateToProps = (state) => ({
  language: state.generalReducer.language,
  status: state.checkout.status,
  message: state.checkout.message,

  orderSummary: state.checkout.orderSummary,
  userDiscount: state.myCart.userDiscount,

  // Nothing returned when getting "partnerDiscount" from "checkout" state. That's why we get it from "myCart" instead
  partnerDiscount: state.myCart.partnerDiscount,

  checkoutState: state.checkout,

  address: state.checkout.address,
  deliveryMethod: state.checkout.deliveryMethod,
  paymentMethod: state.checkout.paymentMethod,

  sizeManPrice: state.categories.sizeManPrice,
  sizeManFlag: state.checkout.sizeManFlag,
  deliveryAddress: state.checkout.deliveryAddress,

  cartItems: state.myCart.items,
});

const maporderSummaryDispatchToProps = (dispatch) => ({
  updateShowConfrimPaymentPopup: (payload) => {
    dispatch(updateShowConfrimPaymentPopup(payload));
  },
  checkForCouponDiscount: (language, token, coupon_code, disc) => {
    dispatch(checkForCouponDiscount(language, token, coupon_code, disc));
  },
  couponNotAllowed: ()=>{
    dispatch(checkForCouponFailed({message : "المنتجات المختارة لديها خصم بالفعل"}));
  }
});

export default connect(
  mapOrderSummaryStateToProps,
  maporderSummaryDispatchToProps
)(OrderSummary);
