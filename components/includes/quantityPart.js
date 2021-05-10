import React, { Component } from "react";
import { connect } from 'react-redux';
import { getStringVal } from "../../scripts/multiLang";

 class QuantitySection extends Component {
  render() {
    const {quantity}=this.props;
    return (
      <div className="measurementsCustom">
        <p className="title">{getStringVal(this.props.language, "QUANTITY")}

        {/* <span className="spanText">(عدد الأثواب التى تريد).</span> */}

        </p>
          <div className="contentItem  d-inline-flex align-items-center justify-content-start">
          <p onClick={this.props.handleMinusClick}  className={quantity === 1? "quantityDisabled inc":"inc"} >-</p>
          <label className={this.props.language === true ? "arabicNumber quantityValue": "quantityValue"}>{quantity}</label>
          <p onClick={this.props.handlePlusClick} className="inc">+</p>
         </div>
      </div>
    );
  }
}

const mapCartHeaderStateToProps = state => ({
  language: state.generalReducer.language,
  ithoobCookie: state.loginReducer.ithoobCookie,
  cartCount: state.cartHeader.cartCount,
  cartItems: state.cartHeader.cartItems
});
export default connect(
  mapCartHeaderStateToProps,
  null
)(QuantitySection);
