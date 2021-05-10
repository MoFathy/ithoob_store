import React, { Component } from "react";
import { connect } from "react-redux";
import ProductCategory from "../includes/productCategorySlickSlider";
class RecommendedProducts extends Component {
  render() {
    return (
      <ProductCategory
        dataCategory={this.props.recommendedCategory}
        dataRecommendedCategory={true}
        dataStatus={this.props.status}
        dataMessage={this.props.message}
        className="recommendedProducts"
      />
    );
  }
}

const mapHomeProductsStateToProps = state => ({
  status: state.homeProducts.status,
  message: state.homeProducts.message,
  language: state.homeProducts.language,
  recommendedCategory: state.homeProducts.recommendedCategory
});

export default connect(
  mapHomeProductsStateToProps,
  null
)(RecommendedProducts);
