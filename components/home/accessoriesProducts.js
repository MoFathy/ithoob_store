import React, { Component } from "react";
import { connect } from "react-redux";

import ProductCategory from "../includes/productCategorySlickSlider";

class AccessoriesProducts extends Component {
  render() {
    return (
      <ProductCategory
        dataCategory={this.props.accessoriesCategory}
        dataStatus={this.props.status}
        dataMessage={this.props.message}
        className="accessoriesProducts"
      />
    );
  }
}

const mapHomeProductsStateToProps = state => ({
  status: state.homeProducts.status,
  message: state.homeProducts.message,
  language: state.homeProducts.language,
  accessoriesCategory: state.homeProducts.accessoriesCategory
});

export default connect(
  mapHomeProductsStateToProps,
  null
)(AccessoriesProducts);
