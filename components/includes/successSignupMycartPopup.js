import React, { Component } from "react";
import { connect } from "react-redux";
import Link from "next/link";
import { signUpSuccessFromMyCartPopup } from "../../actions/signupPopUp/signupActions";
import { getStringVal } from "../../scripts/multiLang";
export class SuccessSignupMycartPopup extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e, value) {
    this.props.signUpSuccessFromMyCartPopup(value);
  }
  render() {
    return (
      <div className="messagePopup">
        <div className="messagePopup__content boxShadow">
          <div className="messagePopup__content__header">
            <div
              className="messagePopup__content__closeIcon"
              onClick={e => this.handleClick(e, false)}
            >
              {" "}
              <span className="icon-close" />
            </div>
          </div>
          <div className="messagePopup__content__body">
            <img src={require('../../images/tick.png')} className="mx-auto d-block mb-3" />
            <h2>
              {getStringVal(
                this.props.language,
                "ACCOUNT_SUCCESSFULLY_CREATED"
              )}
            </h2>
            {this.props.discount ? 
              (<p className="mt-3">
              {/* أنت أحد شركاء أى ثوب المميزين و لذلك سوف تتمتع بخصم دائم على أى من منتجات أى ثوب بقيمه */}
              {getStringVal(
                this.props.language,
                "YOU_ARE_A_PARTNER_OF_ANY_DISCERNING_DRESS_AND_SO_YOU_WILL_ENJOY_A_PERMANENT_DISCOUNT_TO_ANY_OF_THE_PRODUCTS_OF_ANY_DRESS_VALUES"
              )} <strong>{this.props.discount}%</strong>
            </p>) : ("")}
            <div className="messagePopup__content__form w-100">
              <div className="btnStyle">
                <p
                  className="text-center checkoutLink"
                  onClick={e => this.handleClick(e, false)}
                >
                  <Link href="/my-cart">
                    <a className="darkRedBtn">
                      {getStringVal(this.props.language, "BACK_TO_SHOPPING_CART")}
                    </a>
                  </Link>
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
    language: state.generalReducer.language
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signUpSuccessFromMyCartPopup(value) {
      dispatch(signUpSuccessFromMyCartPopup(value));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SuccessSignupMycartPopup);
