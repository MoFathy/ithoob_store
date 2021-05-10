import React, { Component } from "react";
import { connect } from "react-redux";
import Router from "next/router";
//included components
import Layout from "../components/layouts/mainLayout.js";
import Breadcrumb from "../components/myCart/breadcrumb";
import CartCard from "../components/myCart/cartCard";
import OrderSummary from "../components/myCart/orderSummary";
import IthoobPartners from "../components/myCart/ithoobPartners";
import PartnerTablePopup from "../components/myCart/partnerTablePopup";
import DeleteItemPopup from "../components/myCart/deleteItemPopup";
import DeleteConfirmedPopup from "../components/myCart/deleteConfirmedPopup";
//actions
import { setActiveMenu } from "../actions/header/categories.js";
import { getStringVal } from "../scripts/multiLang";

import { changeLangWithoutCookie } from "../actions/includes/general";
import { changeIthoobCookie } from "../actions/loginPopUp/loginActions";
import {
  getCartItems,
  updateIsLoadingStatus
  // getCartItemsFromLocalStorage
} from "../actions/myCart/myCartActions";
import cookies from "next-cookies";
import Helmet from "react-helmet";

class MyCart extends Component {
  static async getInitialProps({ reduxStore, query, pathname, req }) {
    reduxStore.dispatch(setActiveMenu(pathname));
    const { lang } = cookies({ req: req });
    const { ithoobUser } = cookies({ req: req });
    const ithoobUserObj = ithoobUser ? JSON.parse(ithoobUser) : null;
    const authToken = ithoobUser ? ithoobUserObj.authenticationToken : null;
    reduxStore.dispatch(
      changeLangWithoutCookie(lang === "false" ? false : true)
    );
    reduxStore.dispatch(updateIsLoadingStatus(true));

    if (ithoobUser) {
      reduxStore.dispatch(changeIthoobCookie(1));
      await reduxStore.dispatch(
        getCartItems(lang === "false" ? 1 : 2, authToken)
      );
    }
    return {
      myCart: { ...reduxStore.getState().myCart },
      authToken: authToken,
      lang: lang,
      pathname: pathname,
      dataCategorySlug: query,
      queryString: query.code ? query.code : null
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.language !== prevProps.language) {
      this.props.dispatch(
        getCartItems(
          this.props.language === false ? 1 : 2,
          this.props.authToken
        )
      );
    }

    if (
      this.props.ithoobCookie !== prevProps.ithoobCookie &&
      this.props.ithoobCookie == -1
    ) {
      // user has logged out
      Router.push("/");
    }

    if (
      this.props.partnerDiscount !== prevProps.partnerDiscount &&
      this.props.ithoobCookie !== -1
    ) {
      this.props.dispatch(
        getCartItems(
          this.props.language === false ? 1 : 2,
          this.props.authToken
        )
      );
    }
  }

  render() {
    return (
      <Layout
        pathname={this.props.pathname}
        queryString={this.props.queryString}
        classNameData="mycartPage withInnerHeader"
      >
        <Helmet
          title={this.props.categories.siteTitle + " | Cart"}
          meta={[
            {
              property: "description",
              content: this.props.categories.siteDescription
            },
            {
              property: "og:locale",
              content: this.props.language === false ? "en_US" : "ar"
            },
            { property: "og:type", content: "website" },
            {
              property: "og:title",
              content: this.props.categories.siteTitle + " | Cart"
            },
            {
              property: "og:description",
              content: this.props.categories.siteDescription
            },
            {
              property: "og:site_name",
              content: this.props.categories.siteTitle + " | Cart"
            },
            {
              property: "twitter:title",
              content: this.props.categories.siteTitle + " | Cart"
            },
            {
              property: "twitter:description",
              content: this.props.categories.siteDescription
            }
          ]}
        />
        <div className="content">
          <div className="container">
            <Breadcrumb />
            <h1 className="title">
              {" "}
              {getStringVal(this.props.language, "SHOPPING_CART")}
            </h1>

            <div className="row">
              <div className="col-12 col-lg-8 itemsPart">
                {this.props.errMsgStatus ? (
                  <div class="alert alert-danger" role="alert">
                    {getStringVal(
                      this.props.language,
                      "YOU_MUST_COMPLETE_SELECTION_OF_SIZES"
                    )}
                  </div>
                ) : (
                  ""
                )}
                <CartCard
                  pathname={this.props.pathname}
                  dataCategorySlug={this.props.dataCategorySlug}
                />
              </div>
              <div className="col-12 col-lg-4 sideBarPart">
                <div className="orderSummaryContainer">
                  <OrderSummary />
                </div>
              </div>
            </div>
            <DeleteItemPopup />
            <DeleteConfirmedPopup />
          </div>
        </div>
      </Layout>
    );
  }
}
const mapMyCartStateToProps = state => ({
  language: state.generalReducer.language,
  categories: state.categories,
  errMsgStatus: state.myCart.errMsgStatus,
  ithoobCookie: state.loginReducer.ithoobCookie,
  partnerDiscount: state.myCart.partnerDiscount,
  successSignupFromMycart: state.signupReducer.successSignupFromMycart,
  signPaymentBtn: state.signupReducer.signPaymentBtn,
  redirectToChechout: state.myCart.redirectToChechout,
  confirmUserState: state.signupReducer.confirmUserState
});
export default connect(mapMyCartStateToProps, null)(MyCart);
