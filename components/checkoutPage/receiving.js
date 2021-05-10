import React, { Component } from "react";
import { connect } from "react-redux";
import { getStringVal } from "../../scripts/multiLang";
class Receiving extends Component {
  render() {
    return (
      <div className="receiving">
        <h4 className="">
          {/* الأستلام */}
          {getStringVal(this.props.language, "THE_RECEIPT")}
        </h4>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">
              {/* موعد الأستلام */}
              {getStringVal(this.props.language, "RECEIVING_DATE")}
            </h5>
            <p className="card-text">
              {this.props.delivery}
              <span>
                {/* سيكون طلبك جاهز للأستلام */}

                {getStringVal(
                  this.props.language,
                  "YOUR_REQUEST_WILL_BE_READY_FOR_PICK_UP"
                )}
              </span>
            </p>
            {this.props.sizeManFlag ? (
              <h5 className="card-title">
                {/* الترزى */}
                {getStringVal(this.props.language, "TAILOR")}
              </h5>
            ) : (
              ""
            )}
            {this.props.sizeManFlag ? (
              <p className="card-text">
                <span>
                  {/* سيتصل بك أحد مندوبينا لتحديد موعد لأخذ مقاساتك بالمنزل */}
                  {getStringVal(
                    this.props.language,
                    "WILL_CALL_YOU_ONE_OF_OUR_REPRESENTATIVES_TO_SET_A_DATE_FOR_TAKING_MQASATK_HOME"
                  )}
                </span>
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}
const mapDeliveryStateToProps = state => ({
  language: state.generalReducer.language,
  delivery: state.checkout.delivery,
  sizeManFlag: state.checkout.sizeManFlag
});
export default connect(
  mapDeliveryStateToProps,
  null
)(Receiving);
