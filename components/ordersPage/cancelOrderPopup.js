import React, { Component } from "react";
import { connect } from "react-redux";
import { getCookie } from "../../scripts/getCookieFile";
import {
  cancelOrder,
  cancelOrderPopUp
} from "../../actions/ordersPage/ordersActions";
import { getStringVal } from "../../scripts/multiLang";

export class CancelOrderPopup extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleCancelation = this.handleCancelation.bind(this);
  }

  handleClick() {
    this.props.cancelOrderPopUp(false);

  }

  handleCancelation(orderNo, auth, lang) {
    this.props.cancelOrder(orderNo, auth, lang);
  }

  // componentDidUpdate(prevProps) {
  //   if (this.props.cancelStatus !== prevProps.cancelStatus) {
  //     console.log("cancel status changed");
  //     if (this.props.cancelStatus === true) {
  //       console.log("enter condition");
  //       var listItems = $(".ordersPage__filters ul li");
  //       listItems.each(function(idx, li) {
  //         var order = $(li);
  //         console.log(order);
  //         order.removeClass("active");
  //       });
  //     document.getElementById("cancelled").click();
  //     }
  //   }
  // }

  render() {
    // status
    return (
      <div className="messagePopup">
        <div className="messagePopup__content cancelOrder">
          <div className="messagePopup__content__header">
            {this.props.orderStatus === "new" ||
            this.props.orderStatus === "pending_payment" ? (
              <p>{getStringVal(this.props.language, "CANCELLING_ORDER")}</p>
            ) : (
              <p>
                {getStringVal(
                  this.props.language,
                  "CAN_NOT_CANCEL_THE_REQUEST"
                )}
              </p>
            )}

            {/* <div className="d-flex justify-content-end w-100 messagePopup__content__closeIcon"> */}
            <p onClick={this.handleClick}>
              <span className="icon-close" />
            </p>
            {/* </div> */}
          </div>

          <div className="messagePopup__content__body">
            {this.props.orderStatus === "new" ||
            this.props.orderStatus === "pending_payment" ? (
              <p className="text-center font-weight-bold">
                <span className="m-1">
                  {getStringVal(
                    this.props.language,
                    "YOU_SURE_YOU_WANT_TO_CANCEL_THE_ORDER_NUMBER"
                  )}
                </span>
                {this.props.popupOrderNum}
              </p>
            ) : (
              <p>
                {getStringVal(this.props.language, "APPLICATION_NO_ENTERED")}
                <span className="m-1 font-weight-bold">{this.props.popupOrderNum}</span>
                {getStringVal(
                  this.props.language,
                  "IN_PRODUCTION_AND_YOU_CAN_NOT_CANCEL_NOW_STAGE_IF_YOU_ARE_EXPERIENCING_ANY_PROBLEM_PLEASE_CONTACT_61648111100"
                )} <a href={`tel: ${process.env.whatsAppNumber}`}>{process.env.whatsAppNumber}</a>
              </p>
            )}
            {this.props.orderStatus === "new" ||
            this.props.orderStatus === "pending_payment" ? (
              <div className="cancelOrder__cancelTips">
              <br/>
                <p>
                  {getStringVal(
                    this.props.language,
                    "CANCELLATION_POLICY_APPLICATIONS"
                  )}
                </p>
                <p>{getStringVal(this.props.language, "CANCEL_ORDER_POLICY_1_TITLE")}</p>
                <p>{getStringVal(this.props.language, "CANCEL_ORDER_POLICY_2_TITLE")}</p>
                <p>{getStringVal(this.props.language, "CANCEL_ORDER_POLICY_3_TITLE")}</p>
                <p>{getStringVal(this.props.language, "CANCEL_ORDER_POLICY_4_TITLE")}</p>
                <p>{getStringVal(this.props.language, "CANCEL_ORDER_POLICY_5_TITLE")}</p>
                <p>
                  {getStringVal(
                    this.props.language,
                    "THE_FACT_WILL_NOT_BE_DEDUCTED_INSTALLED_LONG_TIME_AGO_IS_THAT_READABLE_CONTENT_OF_A_PAGE_SILAA_READER_FOCUS_ON_THE_EXTERNAL_FORM_OF_THE_TEXT_OR_FORM_PLACED"
                  )}
                </p>
                <p>
                  {getStringVal(
                    this.props.language,
                    "YOUR_MONEY_WILL_REGAIN_A_PROVEN_FACT_LONG_TIME_AGO_IS_THAT_READABLE_CONTENT_OF_A_PAGE_SILAA_READER_FOCUS_ON_THE_EXTERNAL_FORM_OF_THE_TEXT_OR_FORM_PLACED"
                  )}
                </p>
              </div>
            ) : (
              ""
            )}
          </div>

          {this.props.orderStatus === "new" ||
          this.props.orderStatus === "pending_payment" ? (
            <div className="messagePopup__content__footer">
              {/* <div className="btnStyle ml-5"> */}
              <button
                className="btn button w-100"
                onClick={this.handleClick}
              >
                {getStringVal(this.props.language, "NO")}
              </button>
              {/* </div> */}
              {/* <div className="btnStyle"> */}
              <button
                className=" btn button w-100 whiteBg"
                onClick={() =>
                  this.handleCancelation(
                    this.props.popupOrderNum,
                    getCookie("ithoobUser", "authenticationToken"),
                    this.props.language === false ? 1 : 2
                  )
                }
              >
                {getStringVal(this.props.language, "CANCELLING_ORDER")}
              </button>
              {/* </div> */}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    orderStatus: state.ordersReducer.orderPopupstatus,
    popupOrderNum: state.ordersReducer.popupOrderNum,
    language: state.generalReducer.language,
    cancelStatus: state.ordersReducer.cancelStatus
  };
}
function mapDispatchToProps(dispatch) {
  return {
    cancelOrder(orderNo, auth, lang) {
      dispatch(cancelOrder(orderNo, auth, lang));
    },
    cancelOrderPopUp(value) {
      dispatch(cancelOrderPopUp(value));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CancelOrderPopup);
