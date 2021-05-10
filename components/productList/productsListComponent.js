import React, { Component } from "react";
// import link from "next/link";
// import ScrollMagic from "scrollmagic";
import ProductCard from "../includes/productCard";
import { connect } from "react-redux";
import {
  getProductList,
  updatePageIndex,
  updateCallingApiStatusWhileScrollig,
  updateLoader,
  updateScrollingLoader
} from "../../actions/productList/productList";
// import { updateBreadcrumb } from "../../actions/includes/breadcrumb";
import { getStringVal } from "../../scripts/multiLang";
//image
import loader from "../../images/scroll-loader.png";

class ProductsList extends Component {
  componentDidMount() {
    const ScrollMagic = require("scrollmagic/scrollmagic/minified/ScrollMagic.min.js");
    // init scrollmagic
    this.controller = new ScrollMagic.Controller();
    // build a scene
    new ScrollMagic.Scene({ triggerElement: "#footer", triggerHook: "onEnter" })
      .addTo(this.controller)
      .on("enter", this.addNewItems);
  }

  addNewItems = () => {
    if (
      this.props.stopCallingApiWhileScrollig === false &&
      this.props.productsLength == this.props.pageSize
    ) {
      // if (this.props.stopCallingApiWhileScrollig === false) {
      this.props.updateCallingApiStatusWhileScrollig(true);
      let newPageIndex = this.props.pageIndex + 1;
      this.props.updatePageIndex(newPageIndex);
      this.props.getProductList(
        // this.props.language,
        this.props.language === false ? 1 : 2,
        this.props.pageIndex,
        this.props.pageSize,
        this.props.dataCategorySlug.slug
      );
      this.props.updateScrollingLoader(true);
      // }
    } else {
      this.props.updateScrollingLoader(false);
    }
  };

  render() {
    const product =
      (this.props.status && this.props.products.length > 0) ||
      (!this.props.status && this.props.products.length > 0) ? (
        <div className="row">
          {this.props.products.map((item, index) => (

              <div className="col-6 col-md-3" key={index}>
                <ProductCard dataItem={item} dataKey={index} />
              </div>
            
          ))}
          {this.props.products.length > this.props.pageSize &&
          this.props.scrollingLoader == false ? (
            <div className=" alert error col-12 text-center">
              {getStringVal(this.props.language, "NO_MORE_PRODUCTS")}
            </div>
          ) : (
            ""
          )}
        </div>
      ) : this.props.products.length == 0 && this.props.loading == false ? (
        <div className="row">
          <div className="col-12">
            <div className=" alert alert-danger error">
              {getStringVal(
                this.props.language,
                "THERE_IS_NO_PRODUCTS_IN_THIS_CATEGORY"
              )}
            </div>
          </div>
        </div>
      ) : (
        ""
      );
    return (
      <div className="productList">
        {product}

        {this.props.loading == true ? (
          <div className="loader">
            {getStringVal(this.props.language, "LOADING")}
          </div>
        ) : (
          ""
        )}

        {this.props.scrollingLoader == true &&
        this.props.products.length > 9 &&
        this.props.status != true ? (
          <div className="scrollingLoader alert alert-info">
            <img src={loader} alt="" />
            {getStringVal(this.props.language, "LOADING")}
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

const mapProductListStateToProps = state => ({
  language: state.generalReducer.language,
  status: state.productList.status,
  message: state.productList.message,
  products: state.productList.products,
  pageIndex: state.productList.pageIndex,
  pageSize: state.productList.pageSize,
  stopCallingApiWhileScrollig: state.productList.stopCallingApiWhileScrollig,
  loading: state.productList.loading,
  scrollingLoader: state.productList.scrollingLoader,
  productsLength: state.productList.productsLength
});

const mapProductListDispatchToProps = dispatch => ({
  getProductList: (language, pageIndex, pageSize, categorySlug) => {
    dispatch(getProductList(language, pageIndex, pageSize, categorySlug));
  },
  updatePageIndex: newPageIndex => {
    dispatch(updatePageIndex(newPageIndex));
  },
  updateCallingApiStatusWhileScrollig: flag => {
    dispatch(updateCallingApiStatusWhileScrollig(flag));
  },
  updateLoader: loading => {
    dispatch(updateLoader(loading));
  },
  updateScrollingLoader: scrollingLoading => {
    dispatch(updateScrollingLoader(scrollingLoading));
  }
});

// export default ProductsList;
export default connect(
  mapProductListStateToProps,
  mapProductListDispatchToProps
)(ProductsList);
