import React, { Component } from "react";
import { connect } from "react-redux";
import ProductCategory from "../includes/productCategorySlickSlider";
// import {
//   getHomeProducts,
//   getHomeProductsSuccess,
//   getHomeProductsFail
// } from "../../actions/home/homeProducts";

class AthwabProducts extends Component {
  render() {
    return (
      <ProductCategory
        dataCategory={this.props.athwabCategory}
        dataStatus={this.props.status}
        dataMessage={this.props.message}
        dataLazy="false"
        className="athwabProducts"
      />
    );
  }
}

const mapHomeProductsStateToProps = state => ({
  status: state.homeProducts.status,
  message: state.homeProducts.message,
  language: state.homeProducts.language,
  athwabCategory: state.homeProducts.athwabCategory
});

// const mapHomeProductsDispatchToProps = dispatch => ({
//   getHomeProducts: language => {
//     dispatch(getHomeProducts(language))
//       .then(res => {
//         if (res.data.status === true) {
//           dispatch(getHomeProductsSuccess(res.data));
//         } else {
//           dispatch(getHomeProductsFail(res.data));
//         }
//       })
//       .catch(err => {
//         console.log(err);
//         dispatch(
//           getHomeProductsFail({
//             status: false,
//             message: "Error in home product from catch"
//           })
//         );
//       });
//   }
// });

export default connect(
  mapHomeProductsStateToProps,
  null
)(AthwabProducts);
