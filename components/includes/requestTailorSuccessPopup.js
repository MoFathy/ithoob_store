import React, { Component } from "react";
import { connect } from "react-redux";
import { updateTailorRequestedModalDisplay } from "../../actions/requestTailor/requestTailorActions";
import { getStringVal } from "../../scripts/multiLang";
import Link from "next/link";

class RequestTailorSuccessPopUp extends Component {
  componentDidMount() {
    require("bootstrap/js/dist/modal");
    //console.log("test from TailorRequestedPopup ");
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (
      this.props.requestTailorState.requestTailorSuccessPopUpStatus !== prevProps.requestTailorState.requestTailorSuccessPopUpStatus &&
      this.props.requestTailorState.requestTailorSuccessPopUpStatus
    ) {
      // this.fetchData(this.props.userID);
      $("#orderSucceededModal").modal("show");
      // setTimeout(() => {
      //   this.hideModal();
      // }, 1000);
    } else {
      $("#orderSucceededModal").modal("hide");
    }
  }

  closeModal = () => {
    this.props.updateTailorRequestedModalDisplay(false);
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
                  <div className="text-center">
                    <img src={require('../../images/tick.png')} alt="" className="mb-3 mx-auto" />
                    <p className="text-center">
                      {/* طلبك رقم */}
                      {getStringVal(this.props.language, "YOUR_ORDER_NUMBER")}
                      &nbsp;&nbsp;
                      <span>{this.props.requestTailorState.orderNo}</span>
                      &nbsp;&nbsp;
                      {getStringVal(this.props.language, "DONE_SUCCESSFULLY")}
                      {/* تم بنجاح */}
                    </p>
                    <p className="text-center">

                    {getStringVal(this.props.language, "WE_WILL_CONTACT_YOU_AS_SOON_AS_POSSIBLE")}
                    </p>
                  </div>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapTailorRequestedPopupStateToProps = state => ({
  language: state.generalReducer.language,
  ithoobCookie: state.loginReducer.ithoobCookie,
  deletedItemTitle: state.myCart.deletedItemTitle,
  deleteConfirmedStatus: state.myCart.deleteConfirmedStatus,
  requestTailorState: state.requestTailorReducer,
});

const mapTailorRequestedPopupDispatchToProps = dispatch => ({
  updateTailorRequestedModalDisplay: payload => {
    dispatch(updateTailorRequestedModalDisplay(payload));
  }
});

export default connect(
  mapTailorRequestedPopupStateToProps,
  mapTailorRequestedPopupDispatchToProps
)(RequestTailorSuccessPopUp);
