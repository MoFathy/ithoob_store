import React, { Component } from "react";
import { connect } from 'react-redux';
import { getStringVal } from "../../scripts/multiLang";


class CustomModify extends Component {

  componentDidMount(){
  }

  render() {
    const {customArray}=this.props;
    const {title}=this.props;
    const {cost}=this.props;
    return (
      <div className="orderModify__custom d-flex justify-content-between align-items-center mb-2">
        <div className="orderModify__custom__titleimages d-flex justify-content-around align-items-center">
          <h3>{this.props.title}</h3>
          <div className="d-flex justify-content-start imageRow">
          {
            this.props.customArray.map((custom,index) => {
              return(
              custom.image && custom.image !== null ? <img src={custom.image} className="ml-2" />
              :custom.quantity && custom.quantity === 1? <label className="d-flex align-items-center ml-2">{getStringVal(this.props.language, "ONE_PIECE")}</label>
              :custom.quantity && custom.quantity === 2? <label className="d-flex align-items-center ml-2"> {getStringVal(this.props.language, "TWO_PIECES")}</label>
              :custom.quantity && custom.quantity >2 ? <label className="d-flex align-items-center ml-2"> <span className={this.props.language ===true ?"arabicNumber":""}>{custom.quantity}</span>&nbsp;&nbsp;{getStringVal(this.props.language, "PIECES")} </label>
              :custom.size && custom.size === "s"? <label className="d-flex align-items-center ml-2"> {getStringVal(this.props.language, "SMALL")}</label>
              :custom.size && custom.size === "m"? <label className="d-flex align-items-center ml-2"> {getStringVal(this.props.language, "MEDUIM")}</label>
              :custom.size && custom.size === "l"? <label className="d-flex align-items-center ml-2"> {getStringVal(this.props.language, "LARGE")}</label>
              :custom.size && custom.size !== ""? <label className="d-flex align-items-center ml-2"> {custom.size}</label>
              :<label className="d-flex align-items-center ml-2">{custom.name}</label>
              )
            })
          }
          </div>
        </div>
        {parseInt(cost) > 0 ?<div className="orderModify__custom__price">
      <p>{cost}<span>{getStringVal(this.props.language, "SR")}</span></p>
        </div>:""}
      </div>
    );
  }
}
const StateToProps = state => ({
  language: state.generalReducer.language,

});
export default connect(
  StateToProps,
  null
)(CustomModify);
