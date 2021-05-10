import React, { Component } from "react";
import { connect } from "react-redux";
import Link from "next/link";
//actions
import { getCookie } from "../../scripts/getCookieFile";
import { getOrders } from "../../actions/ordersPage/ordersActions";
import {
  updateShowConfrimPaymentPopup,
  updateOrderSucceededPopup
} from "../../actions/checkout/confirmPayment";
import { getStringVal } from "../../scripts/multiLang";
import { deletePartnerDiscountLocalStorage } from "../../actions/myCart/getCode";


class OrderSucceededPopup extends Component {
  componentDidMount() {
    require("bootstrap/js/dist/modal");
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.showOrderSucceededPopup !==
        prevProps.showOrderSucceededPopup &&
      this.props.showOrderSucceededPopup == true
    ) {
      $("#orderSucceededModal").modal("show");
    } else if (
      this.props.showOrderSucceededPopup !== prevProps.showOrderSucceededPopup
    ) {
      $("#orderSucceededModal").modal("hide");
    }
  }
  closeModal = () => {
    this.props.updateOrderSucceededPopup(false);
    // this.props.deletePartnerDiscountLocalStorage();
  };

  render() {
    // console.log(this.props.checkoutState)
    // if(this.props.checkoutState.responseUrl){
    //   window.open(this.props.checkoutState.responseUrl, "_self");
    // }
    return (
      <div>
        {/* <h1>OrderSucceededPopup</h1> */}
        <div
          className="modal fade"
          tabIndex="-1"
          role="dialog"
          id="orderSucceededModal"
          data-backdrop="static"
          data-keyboard="false"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content boxShadow">
              <div className="modal-body">
                {this.props.confirmationStatus ? (
                  <div className="text-center">
                    <img src={require('../../images/tick.png')} alt="" className="mb-3 mx-auto" />
                    <p className="text-center">
                      {/* طلبك رقم */}
                      {getStringVal(this.props.language, "YOUR_ORDER_NUMBER")}
                      &nbsp;&nbsp;
                      <span>{this.props.orderNo}</span>
                      &nbsp;&nbsp;
                      {getStringVal(this.props.language, "DONE_SUCCESSFULLY")}
                      {/* تم بنجاح */}
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <img src={require('../../images/tick.png')} alt="" className="mb-3 mx-auto" />
                    <p className="text-center">
                      {/* سوف يتم إكمال تسجيل طلبك برسالة نصية بعد يومين */}

                      {getStringVal(
                        this.props.language,
                        "YOU_WILL_BE_COMPLETED_REGISTER_YOUR_TEXT_MESSAGE_AFTER_TWO_DAYS"
                      )}
                    </p>
                  </div>
                )}
              </div>
              <div className="modal-footer  mt-5  ">
                <Link href="/">
                  <a
                    className="btn button w-100 ml-3"
                    onClick={this.closeModal}
                  >
                    {/* أكمل التسوق */}
                    {getStringVal(this.props.language, "COMPLETE_SHOPPING")}
                  </a>
                </Link>
                <Link href="/orders">
                  <a className="btn button w-100" onClick={this.closeModal}>
                    {/* تابع طلبك */}
                    {getStringVal(this.props.language, "CONTINUED_REQUEST")}
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapOrderSucceededStateToProps = state => ({
  language: state.generalReducer.language,
  status: state.checkout.status,
  message: state.checkout.message,

  address: state.checkout.address,
  deliveryMethod: state.checkout.deliveryMethod,
  paymentMethod: state.checkout.paymentMethod,
  showConfrimPaymentPopup: state.checkout.showConfrimPaymentPopup,
  showOrderSucceededPopup: state.checkout.showOrderSucceededPopup,
  orderNo: state.checkout.orderNo,
  checkoutState: state.checkout,
  confirmationStatus: state.checkout.confirmationStatus,
  confirmationMessage: state.checkout.confirmationMessage,
  sizeManFlag: state.checkout.sizeManFlag
});
const mapOrderSucceededDispatchToProps = dispatch => ({
  updateShowConfrimPaymentPopup: payload => {
    dispatch(updateShowConfrimPaymentPopup(payload));
  },
  updateOrderSucceededPopup: payload => {
    dispatch(updateOrderSucceededPopup(payload));
  },
  getOrders: (language, auth) => {
    dispatch(getOrders(language, auth));
  },
  deletePartnerDiscountLocalStorage() {
    dispatch(deletePartnerDiscountLocalStorage());
  }
});

export default connect(
  mapOrderSucceededStateToProps,
  mapOrderSucceededDispatchToProps
)(OrderSucceededPopup);
