import React, { Component } from "react";
import { connect } from "react-redux";
import Layout from "../components/layouts/mainLayout.js";
import { setActiveMenu } from "../actions/header/categories.js";
import { changeLangWithoutCookie } from "../actions/includes/general";
import { changeIthoobCookie } from "../actions/loginPopUp/loginActions";
import cookies from "next-cookies";
import Helmet from "react-helmet";
import OrderSucceeded from "../components/orderSucceededPage/orderSucceeded.js";
//layout of about page
class AboutPageLayout extends React.Component {
  static async getInitialProps({ reduxStore, query, pathname, req }) {
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
    }

    return {
      authToken: authToken,
      lang: lang,
      queryString: query.code ? query.code : null,
    };
  }

  render() {
    return (
      <Layout
        queryString={this.props.queryString}
        classNameData="withInnerHeader"
      >
        <Helmet
          title={this.props.categories.siteTitle + " | Order Succeeded"}
          meta={[
            {
              property: "description",
              content: this.props.categories.siteDescription,
            },
            {
              property: "og:locale",
              content: this.props.language === false ? "en_US" : "ar",
            },
            { property: "og:type", content: "website" },
            {
              property: "og:title",
              content: this.props.categories.siteTitle + " | About",
            },
            {
              property: "og:description",
              content: this.props.categories.siteDescription,
            },
            {
              property: "og:site_name",
              content: this.props.categories.siteTitle + " | About",
            },
            {
              property: "twitter:title",
              content: this.props.categories.siteTitle + " | About",
            },
            {
              property: "twitter:description",
              content: this.props.categories.siteDescription,
            },
          ]}
        />
        <div
          className="fb-login-button"
          data-size="large"
          data-button-type="login_with"
          data-auto-logout-link="false"
          data-use-continue-as="false"
        ></div>
        <OrderSucceeded />
      </Layout>
    );
  }
}
const mapGeneralStateToProps = (state) => ({
  language: state.generalReducer.language,
  categories: state.categories,
});
export default connect(mapGeneralStateToProps, null)(AboutPageLayout);
