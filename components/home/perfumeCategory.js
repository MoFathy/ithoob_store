import React, { Component } from "react";
import { connect } from "react-redux";
import ProductCategory from "../includes/productCategorySlickSlider";
class PerfumeCategory extends Component {
  render() {
    return (
      <ProductCategory
        dataCategory={this.props.perfumeCategory}
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
  perfumeCategory: state.homeProducts.perfumeCategory
});
export default connect(
  mapHomeProductsStateToProps,
  null
)(PerfumeCategory);
