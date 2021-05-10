import React, { Component } from "react";
import { connect } from "react-redux";
// actions
import { getCookie } from "../../scripts/getCookieFile";
import {
  updatedeliveryMethod,
  updateAddress,
  updatePaymentMethod,
  updateShowDeliveryCostStatus,
} from "../../actions/checkout/checkoutActions";
import { getStringVal } from "../../scripts/multiLang";
import Payment from "./payment";
import DeliveryAddress from "./deliveryAddress";
import { getCartItems, getCartItemsFromLocalStorage } from "../../actions/myCart/myCartActions";

class Delievery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homeDelivery: true,
    };
    this.onFocusHandle = this.onFocusHandle.bind(this);
  }
  onFocusHandle() {
    if ($("#addressInput").hasClass("alert")) {
      $(".showAlert").css("display", "none");
      $("#addressInput").removeClass("alert");
    }
  }
  componentDidMount() {
    require("bootstrap/js/dist/tab");
    this.props.updatedeliveryMethod("homeDelivery");
    this.props.updatePaymentMethod("creditCard");

    this.props.getCartItems(
      this.props.language === false ? 1 : 2,
      getCookie("ithoobUser", "authenticationToken")
    );
  }

  handleHomeClick = () => {
    this.props.updatedeliveryMethod("homeDelivery");
    this.props.updateAddress($("#addressInput").val());
    // this.props.updatePaymentMethod("creditCard");
  };

  handleBranchClick = () => {
    this.props.updateAddress(" ");
    this.props.updatedeliveryMethod("branch");
    // this.props.updatePaymentMethod("payOnDelivery");
  };

  handlePaymentMethod = (method) => {
    // this.props.updatedeliveryMethod("homeDelivery");
    // this.props.updateAddress($("#addressInput").val());
    this.props.updatePaymentMethod(method);
  };

  render() {
    return (
      <div className="delivery">
        <h4 className="">
          {getStringVal(this.props.language, "DELIVERY_METHOD")}
          {/* طريقه التوصيل */}
        </h4>

        <nav>
          <div className="nav nav-tabs" id="nav-tab-delivery" role="tablist">
            <a
              className="nav-item nav-link  active"
              id="nav-home-delivery-tab"
              onClick={this.handleHomeClick}
              data-toggle="tab"
              href="#nav-home-delivery"
              role="tab"
              aria-controls="nav-home"
              aria-selected="true"
            >
              {getStringVal(this.props.language, "DELIVERY_TO_HOME")}
              {/* التوصيل إلى المنزل */}
            </a>
            <a
              className="nav-item nav-link"
              id="nav-branch-delivery-tab"
              onClick={this.handleBranchClick}
              data-toggle="tab"
              href="#nav-branch-delivery"
              role="tab"
              aria-controls="nav-branch-delivery"
              aria-selected="false"
            >
              {/* الأستلام من الفرع */}

              {getStringVal(this.props.language, "RECEIVING_FROM_BRANCH")}
            </a>
          </div>
        </nav>
        <div className="tab-content" id="nav-tabContent-delivery">
          <div
            className="tab-pane fade  show active"
            id="nav-home-delivery"
            role="tabpanel"
            aria-labelledby="nav-home-delivery-tab"
          >
            <DeliveryAddress />
            {/* <div className="form-group">
            <label className="d-flex align-items-center">
              {getStringVal(this.props.language, "ADDRESS")}
              &nbsp;&nbsp;
              <span className="showAlert">
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
            <input
              onFocus={this.onFocusHandle}
              type="text"
              className="form-control"
              defaultValue={this.props.address}
              id="addressInput"
            />
          </div> */}
          </div>
          <div
            className="tab-pane fade"
            id="nav-branch-delivery"
            role="tabpanel"
            aria-labelledby="nav-branch-delivery-tab"
          >
            {/* تفاصيل الفرع */}
            <h6 className="">
              {getStringVal(this.props.language, "BRANCH_DETAILS")}
            </h6>
            {/* عنوان الفرع */}
            <div className="mb-3 mt-3">
              <p>{getStringVal(this.props.language, "BRANCH_ADDRESS")}</p>
              <span className="text-muted">{this.props.branch.address}</span>
            </div>
            {/* مواعيد عمل الفرع */}
            <div className="d-flex">
              <div>
                <p>
                  {getStringVal(this.props.language, "WORKING_HOURS_BRANCH")}
                </p>
                <span className="text-muted">
                  {this.props.branch.workHours}
                </span>
              </div>
              <div className="mx-5">
                <p>{getStringVal(this.props.language, "BRANCH_NUMBER")}</p>
                <span className="text-muted">{this.props.branch.number}</span>
              </div>
            </div>
          </div>
        </div>

        <h4 className="">
          {getStringVal(this.props.language, "PAYMENT_METHOD")}
          {/* طريقه الدفع */}
        </h4>
        <nav>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <a
              className="nav-item nav-link  active"
              id="nav-home-tab"
              onClick={() => this.handlePaymentMethod("creditCard")}
              data-toggle="tab"
              href="#nav-home"
              role="tab"
              aria-controls="nav-home"
              aria-selected="true"
            >
              {getStringVal(this.props.language, "PAY_WITH_CREDIT_CARD")}
              {/* الدفع بالبطاقة الإئتمانية */}
            </a>
            <a
              className="nav-item nav-link"
              id="nav-tabby-tab"
              onClick={() => this.handlePaymentMethod("tabbyPayment")}
              data-toggle="tab"
              href="#nav-home"
              role="tab"
              aria-controls="nav-home"
              aria-selected="true"
            >
              {getStringVal(this.props.language, "INSTALLMENT_WITH_TABBY")}
              {/* الدفع بالبطاقة الإئتمانية */}
            </a>
            {this.props.cartItems.filter((e) => e.stockType === "fabric")
              .length === 0 && (
              <a
                className="nav-item nav-link"
                id="nav-branch-tab"
                onClick={() => this.handlePaymentMethod("payOnDelivery")}
                data-toggle="tab"
                href="#nav-pay-home"
                role="tab"
                aria-controls="nav-branch"
                aria-selected="false"
              >

                {getStringVal(this.props.language, "PAY_ON_DELIVERY")}
              </a>
            )}
            
            <a
              className="nav-item nav-link"
              id="nav-branch-tab"
              onClick={() => this.handlePaymentMethod("bankTransfer")}
              data-toggle="tab"
              href="#nav-branch"
              role="tab"
              aria-controls="nav-branch"
              aria-selected="false"
            >
              {/* الدفع من خلال حوالة بنكية */}

              {getStringVal(this.props.language, "PAY_THROUGH_BANK_TRANSFARE")}
            </a>
          </div>
        </nav>

        <div className="tab-content" id="nav-tabContent">
          <div
            className="tab-pane fade  show active"
            id="nav-home"
            role="tabpanel"
            aria-labelledby="nav-home-tab"
          ></div>
          <div
            className="tab-pane fade"
            id="nav-branch"
            role="tabpanel"
            aria-labelledby="nav-branch-tab"
          >
            <Payment />
            {/* تفاصيل الفرع */}
            {/* <h6 className="">
              {getStringVal(this.props.language, "BRANCH_DETAILS")}
            </h6> */}
            {/* عنوان الفرع */}
            {/* <div className="mb-3 mt-3">
              <p>
                {getStringVal(this.props.language, "BRANCH_ADDRESS")}
              </p>
              <span className="text-muted">{this.props.branch.address}</span>
            </div> */}
            {/* مواعيد عمل الفرع */}
            {/* <div className="d-flex">
              <div>
                <p>
                  {getStringVal(this.props.language, "WORKING_HOURS_BRANCH")}
                </p>
                <span className="text-muted">
                  {this.props.branch.workHours}
                </span>
              </div>
              <div className="mx-5">
                <p>
                  {getStringVal(this.props.language, "BRANCH_NUMBER")}
                </p>
                <span className="text-muted">{this.props.branch.number}</span>
              </div>
            </div> */}
          </div>
          <div
            className="tab-pane fade"
            id="nav-pay-home"
            role="tabpanel"
            aria-labelledby="nav-branch-tab"
          ></div>
        </div>
      </div>
    );
  }
}
const mapDelieveryStateToProps = (state) => ({
  language: state.generalReducer.language,
  address: state.checkout.address,
  branch: state.checkout.branch,
  deliveryMethod: state.checkout.deliveryMethod,
  paymentMethod: state.checkout.paymentMethod,
  cartItems: state.myCart.items,
  ithoobCookie: state.loginReducer.ithoobCookie,
});

const mapDelieveryDispatchToProps = (dispatch) => ({
  getCartItems: (lang, authToken) => {
    dispatch(getCartItems(lang, authToken));
  },
  getCartItemsFromLocalStorage: () => {
    dispatch(getCartItemsFromLocalStorage());
  },
  updatedeliveryMethod: (payload) => {
    dispatch(updatedeliveryMethod(payload));
  },
  updateAddress: (payload) => {
    dispatch(updateAddress(payload));
  },
  updatePaymentMethod: (payload) => {
    dispatch(updatePaymentMethod(payload));
  },
});

export default connect(
  mapDelieveryStateToProps,
  mapDelieveryDispatchToProps
)(Delievery);
