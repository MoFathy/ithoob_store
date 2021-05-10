import React, { Component } from "react";
import Link from "next/link";

import { connect } from "react-redux";

import { cartInit } from "../../actions/header/cartHeader";
import { getStringVal } from "../../scripts/multiLang";

import { loginPopUpStatusToggle } from "../../actions/loginPopUp/loginActions";
import { totalmem } from "os";
class CartHeader extends Component {
 //  constructor(){
 //   super();
 //   this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
 // };
  componentDidMount() {
    this.props.cartInit();

    $(".nav-item.dropdown").on("show.bs.dropdown", function() {
      $(".navbar-collapse").collapse("hide");
    });
  }

  // forceUpdateHandler(){
  //   this.forceUpdate();
  // };

  componentDidUpdate(prevProps) {
    if (
      this.props.cartItems.length != prevProps.cartItems.length &&
      this.props.cartItems.length > 0
    ) {
      const PerfectScrollbar = require("perfect-scrollbar/dist/perfect-scrollbar.min.js");
      $(".cartHeader__items")
        .find(".ps__rail-x")
        .remove();
      $(".cartHeader__items")
        .find(".ps__rail-y")
        .remove();
      new PerfectScrollbar(".cartHeader__items", {
        wheelSpeed: 0.1,
        suppressScrollX: true
      });
    }
    if (
      prevProps.ithoobCookie != this.props.ithoobCookie ||
      prevProps.language != this.props.language
    ) {
      // user did login so get cart from api
      this.props.cartInit();
    }
//     console.log("here hrer");
//     console.log(prevProps.outOfCoverage);
//     console.log(this.props.outOfCoverage);
// if(this.props.outOfCoverage !== prevProps.outOfCoverage){
//   this.forceUpdateHandler();
// }
  }
  loginClick(e) {
    e.preventDefault();
    this.props.loginPopUpStatusToggle(true);
  }
  render() {
    let cartTotal = 0;
    // let totalQuantity = 0;
    if (this.props.cartItems.length > 0) {
      this.props.cartItems.map(product =>
        product.price_discount
          ? (cartTotal +=
              parseFloat(product.price_discount) * parseInt(product.quantity))
          : product.price
          ? (cartTotal +=
              parseFloat(product.price) * parseInt(product.quantity))
          : (cartTotal +=
              parseFloat(product.itemPrice) * parseInt(product.quantity))
      );
    }

    let totalQuantity = 0;
    if (this.props.cartItems.length > 0) {
      this.props.cartItems.map(product =>
        product.quantity ? (totalQuantity += parseInt(product.quantity)) : ""
      );
    }

    console.warn(this.props.cartItems);

    return (
      <div>
        <div
          className="dropdown-menu cartHeader"
          aria-labelledby="profileDropdown"
        >
          <div className="dropdown-item">
            {getStringVal(this.props.language, "SHOPPING_CART")} (
            {/* {this.props.cartCount} */}
            {/* {cartTotal} */}
            <span
              className={this.props.language === true ? "arabicNumber" : ""}
            >
              {/* {this.props.cartCount} */}
              {totalQuantity}
              {/* {cartTotal} */}
            </span>
            )
          </div>
          <div className="dropdown-divider" />
          {this.props.cartItems.length > 0 ? (
            <div className="cartHeader__items">
              {this.props.cartItems.map((item, index) => {
                return (
                  <div className="dropdown-item" key={index}>
                    <div className="d-flex align-items-center cartHeader__item">
                      <div className="flex-shrink-0">
                        <img
                          src={
                            // ""
                            item.img && item.img.length > 0
                              ? item.img
                              : item.img.img
                          }
                          // {this.props.ithoobCookie !== -1 && item.img ? item.img : ""}
                          // {item.img ? item.img.thumbImg : item.itemImg}
                          // {item.img ? item.img : " "}
                          // {this.props.ithoobCookie !== -1 ? item.img : item.img.img || item.img}
                          alt=""
                        />
                      </div>
                      <h6 className="cartHeader__item__title">
                        {
                          this.props.ithoobCookie == -1 
                          // Logged out user
                          ? this.props.language == false
                            ? item.title_en
                            : item.title_ar
                          // Logged in user
                          : item.itemTitle ? item.itemTitle : item.title 
                          /**
                           * The condition above is a workaround, as 2 API Endpoints update this value, with 2 different keys (itemTitle, by default) and (title, when editing cart - quantity)
                           * Before editing the API, make sure that it won't affect any other places
                           */
                        }
                      </h6>
                      <div className="cartHeader__item__price">
                        <span className="DirLTR DirLTR__IB">
                          {item.quantity}
                        </span>{" "}
                        X{" "}
                        {this.props.ithoobCookie == -1 ? (
                          item.price_discount ? (
                            <span className="DirLTR DirLTR__IB">
                              {item.price_discount}
                            </span>
                          ) : (
                            <span className="DirLTR DirLTR__IB">
                              {item.price ? item.price : item.itemPrice}
                            </span>
                          )
                        ) : item.price_discount ? (
                          <span className="DirLTR DirLTR__IB">
                            {item.price_discount}
                          </span>
                        ):(
                          <span className="DirLTR DirLTR__IB">
                            {item.price ? item.price : item.itemPrice}
                          </span>
                        )}{" "}
                        {getStringVal(this.props.language, "SR")}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="dropdown-item">
              {getStringVal(
                this.props.language,
                "THERE_ARE_NO_PRODUCTS_IN_THE_SHOPPING_CART"
              )}
            </div>
          )}
          {this.props.cartItems.length > 0 ? (
            <div>
              <div className="dropdown-divider" />
              <div className="dropdown-item d-flex justify-content-between">
                <div>{getStringVal(this.props.language, "TOTAL_PRODUCTS")}</div>
                <div>
                  {cartTotal} {getStringVal(this.props.language, "SR")}
                </div>
              </div>
              <div className="dropdown-item">
                {this.props.ithoobCookie === -1 ? (
                  <div>
                    <a
                      href="#"
                      className="button button__block"
                      onClick={e => this.loginClick(e)}
                    >
                      {getStringVal(this.props.language, "GO_TO_PAY")}
                    </a>
                    <Link href="/my-cart" as="/my-cart">
                      <a
                        // href="#"
                        className="button button__block button__secondary"
                        // onClick={e => this.loginClick(e)}
                      >
                        {getStringVal(
                          this.props.language,
                          "TO_THE_SHOPPING_CART"
                        )}
                      </a>
                    </Link>
                  </div>
                ) : (
                  <div>
                    {this.props.allSizesComplete && !this.props.outOfCoverage && !this.props.hasUnavailableItem ? (
                      <Link href="/checkout">
                        <a className="button button__block">
                          {getStringVal(this.props.language, "GO_TO_PAY")}
                        </a>
                      </Link>
                    ) : (
                      <a className="button button__block btn disabled" disabled>
                        {getStringVal(this.props.language, "GO_TO_PAY")}
                      </a>
                    )}

                    <Link href="/my-cart" as="/my-cart">
                      <a className="button button__block button__secondary">
                        {getStringVal(
                          this.props.language,
                          "TO_THE_SHOPPING_CART"
                        )}
                      </a>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

const mapCartHeaderStateToProps = state => ({
  language: state.generalReducer.language,
  ithoobCookie: state.loginReducer.ithoobCookie,
  cartCount: state.cartHeader.cartCount,
  cartItems: state.cartHeader.cartItems,
  allSizesComplete: state.cartHeader.allSizesComplete,
  outOfCoverage: state.cartHeader.outOfCoverage,
  hasUnavailableItem: state.cartHeader.hasUnavailableItem
});

const mapCartHeaderDispatchToProps = dispatch => ({
  cartInit: () => {
    dispatch(cartInit());
  },
  loginPopUpStatusToggle(value) {
    dispatch(loginPopUpStatusToggle(value));
  }
});

export default connect(
  mapCartHeaderStateToProps,
  mapCartHeaderDispatchToProps
)(CartHeader);
