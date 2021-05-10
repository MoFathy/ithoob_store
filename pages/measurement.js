import React, { Component } from "react";
import { connect } from "react-redux";
//included components
import Layout from "../components/layouts/mainLayout.js";
import MeasurementGuideTabs from "../components/measurementGuide/measurementGuideTabs";
import Breadcrumb from "../components/measurementGuide/breadcrumb";

//actions
import { getMeasurements } from "../actions/measurementsGuide/measurementsGuideActions";
import { setActiveMenu } from "../actions/header/categories.js";
import { changeLangWithoutCookie } from "../actions/includes/general";
import cookies from "next-cookies";
import Helmet from "react-helmet";




class MeasurementsGuide extends Component {
  static async getInitialProps({ reduxStore, query, pathname, req }) {
    reduxStore.dispatch(setActiveMenu(pathname + "?slug=" + query.slug));

    const { lang } = cookies({ req: req });

    reduxStore.dispatch(
      changeLangWithoutCookie(lang === "false" ? false : true)
    );

    await reduxStore.dispatch(getMeasurements(lang === "false" ? 1 : 2));

    return {
      measurementGuide: { ...reduxStore.getState().measurementGuide },
      queryString: query.code ? query.code : null
    };
  }
  componentDidMount() {
  }
  
  componentDidUpdate(prevProps) {
    if (this.props.language !== prevProps.language) {
      this.props.dispatch(
        getMeasurements(this.props.language === false ? 1 : 2)
      );
    }
  }


  render() {
    return (
      <Layout queryString={this.props.queryString} classNameData="measurementsGuidePage withInnerHeader">
        <Helmet
          title={this.props.categories.siteTitle + " | Measurements Guide"}
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
              content: this.props.categories.siteTitle + " | Measurements Guide"
            },
            {
              property: "og:description",
              content: this.props.categories.siteDescription
            },
            {
              property: "og:site_name",
              content: this.props.categories.siteTitle + " | Measurements Guide"
            },
            {
              property: "twitter:title",
              content: this.props.categories.siteTitle + " | Measurements Guide"
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
            <MeasurementGuideTabs />
          </div>
        </div>
      </Layout>
    );
  }
}
const mapMeasurmentGuideStateToProps = state => ({
  language: state.generalReducer.language,
  categories: state.categories
});

export default connect(
  mapMeasurmentGuideStateToProps,
  null
)(MeasurementsGuide);
// measurementGuide
