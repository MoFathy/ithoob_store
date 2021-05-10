import React, { Component } from 'react';
import { connect } from 'react-redux';
import { togglePopUpStatus } from '../../actions/customizationsPage/othersActions';
import { getStringVal } from "../../scripts/multiLang";

export class ImagesPopup extends Component {
  constructor(props) {
   super(props);
   this.handleClick = this.handleClick.bind(this);
 }
  handleClick(e){
    this.props.togglePopUpStatus();
  }
  render() {
    return(
      <div className="imagespopUp" style={this.props.imagesPopUpStatus === true ? {display:"flex"}: {display:"none"}}>
        <div className="imagespopUp__imagesContent closeIcon pb-0" onClick={(e)=>this.handleClick(e)}> <span className="icon-close" /></div>
        <div className="imagespopUp__imagesContent row">
          <p className="imagespopUp__imagesContent__title col-3 col-md-2">{this.props.popUpTitle}</p>
          <div className="imagespopUp__imagesContent__images col-9 col-md-8 d-flex justify-content-between">
          {
              this.props.imagesPopUp.map((item,index) => {
                return(
                <img src={item.imgSrc} className={"image"+item.id}/>
                )
              })
          }
          </div>
          {this.props.popUpCost!==0 ?<p className="imagespopUp__imagesContent__cost col-2"><span className={this.props.language === true ? "arabicNumber" :""}>{this.props.popUpCost}</span>{getStringVal(this.props.language, "SR")}</p>:""}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    language: state.generalReducer.language,
    imagesPopUp:state.customsReducer.imagesPopUp,
    imagesPopUpStatus:state.customsReducer.imagesPopUpStatus,
    popUpTitle:state.customsReducer.popUpTitle,
    popUpCost:state.customsReducer.popUpCost
  };
}

function mapDispatchToProps(dispatch) {
  return {
    togglePopUpStatus(){
      dispatch(togglePopUpStatus())
    }
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(ImagesPopup);
