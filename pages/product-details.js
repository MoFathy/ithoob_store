import React, { Component } from "react";
import { connect } from "react-redux";
//included components
import Layout from "../components/layouts/mainLayout.js";
import Breadcrumb from "../components/includes/breadcrumb";
// import Policies from "../components/productDetails/policies";
import ProductDetailsComponent from "../components/productDetails/productDetailsComponent";
import MoreProducts from "../components/productDetails/moreProducts";
//actions
import { getProductDetails } from "../actions/productDetails/productDetails";
import { setActiveMenu } from "../actions/header/categories.js";
import { updateQuantity } from "../actions/productDetails/productDetails";
import { storeSizeID } from "../actions/includes/carouselActions";
import { changeLangWithoutCookie } from "../actions/includes/general";
import { changeIthoobCookie } from "../actions/loginPopUp/loginActions";
import cookies from "next-cookies";
import Helmet from "react-helmet";
class ProductDetailsPage extends Component {
  static async getInitialProps({ reduxStore, query, pathname, req }) {
    reduxStore.dispatch(setActiveMenu(pathname));

    const { lang } = cookies({ req: req });
    const { ithoobUser } = cookies({ req: req });
    reduxStore.dispatch(
      changeLangWithoutCookie(lang === "false" ? false : true)
    );
    reduxStore.dispatch(updateQuantity(1));
    reduxStore.dispatch(storeSizeID(""));
    if (ithoobUser) {
      reduxStore.dispatch(changeIthoobCookie(1));
    }

    await reduxStore.dispatch(
      getProductDetails(lang === "false" ? 1 : 2, query.slug)
    );
    return {
      productDetails: { ...reduxStore.getState().productDetails },
      dataCategorySlug: query,
      queryString: query.code ? query.code : null,
      pathname: pathname
      // title: reduxStore.getState().productDetails.productDetails.title
    };
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.language !== prevProps.language
      // ||
      // this.props.ithoobCookie !== prevProps.ithoobCookie
    ) {
      this.props.dispatch(
        getProductDetails(
          this.props.language === false ? 1 : 2,
          this.props.dataCategorySlug.slug
        )
      );
    }
  }
  render() {
    return (
      <Layout
        queryString={this.props.queryString}
        classNameData="productDetails withInnerHeader"
      >
        <Helmet
          title={this.props.categories.siteTitle + " | " + this.props.title}
          meta={[
            {
              property: "description",
              content: this.props.productDetails.productDetails.subTitle
                ? this.props.productDetails.productDetails.subTitle
                : this.props.categories.siteDescription
            },
            {
              property: "og:locale",
              content: this.props.language === false ? "en_US" : "ar"
            },
            { property: "og:type", content: "website" },
            {
              property: "og:title",
              content:
                this.props.categories.siteTitle + " | " + this.props.title
            },
            {
              property: "og:description",
              content: this.props.productDetails.productDetails.subTitle
                ? this.props.productDetails.productDetails.subTitle
                : this.props.categories.siteDescription
            },
            {
              property: "og:site_name",
              content:
                this.props.categories.siteTitle + " | " + this.props.title
            },
            {
              property: "twitter:title",
              content:
                this.props.categories.siteTitle + " | " + this.props.title
            },
            {
              property: "twitter:description",
              content: this.props.productDetails.productDetails.subTitle
                ? this.props.productDetails.productDetails.subTitle
                : this.props.categories.siteDescription
            }
          ]}
        />
        <div className="content">
          <div className="container">
            <Breadcrumb
              dataCategorySlug={this.props.dataCategorySlug}
              title={this.props.title}
            />
            <ProductDetailsComponent
              pathname={this.props.pathname}
              dataCategorySlug={this.props.dataCategorySlug}
            />
            {/* <Policies /> */}
            <div className="row">
              <MoreProducts dataCategorySlug={this.props.dataCategorySlug} />
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}
const mapGeneralStateToProps = state => ({
  language: state.generalReducer.language,
  categories: state.categories,
  title: state.productDetails.productDetails.title,
  ithoobCookie: state.loginReducer.ithoobCookie
});
export default connect(mapGeneralStateToProps, null)(ProductDetailsPage);
