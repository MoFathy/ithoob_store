import React, { Component } from "react";
import { connect } from "react-redux";
import Router from "next/router";
import cookies from "next-cookies";
import Helmet from "react-helmet";
//included components
import Layout from "../components/layouts/mainLayout.js";
import Breadcrumb from "../components/checkoutPage/breadcrumb";

import OrderSummary from "../components/checkoutPage/orderSummary";
import DeliveryCard from "../components/checkoutPage/deliveryCard";
import Receiving from "../components/checkoutPage/receiving";
// import Payment from "../components/checkoutPage/payment";
import ConfirmpPaymentPopup from "../components/checkoutPage/confirmpPaymentPopup";
import OrderSucceededPopup from "../components/checkoutPage/orderSucceededPopup";

//actions
import { setActiveMenu } from "../actions/header/categories.js";
import { changeLangWithoutCookie } from "../actions/includes/general";
import { changeIthoobCookie } from "../actions/loginPopUp/loginActions";
import { getCheckoutData } from "../actions/checkout/checkoutActions";
import { getStringVal } from "../scripts/multiLang";

class CheckoutPage extends Component {
  static async getInitialProps({ reduxStore, query, pathname, req, res }) {
    reduxStore.dispatch(setActiveMenu(pathname));

    const { lang } = cookies({ req: req });

    const { ithoobUser } = cookies({ req: req });

    const ithoobUserObj = ithoobUser ? JSON.parse(ithoobUser) : null;

    const authToken = ithoobUser ? ithoobUserObj.authenticationToken : null;

    reduxStore.dispatch(
      changeLangWithoutCookie(lang === "false" ? false : true)
    );


    if (ithoobUser) {
      reduxStore.dispatch(changeIthoobCookie(1));
      await reduxStore.dispatch(
        getCheckoutData(lang === "false" ? 1 : 2, authToken)
      );
    }else{
      if(res){
        res.writeHead(302, {Location: "/"})
        res.end()
      } else {
        Router.push('/')
      }
    }
    return {
      checkout: { ...reduxStore.getState().checkout },
      authToken: authToken,
      lang: lang,
      queryString: query.code ? query.code : null
    };
  }
  componentDidUpdate(prevProps) {
    if (this.props.language !== prevProps.language) {
      this.props.dispatch(
        getCheckoutData(
          this.props.language === false ? 1 : 2,
          this.props.authToken
        )
      );
    }

    if(this.props.ithoobCookie !== prevProps.ithoobCookie && this.props.ithoobCookie == -1){
      Router.push('/')
    }
  }


  render() {
    return (
      <Layout queryString={this.props.queryString} classNameData="checkoutPage withInnerHeader">
        <div className="content">
          <div className="container">
            <Breadcrumb />
            <h1 className="title">
            {getStringVal(this.props.language, "PAYMENT_AND_RECEIPT")}
              {/* الدفع و الأستلام */}
              </h1>

            <div className="row">
              <div className="col-12 col-lg-8">
                <Receiving />
                <DeliveryCard />
              </div>
              <div className="col-12 col-lg-4">
                <OrderSummary />
              </div>
            </div>
          </div>
        </div>
        <ConfirmpPaymentPopup />
        <OrderSucceededPopup />
      </Layout>
    );
  }
}
const mapCheckoutStateToProps = state => ({
  language: state.generalReducer.language,
  categories: state.categories,
  ithoobCookie: state.loginReducer.ithoobCookie
});


export default connect(
  mapCheckoutStateToProps,
null
)(CheckoutPage);
