import React, { Component } from "react";
import { connect } from "react-redux";

import { getStringVal } from "../../scripts/multiLang";

class Receiving extends Component {
  render() {
    return (
      <div className="payment">
        <h4 className="">
          {/* الدفع */}
          {getStringVal(this.props.language, "PAYMENT")} ({/* التحويل البنكى */}
          {getStringVal(this.props.language, "BANK_TRANSFER")})
        </h4>
        <div className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">
              {/* سوف يتم تأكيد الطلب بعد يومين من وصول الحواله البنكيه إلينا */}
              {getStringVal(
                this.props.language,
                "THE_ORDER_WILL_BE_CONFIRMED_TWO_DAYS_AFTER_THE_ARRIVAL_OF_THE_HAWALA_BANKING_US"
              )}
            </h5>
            <div className="banksInfo">
              {this.props.bankTransfer.map((bank, index) => (
                <div key={index} className="bankBranch">
                  <p className="bankName">
                    {bank.bankName}
                  </p>
                  <span className="accountNo">
                      
                      <span>{getStringVal(this.props.language, "ACCOUNT_NUMBER")}</span>
                      
                      {bank.bankNo}
                    </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapbankTransferStateToProps = state => ({
  bankTransfer: state.checkout.bankTransfer,
  language: state.generalReducer.language
});
export default connect(
  mapbankTransferStateToProps,
  null
)(Receiving);
