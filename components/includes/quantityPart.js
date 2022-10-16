import React, { Component } from "react";
import { connect } from 'react-redux';
import { updateQuantityFail } from "../../actions/myCart/updateQuantity";
import { getStringVal } from "../../scripts/multiLang";

 class QuantitySection extends Component {
  addQuantity = () => {
    if(this.props.stock - this.props.quantity - 1 < 0){
      document.getElementById(`stock-alert${this.props.productId}`).style.display = "block";
      setTimeout(() => {
        document.getElementById(`stock-alert${this.props.productId}`).style.display = "none";
      }, 2000);
    }else{
      this.props.handlePlusClick()
    }
   }
  render() {
    const {quantity}=this.props;
    if(this.props.notEnoughMsg){
      document.getElementById(`stock-alert`).style.display = "block";
      setTimeout(() => {
        this.props.updateQuantityFail();
        document.getElementById(`stock-alert`).style.display = "none";
      }, 2000);
    }
    return (
      <div className="measurementsCustom">
        <p className="title">{getStringVal(this.props.language, "QUANTITY")}

        {/* <span className="spanText">(عدد الأثواب التى تريد).</span> */}

        </p>
          <div className="contentItem  d-inline-flex align-items-center justify-content-start">
            <p onClick={this.props.handleMinusClick}  className={quantity === 1? "quantityDisabled inc":"inc"} >-</p>
            <label className={this.props.language === true ? "arabicNumber quantityValue": "quantityValue"}>{quantity}</label>
            <p onClick={() => this.addQuantity()} className="inc">+</p>
         </div>
         <div className="alert alert-danger stock-alert" id={`stock-alert${this.props.productId}`} >المخزون غير كافى</div>
      </div>
    );
  }
}

const mapCartHeaderStateToProps = state => ({
  language: state.generalReducer.language,
  ithoobCookie: state.loginReducer.ithoobCookie,
  cartCount: state.cartHeader.cartCount,
  cartItems: state.cartHeader.cartItems,
  notEnoughMsg: state.myCart.notEnough
});
const mapChangeQuantitiyDispatchToProps = (dispatch) => ({
  updateQuantityFail: () => {
    dispatch(
      updateQuantityFail({
        status: false,
        message: "Error in update item quantity from catch",
        notEnough: false
      })
    );
  },
});
export default connect(
  mapCartHeaderStateToProps,
  mapChangeQuantitiyDispatchToProps
)(QuantitySection);
