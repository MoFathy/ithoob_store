import React, { Component } from "react";
import { connect } from "react-redux";
//actions
import { getCookie } from "../../scripts/getCookieFile";
import {
  confirmPayment,
  updateShowConfrimPaymentPopup
} from "../../actions/checkout/confirmPayment";
import { getStringVal } from "../../scripts/multiLang";
class ConfirmpPaymentPopup extends Component {
  componentDidMount() {
    require("bootstrap/js/dist/modal");
  }
  handleClick = () => {
    let coupon_code = this.props.coupon_code;
    console.log(coupon_code);
    if (this.props.deliveryMethod == "branch") {
      this.props.confirmPayment(
        this.props.language === false ? 1 : 2,
        getCookie("ithoobUser", "authenticationToken"),
        " ",
        this.props.deliveryMethod,
        this.props.paymentMethod,
        this.props.sizeManFlag,
        coupon_code,
        this.props.coupon_discount
      );
    } else {
      this.props.confirmPayment(
        this.props.language === false ? 1 : 2,
        getCookie("ithoobUser", "authenticationToken"),
        this.props.deliveryAddress,
        // $("#addressInput").val(),
        this.props.deliveryMethod,
        this.props.paymentMethod,
        this.props.sizeManFlag,
        coupon_code,
        this.props.coupon_discount
      );
    }

    // this.props.updateOrderSucceededPopup(true);
    this.closeModal();
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.showConfrimPaymentPopup !==
        prevProps.showConfrimPaymentPopup &&
      this.props.showConfrimPaymentPopup == true
    ) {
      $("#confirmPaymentModal").modal("show");
    } else if (
      this.props.showConfrimPaymentPopup !== prevProps.showConfrimPaymentPopup
    ) {
      $("#confirmPaymentModal").modal("hide");
    }
  }
  closeModal = () => {
    this.props.updateShowConfrimPaymentPopup(false);
  };

  
  render() {
    const couponInputStyle = {
      padding: '5px',
      border: '1px solid #ddd',
      'border-radius': '10px',
      'margin': '8px',
    };
    return (
      <div>
        {/* <h1>ConfirmpPaymentPopup</h1> */}
        <div
          className="modal fade"
          tabIndex="-1"
          role="dialog"
          id="confirmPaymentModal"
          data-backdrop="static"
          data-keyboard="false"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content boxShadow">
              <div className="modal-header">
                <h5 className="modal-title">
                  {/* تأكيد الطلب */}
                  {getStringVal(this.props.language, "CONFIRMATION")}
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={this.closeModal}
                >
                  <span aria-hidden="true">
                    {" "}
                    <span className="icon-close" />{" "}
                  </span>
                </button>
              </div>
              <div className="modal-body">
                <p className="text-center mb-2 font-weight-bold">
                  {/* هل أنت متأكد انك تريد إتمام الطلب؟ */}
                  {getStringVal(
                    this.props.language,
                    "ARE_YOU_SURE_YOU_WANT_TO_COMPLETE_THE_REQUEST"
                  )}
                </p>
                <p>{getStringVal(
                    this.props.language,
                    "CANCELLATION_POLICY_APPLICATIONS"
                  )}
                </p>
                <p>{getStringVal(this.props.language, "CANCEL_ORDER_POLICY_1_TITLE")}</p>
                <p>{getStringVal(this.props.language, "CANCEL_ORDER_POLICY_2_TITLE")}</p>
                <p>{getStringVal(this.props.language, "CANCEL_ORDER_POLICY_3_TITLE")}</p>
                <p>{getStringVal(this.props.language, "CANCEL_ORDER_POLICY_4_TITLE")}</p>
                <p>{getStringVal(this.props.language, "CANCEL_ORDER_POLICY_5_TITLE")}</p>
                <hr />
                {/* <span>
                  {getStringVal(this.props.language, "DISCOUNT_COUPON")}
                </span>
                <input type="text" ref="coupon_code" className="form-controll" style={couponInputStyle}/> */}
              </div>
              <div className="modal-footer ">
                <button
                  type="button"
                  className="btn button w-100 ml-3"
                  onClick={this.handleClick}
                >
                  {getStringVal(this.props.language, "YES_COMPLETE_THE_ORDER")}
                </button>
                <button
                  type="button"
                  className="btn button w-100"
                  data-dismiss="modal"
                  onClick={this.closeModal}
                >
                  {getStringVal(this.props.language, "NO")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapConfirmPaymentStateToProps = state => ({
  language: state.generalReducer.language,
  status: state.checkout.status,
  message: state.checkout.message,
  coupon_code: state.checkout.coupon_code,
  coupon_discount: state.checkout.coupon_discount,
  address: state.checkout.address,
  deliveryMethod: state.checkout.deliveryMethod,
  paymentMethod: state.checkout.paymentMethod,
  showConfrimPaymentPopup: state.checkout.showConfrimPaymentPopup,
  sizeManFlag: state.checkout.sizeManFlag,
  deliveryAddress: state.checkout.deliveryAddress
});

const mapConfirmPaymentDispatchToProps = dispatch => ({
  confirmPayment: (
    language,
    authorization,
    address,
    deliveryMethod,
    paymentMethod,
    sizeManFlag,
    coupon_code,
    MDNDiscount
  ) => {
    dispatch(
      confirmPayment(
        language,
        authorization,
        address,
        deliveryMethod,
        paymentMethod,
        sizeManFlag,
        coupon_code,
        MDNDiscount
      )
    );
  },
  updateShowConfrimPaymentPopup: payload => {
    dispatch(updateShowConfrimPaymentPopup(payload));
  },
  // updateOrderSucceededPopup: payload => {
  //   dispatch(updateOrderSucceededPopup(payload));
  // }
});

export default connect(
  mapConfirmPaymentStateToProps,
  mapConfirmPaymentDispatchToProps
)(ConfirmpPaymentPopup);
