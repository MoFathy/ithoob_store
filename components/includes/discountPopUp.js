import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleDiscountPopUp } from "../../actions/signupPopUp/signupActions";
import { getStringVal } from "../../scripts/multiLang";
import Link from "next/link";
export class DicountPopup extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.toggleDiscountPopUp(false);
  }
  render() {
    return (
      <div className="messagePopup">
        <div className="messagePopup__content boxShadow">
          <div className="signupPopup__content__header">
            {/* <div className="d-flex justify-content-end w-100 messagePopup__content__closeIcon"> */}
            <p onClick={this.handleClick}>
              {" "}
              <span className="icon-close" />
            </p>
            {/* </div> */}
          </div>

          <div className="signupPopup__content__body">
            <img src={require('../../images/tick.png')} className="mx-auto d-block mb-3" />
            <h2>
              {/* تم إنشاء الحساب بنجاح */}
              {getStringVal(
                this.props.language,
                "ACCOUNT_SUCCESSFULLY_CREATED"
              )}
            </h2>
            {this.props.discount ? (
            <p className="mt-3">
              {/* أنت أحد شركاء أى ثوب المميزين و لذلك سوف تتمتع بخصم دائم على أى من منتجات أى ثوب بقيمه */}
              {getStringVal(
                this.props.language,
                "YOU_ARE_A_PARTNER_OF_ANY_DISCERNING_DRESS_AND_SO_YOU_WILL_ENJOY_A_PERMANENT_DISCOUNT_TO_ANY_OF_THE_PRODUCTS_OF_ANY_DRESS_VALUES"
              )} <strong>{this.props.discount}%</strong>
            </p>) : ("")}
            <div className="messagePopup__content__form w-100">
              <div className="btnStyle">
                {this.props.fromMycart}
                <p
                  className="text-center checkoutLink"
                  onClick={this.handleClick}
                >
                  {this.props.fromMycart === false ? (
                    <Link href="/">
                      <a>
                        {/* ابدأ التسوق الأن */}
                        {getStringVal(
                          this.props.language,
                          "START_SHOPPING_NOW"
                        )}
                      </a>
                    </Link>
                  ) : (
                    <Link href="/checkout">
                      <a>
                        {/*اكمل عملية الدفع */}
                        {getStringVal(
                          this.props.language,
                          "COMPLETE_THE_PAYMENT_PROCESS"
                        )}
                      </a>
                    </Link>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    discount: state.signupReducer.discount,
    language: state.generalReducer.language,
    fromMycart: state.signupReducer.fromMycart
  };
}
function mapDispatchToProps(dispatch) {
  return {
    toggleDiscountPopUp(value) {
      dispatch(toggleDiscountPopUp(value));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DicountPopup);
