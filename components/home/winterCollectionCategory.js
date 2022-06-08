import React, { Component } from "react";
import { connect } from "react-redux";
import ProductCategory from "../includes/productCategorySlickSlider";
class WinterCollectionCategory extends Component {
  render() {
    return (
      <ProductCategory
        dataCategory={this.props.winterCollectionCategory}
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
  winterCollectionCategory: state.homeProducts.winterCollectionCategory
});
export default connect(
  mapHomeProductsStateToProps,
  null
)(WinterCollectionCategory);
