import React, { Component } from "react";
import { connect } from "react-redux";
import ProductCategory from "../includes/productCategorySlickSlider";
class ClothesProducts extends Component {
  render() {
    return (
      <ProductCategory
        dataCategory={this.props.clothesCategory}
        dataStatus={this.props.status}
        dataMessage={this.props.message}
        className="clothesProducts"
      />
    );
  }
}

const mapHomeProductsStateToProps = state => ({
  status: state.homeProducts.status,
  message: state.homeProducts.message,
  language: state.homeProducts.language,
  clothesCategory: state.homeProducts.clothesCategory
});
export default connect(
  mapHomeProductsStateToProps,
  null
)(ClothesProducts);
