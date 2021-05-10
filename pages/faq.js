import React, { Component } from "react";
import { connect } from "react-redux";
import Layout from "../components/layouts/mainLayout.js";
import Faq from "../components/faqPage/faq";
import { updateBreadcrumb } from "../actions/includes/breadcrumb";
import { getFaq } from "../actions/faqPage/faqGetDataActions";
// import "../style.scss";
import Breadcrumb from "../components/faqPage/breadcrumb";
import { setActiveMenu } from "../actions/header/categories.js";
import { getStringVal } from "../scripts/multiLang";

import { changeLangWithoutCookie } from "../actions/includes/general";
import { changeIthoobCookie } from "../actions/loginPopUp/loginActions";
import cookies from "next-cookies";
import Helmet from "react-helmet";
//layout of about page
class FaqLayout extends React.Component {
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

    await reduxStore.dispatch(getFaq(lang === "false" ? 1 : 2));
    reduxStore.dispatch(
      updateBreadcrumb([
        { title: lang === "false" ? "faq" : "أكثر الأسئلة شيوعا", slug: "/faq" }
      ])
    );
    return {
			dataCategorySlug: query,
			authToken: authToken,
      lang: lang,
      queryString: query.code ? query.code : null
    };
  }
  componentDidUpdate(prevProps) {
    if (this.props.language !== prevProps.language) {
      this.props.dispatch(
        getFaq(this.props.language === false ? 1 : 2),

      );

      this.props.dispatch(
        updateBreadcrumb([
          {
            title: getStringVal(this.props.language, "FAQ"),
            slug: "/faq"
          }
        ])
      );
    }
  }

  render() {
    return (
      <Layout queryString={this.props.queryString} classNameData="withInnerHeader">
        <Helmet
          title={this.props.categories.siteTitle + " | FAQ"}
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
              content: this.props.categories.siteTitle + " | FAQ"
            },
            {
              property: "og:description",
              content: this.props.categories.siteDescription
            },
            {
              property: "og:site_name",
              content: this.props.categories.siteTitle + " | FAQ"
            },
            {
              property: "twitter:title",
              content: this.props.categories.siteTitle + " | FAQ"
            },
            {
              property: "twitter:description",
              content: this.props.categories.siteDescription
            }
          ]}
        />
        <div className="content">
        <div className="container">
          <Breadcrumb dataCategorySlug={this.props.dataCategorySlug} />
          <Faq />
        </div>
        </div>
      </Layout>
    );
  }
}
const mapGeneralStateToProps = state => ({
  language: state.generalReducer.language,
  categories: state.categories
});
export default connect(
  mapGeneralStateToProps,
  null
)(FaqLayout);
