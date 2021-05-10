import React, { Component } from "react";
import { connect } from "react-redux";
import Layout from "../components/layouts/mainLayout.js";
import BranchInfoPart from "../components/contactPage/branchInfoComponent";
import ContactUsPart from "../components/contactPage/contactUsComponent";
import { getIthoobInfo } from "../actions/contactPage/contactUsActions";
// import "../style.scss";
import Breadcrumb from "../components/contactPage/breadcrumb";
import { updateBreadcrumb } from "../actions/includes/breadcrumb";
import { setActiveMenu } from "../actions/header/categories.js";

import { changeLangWithoutCookie } from "../actions/includes/general";
import { changeIthoobCookie } from "../actions/loginPopUp/loginActions";
import cookies from "next-cookies";
import Helmet from "react-helmet";

import { getStringVal } from "../scripts/multiLang";

//layout of about page
class ContactPageLayout extends React.Component {
  static async getInitialProps({ reduxStore, query, pathname, req }) {
    reduxStore.dispatch(setActiveMenu(pathname));

    const { lang } = cookies({ req: req });
    const { ithoobUser } = cookies({ req: req });
    reduxStore.dispatch(
      changeLangWithoutCookie(lang === "false" ? false : true)
    );
    if (ithoobUser) {
      reduxStore.dispatch(changeIthoobCookie(1));
    }

    await reduxStore.dispatch(getIthoobInfo(lang === "false" ? 1 : 2));
    reduxStore.dispatch(
      updateBreadcrumb([
        {
          title: lang === "false" ? "Connect with us" : "تواصل معنا",
          slug: "/contact"
        }
      ])
    );
    return {
      dataCategorySlug: query,
      queryString: query.code ? query.code : null
    };
  }
  componentDidUpdate(prevProps) {
    if (this.props.language !== prevProps.language) {
      this.props.getIthoobInfo(this.props.language === false ? 1 : 2);
      this.props.updateBreadcrumb([
        {
          title: getStringVal(this.props.language, "CONNECT_WITH_US"),
          slug: "/contact"
        }
      ]);
    }
  }


  render() {
    return (
      <Layout queryString={this.props.queryString} classNameData="withInnerHeader">
        <Helmet
          title={this.props.categories.siteTitle + " | Contact"}
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
              content: this.props.categories.siteTitle + " | Contact"
            },
            {
              property: "og:description",
              content: this.props.categories.siteDescription
            },
            {
              property: "og:site_name",
              content: this.props.categories.siteTitle + " | Contact"
            },
            {
              property: "twitter:title",
              content: this.props.categories.siteTitle + " | Contact"
            },
            {
              property: "twitter:description",
              content: this.props.categories.siteDescription
            }
          ]}
        />
        <div className="container contactPage">
          <Breadcrumb dataCategorySlug={this.props.dataCategorySlug} />
          <h2 className="title">{getStringVal(this.props.language, "CONNECT_WITH_US")}</h2>
          <div className="row">
            <div className="col-12 col-md-7">
              <BranchInfoPart />
            </div>
            <div className="col-12 col-md-5">
              <ContactUsPart />
            </div>
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

const mapDispatchToProps = dispatch => ({
  getIthoobInfo: language => {
    dispatch(getIthoobInfo(language));
  },
  updateBreadcrumb: language => {
    dispatch(updateBreadcrumb(language));
  }
});
export default connect(
  mapGeneralStateToProps,
  mapDispatchToProps
)(ContactPageLayout);
