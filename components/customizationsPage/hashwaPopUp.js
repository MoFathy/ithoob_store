import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleHashwaPopUp } from '../../actions/customizationsPage/othersActions';
import { getStringVal } from "../../scripts/multiLang";

export class HashwaPopup extends Component {
  constructor(props) {
   super(props);
   this.handleClick = this.handleClick.bind(this);
 }
  handleClick(e){
    this.props.toggleHashwaPopUp();
  }
  render() {
    const {hashwaObject}=this.props;
    const {hashwaTitle}=this.props;
    return(
      <div className="hashwapopUp" style={this.props.hashwaPopUpStatus === true ? {display:"flex"}: {display:"none"}}>
        <div className="hashwapopUp__content text-center">
          <p className="pb-3">{hashwaTitle}</p>
          <img src={hashwaObject.image} />
          <p className="pt-3">{hashwaObject.description}</p>
          <div className="hashwapopUp__content__okIcon" onClick={(e)=>this.handleClick(e)}><span>{getStringVal(this.props.language, "OK")}</span></div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    hashwaPopUpStatus:state.customsReducer.hashwaPopUpStatus
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleHashwaPopUp(){
      dispatch(toggleHashwaPopUp())
    }
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(HashwaPopup);
