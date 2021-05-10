import React, { Component } from "react";
import { connect } from "react-redux";
import CustomsPart from "../components/customizationsPage/customs-part";
import SidebarPart from "../components/customizationsPage/sideBar-part";
import "../style.scss";
import { getFabrics } from "../actions/customizationsPage/fabricsActions";
import { setActiveMenu } from "../actions/header/categories.js";

import { changeLangWithoutCookie } from "../actions/includes/general";
import { changeIthoobCookie } from "../actions/loginPopUp/loginActions";
import cookies from "next-cookies";
import Helmet from "react-helmet";
import NProgress from "nprogress";
import Router from "next/router";
NProgress.configure({ showSpinner: false });
Router.events.on("routeChangeStart", url => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
// Router.events.on('routeChangeError', () => NProgress.done())

Router.events.on("routeChangeComplete", () => {
  NProgress.done();
});

//layout of customizations page
class CustomizationsLayout extends React.Component {
  static async getInitialProps({ reduxStore, query, pathname, req }) {
    const { lang } = cookies({ req: req });
    const { ithoobUser } = cookies({ req: req });
    reduxStore.dispatch(setActiveMenu(pathname));
    reduxStore.dispatch(
      changeLangWithoutCookie(lang === "false" ? false : true)
    );
    if (ithoobUser) {
      reduxStore.dispatch(changeIthoobCookie(1));
    }
    await reduxStore.dispatch(getFabrics(lang === "false" ? 1 : 2));
    return {
      fabricsObject: { ...reduxStore.getState().customsReducer.generalitems },
      itemid: query.itemid,
      queryString: query.code ? query.code : null,
      pathname: pathname
    };
  }
  // componentDidMount(){
  //   $("body").height(window.innerHeight)
  // }

  componentDidUpdate(prevProps) {
    if (this.props.language !== prevProps.language) {
      this.props.dispatch(getFabrics(this.props.language === false ? 1 : 2));
    }
  }


  render() {
    return (
      <div className={
        "customizations " +
        (this.props.language === false ? "page__en" : "page__ar")
      }>
        <div
          className="container"
        >
          <Helmet
            title={this.props.categories.siteTitle + " | Customization"}
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
                content: this.props.categories.siteTitle + " | Customization"
              },
              {
                property: "og:description",
                content: this.props.categories.siteDescription
              },
              {
                property: "og:site_name",
                content: this.props.categories.siteTitle + " | Customization"
              },
              {
                property: "twitter:title",
                content: this.props.categories.siteTitle + " | Customization"
              },
              {
                property: "twitter:description",
                content: this.props.categories.siteDescription
              }
            ]}
          />
          <div className="customsPage row">
            <div className="sidebarContainer col-lg-4">
              <SidebarPart itemid={this.props.itemid} />
            </div>
            <div className="customsContainer col-lg-8">
              <CustomsPart
                queryString={this.props.queryString}
                itemid={this.props.itemid}
                queryValue={this.props.activeMenu}
                pathname={this.props.pathname}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapCustomizationStateToProps = state => ({
  language: state.generalReducer.language,
  categories: state.categories,
  activeMenu: state.categories.activeMenu
});
export default connect(mapCustomizationStateToProps)(CustomizationsLayout);
