import React, { Component } from "react";
import { connect } from "react-redux";
import $ from "jquery";
import ProductCategory from "../includes/productCategorySlickSlider";
import {
  getMoreProducts,
  toggleProductStatus
} from "../../actions/productDetails/moreProducts";

class MoreProducts extends Component {
  componentDidMount() {
    this.props.getMoreProducts(
      this.props.language === false ? 1 : 2,
      this.props.dataCategorySlug.slug
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.language !== prevProps.language) {
      this.props.getMoreProducts(
        this.props.language === false ? 1 : 2,
        this.props.dataCategorySlug.slug
      );
    }
  }
  componentWillUnmount() {
    this.props.toggleProductStatus(false);
  }
  render() {
    return (
      <ProductCategory
        dataCategory={{ products: this.props.moreProducts }}
        dataStatus={this.props.status}
        dataMessage={this.props.message}
        dataCategorySlug={this.props.dataCategorySlug.slug}
        categories={this.props.categories}
        productsDetailsPage={true}
      />
    );
  }
}

const mapMoreProductsStateToProps = state => ({
  status: state.moreProducts.status,
  message: state.moreProducts.message,
  language: state.generalReducer.language,
  moreProducts: state.moreProducts.moreProducts,
  categories: state.breadcrumb.breadcrumbNew
});

const mapMoreDetailsDispatchToProps = dispatch => ({
  getMoreProducts: (language, slug) => {
    dispatch(getMoreProducts(language, slug));
  },
  toggleProductStatus: flag => {
    dispatch(toggleProductStatus(flag));
  }
});

export default connect(
  mapMoreProductsStateToProps,
  mapMoreDetailsDispatchToProps
)(MoreProducts);
