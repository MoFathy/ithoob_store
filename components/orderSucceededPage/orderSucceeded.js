import React, { Component } from "react";
import { connect } from "react-redux";
import Link from "next/link";
import { getOrders } from "../../actions/ordersPage/ordersActions";
import { getStringVal } from "../../scripts/multiLang";
import { deletePartnerDiscountLocalStorage } from "../../actions/myCart/getCode";
import Router from "next/router";


class OrderSucceeded extends Component {
  componentDidMount() {
        if(!this.props.orderNo || this.props.orderNo == ""){Router.push("/");}
  }


  render() {
    return (
      <div>
        <div
          className="m-3 p-3"
        >
          <div className="" role="document">
            <div className="m-3 p-3 boxShadow">
              <div className="">
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
              <div className="mt-5  mb-5">
                <Link href="/">
                  <a
                    className="btn button mx-auto my-3 d-block w-50"
                  >
                    {/* أكمل التسوق */}
                    {getStringVal(this.props.language, "COMPLETE_SHOPPING")}
                  </a>
                </Link>
                <Link href="/orders">
                  <a className="btn button mx-auto my-3 d-block w-50">
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
  orderNo: state.checkout.orderNo,
  checkoutState: state.checkout,
  confirmationStatus: state.checkout.confirmationStatus,
  confirmationMessage: state.checkout.confirmationMessage,
  sizeManFlag: state.checkout.sizeManFlag
});
const mapOrderSucceededDispatchToProps = dispatch => ({
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
)(OrderSucceeded);
