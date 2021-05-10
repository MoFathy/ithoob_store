import React, { Component } from "react";
import { connect } from "react-redux";
import Link from "next/link";
//included components
import Layout from "../components/layouts/mainLayout.js";
import Filter from "../components/includes/filter";
import ProductsList from "../components/productList/productsListComponent";

import Banner from "../components/productList/banner";
import Helmet from "react-helmet";
//actions
import {
  resetProductList,
  updatePageIndex,
  updateLoader,
  updateSlug,
  initialProductList
} from "../actions/productList/productList";

import { setActiveMenu } from "../actions/header/categories.js";

import { changeLangWithoutCookie } from "../actions/includes/general";
import { changeIthoobCookie } from "../actions/loginPopUp/loginActions";
import cookies from "next-cookies";

class ProductsListPage extends Component {
  static async getInitialProps({ reduxStore, query, pathname, req }) {
    // await reduxStore.dispatch(
    //   getcategories(reduxStore.getState().categories.language)
    // );
    reduxStore.dispatch(setActiveMenu(pathname + "?slug=" + query.slug));
    reduxStore.dispatch(initialProductList());
    const { lang } = cookies({ req: req });
    const { ithoobUser } = cookies({ req: req });
    reduxStore.dispatch(
      changeLangWithoutCookie(lang === "false" ? false : true)
    );
    if (ithoobUser) {
      reduxStore.dispatch(changeIthoobCookie(1));
    }

    await reduxStore.dispatch(updatePageIndex(1));
    reduxStore.dispatch(updateSlug(query));
    // console.log("from product list");
    await reduxStore.dispatch(
      resetProductList(
        lang === "false" ? 1 : 2,
        1,
        reduxStore.getState().productList.pageSize,
        query.slug
      )
    );
    await reduxStore.dispatch(updateLoader(false));
    return {
      productList: { ...reduxStore.getState().productList },
      dataCategorySlug: query,
      pageSize: reduxStore.getState().productList.pageSize,
      queryString: query.code ? query.code : null
    };
  }
  componentDidUpdate(prevProps) {
    if (this.props.language !== prevProps.language) {
      this.props.dispatch(
        resetProductList(
          this.props.language === false ? 1 : 2,
          1,
          this.props.pageSize,
          this.props.dataCategorySlug.slug
        )
      );
    }
  }
  // componentWillUnmount() {
  //   console.log("initialProductList2");
  //   this.props.dispatch(initialProductList());
  // }
  render() {
    var categoryTitle = "";
    var categoryDesc = this.props.categories.siteDescription;
    if (this.props.categories.categories.length > 0) {
      if (
        this.props.categories.categories.find(
          item => item.slug === this.props.dataCategorySlug.slug
        )
      ) {
        categoryTitle = this.props.categories.categories.find(
          item => item.slug === this.props.dataCategorySlug.slug
        ).mainCategory;
        categoryDesc = this.props.categories.categories.find(
          item => item.slug === this.props.dataCategorySlug.slug
        ).seoDesc
          ? this.props.categories.categories.find(
              item => item.slug === this.props.dataCategorySlug.slug
            ).seoDesc
          : categoryDesc;
      } else {
        this.props.categories.categories.map(item => {
          if (
            item.subCategory.find(
              x => x.slug == this.props.dataCategorySlug.slug
            )
          ) {
            categoryTitle = item.subCategory.find(
              x => x.slug == this.props.dataCategorySlug.slug
            ).name;
            categoryDesc = item.subCategory.find(
              x => x.slug == this.props.dataCategorySlug.slug
            ).seoDesc
              ? item.subCategory.find(
                  x => x.slug == this.props.dataCategorySlug.slug
                ).seoDesc
              : categoryDesc;
          }
        });
      }
    }
    return (
      <Layout
        queryString={this.props.queryString}
        classNameData="productListPage"
      >
        <Helmet
          title={this.props.categories.siteTitle + " | " + categoryTitle}
          meta={[
            { property: "description", content: categoryDesc },
            {
              property: "og:locale",
              content: this.props.language === false ? "en_US" : "ar"
            },
            { property: "og:type", content: "website" },
            {
              property: "og:title",
              content: this.props.categories.siteTitle + " | " + categoryTitle
            },
            { property: "og:description", content: categoryDesc },
            {
              property: "og:site_name",
              content: this.props.categories.siteTitle
            },
            {
              property: "twitter:title",
              content: this.props.categories.siteTitle + " | " + categoryTitle
            },
            { property: "twitter:description", content: categoryDesc }
          ]}
        />

        <div id="productListPage">
          <Banner />
          <div className="content">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <Filter dataCategorySlug={this.props.dataCategorySlug} />
                </div>
                <div className="col-12">
                  <ProductsList
                    dataCategorySlug={this.props.dataCategorySlug}
                  />
                </div>
              </div>
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
export default connect(mapGeneralStateToProps, null)(ProductsListPage);
