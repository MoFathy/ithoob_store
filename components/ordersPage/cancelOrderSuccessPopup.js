import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getStringVal } from "../../scripts/multiLang";
import { toggleCancelSuccessStatus} from '../../actions/ordersPage/ordersActions';
export class CancelOrderSuccessPopup extends Component {
  constructor(props) {
   super(props);
   this.handleClick = this.handleClick.bind(this);
 }
  handleClick(){
    if (this.props.cancelStatus == true) {
      var listItems = $(".ordersPage__filters ul li");
      listItems.each(function(idx, li) {
        var order = $(li);
        order.removeClass("active");
      });
    document.getElementById("cancelled").click();
    $(".ordersPage__filters ul li#cancelled").addClass("active");
    }
    this.props.toggleCancelSuccessStatus(false);
  }
  render() {
    return (
        <div className="messagePopup">
          <div className="messagePopup__content">
          <div className="messagePopup__content__header">
          <div className="messagePopup__content__closeIcon" onClick={this.handleClick}> <span className="icon-close" /></div>
          </div>
          <div className="messagePopup__content__body text-center">
            <img src={require('../../images/tick.png')} className="mx-auto d-block mb-3" />
            <p className="boldP text-center pb-4">{getStringVal(this.props.language, "THE_ORDER_NUMBER")}&nbsp;&nbsp;{this.props.popupOrderNum}&nbsp;&nbsp;{getStringVal(this.props.language, "SUCCESSFULLY_CANCELLED")} </p>
            {/**
             * TODO: Get "Mobile Number" dynamically, not statically
             * 
             * The paragraph below was built to get the number from the branch (Managed from Admin)
             * Not really sure about which branch it uses, but it uses the last branch (not displaying in "Contact")
             * Definitely this feature has a multiple-directions, and it should be treated carefully
             * [TEMP] For now, we will add the phone number "statically" as received from iThoob Team
             */}
            {/* <p className="text-center">{getStringVal(this.props.language,"YOUR_MONEY_WILL_BE_REFUNDED_WITHIN_DAYS_FROM_THE_DATE_OF_THE_DAY")}&nbsp;&nbsp;<a href={"tel:" + this.props.branchNumber}>{this.props.branchNumber}</a></p> */}
            <p className="text-center">
              <span className="m-1">{getStringVal(this.props.language,"YOUR_MONEY_WILL_BE_REFUNDED_WITHIN_DAYS_FROM_THE_DATE_OF_THE_DAY")}
              </span> <a href={`tel: ${process.env.whatsAppNumber}`}>{process.env.whatsAppNumber}</a>
            </p>
          </div>
          </div>
        </div>
    )
  }
}

function mapStateToProps(state){
  return{
    branchNumber: state.ordersReducer.branchNumber,
    cancelStatus: state.ordersReducer.cancelStatus,
    popupOrderNum: state.ordersReducer.popupOrderNum,
    language: state.generalReducer.language,

  }
}

function mapDispatchToProps(dispatch) {
  return {
    toggleCancelSuccessStatus(value){
        dispatch(toggleCancelSuccessStatus(value))
    }
  };
}



export default connect(mapStateToProps, mapDispatchToProps)(CancelOrderSuccessPopup);
