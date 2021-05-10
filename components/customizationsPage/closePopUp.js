import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleClosePopup } from '../../actions/loginPopUp/loginActions';
import { resetPresentData  } from '../../actions/includes/carouselActions';
import { getStringVal } from "../../scripts/multiLang";
import {fromCartToEditcustomsState} from "../../actions/myCart/myCartActions";
import { ActionCreators } from 'redux-undo';
import Link from "next/link";
export class ClosePopup extends Component {
  constructor(props) {
   super(props);
   this.handleGoingOut = this.handleGoingOut.bind(this);
  }
handleGoingOut(){
   this.props.toggleClosePopup(false);
   this.props.clearPastFutureHistory();
   if(this.props.fromCartStatus ===true){
     this.props.fromCartToEditcustomsState();
   }
}
  render() {
    return (
        <div className="messagePopup closePopup">
          <div className="messagePopup__content subMsg">
            <div className="messagePopup__content__closeIcon text-center" onClick={() => this.props.toggleClosePopup(false)}> <span className="icon-close" /></div>
            <h2 className="pr-4 pl-4 pt-3">{getStringVal(this.props.language, "OUT_OF_THE_EDIT_MODE")}</h2>
            <p className="pr-4 pl-4 pb-3 pt-3">{getStringVal(this.props.language, "DO_YOU_WANT_TO_GET_OUT_OF_THE_EDIT_MODE_YOU_WILL_HARNESS_ALL_THE_CHANGES_YOU_HAVE_MADE_AND_WILL_NOT_BE_ABLE_TO_RETRIEVE_IT_AGAIN")}</p>
            <div className="messagePopup__content__btns d-flex justify-content-center align-items-center">
              <div className="btnStyle Btn" onClick={() => this.props.toggleClosePopup(false)}><button>{getStringVal(this.props.language, "I_WANT_TO_STAY")}</button></div>
              <div  className="btnStyle goOut"  onClick={() =>this.handleGoingOut()}><Link href={this.props.fromCartStatus ===true ?"/my-cart":"/"}><a>{getStringVal(this.props.language, "I_WANT_TO_GO_OUT")}</a></Link></div>
            </div>
          </div>
        </div>
    )
  }
}

function mapStateToProps(state){
  return{
    language: state.generalReducer.language,
    fromCartStatus:state.myCart.fromCartToEditCustomsStatus
  }
}
function mapDispatchToProps(dispatch) {
  return {
    toggleClosePopup(value){
      dispatch(toggleClosePopup(value))
    },
    clearPastFutureHistory(){
        dispatch(ActionCreators.clearHistory());
        dispatch(resetPresentData())
    },
    fromCartToEditcustomsState(){
      dispatch(fromCartToEditcustomsState())
    }
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(ClosePopup);
