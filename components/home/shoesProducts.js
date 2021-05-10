import React, { Component } from "react";
import { connect } from "react-redux";
import ProductCategory from "../includes/productCategorySlickSlider";
class ShoesProducts extends Component {
  render() {
    return (
      <ProductCategory
        dataCategory={this.props.shoesCategory}
        dataStatus={this.props.status}
        dataMessage={this.props.message}
        className="shoesProducts"
      />
    );
  }
}
const mapHomeProductsStateToProps = state => ({
  status: state.homeProducts.status,
  message: state.homeProducts.message,
  language: state.homeProducts.language,
  shoesCategory: state.homeProducts.shoesCategory
});

export default connect(
  mapHomeProductsStateToProps,
  null
)(ShoesProducts);
