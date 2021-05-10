import React, { Component } from "react";
import { connect } from "react-redux";
import Link from "next/link";
//included components
import Breadcrumb from "../includes/breadcrumb";
class Banner extends Component {
  render() {
    return (
      <div className="bannerWrapper">
        <img src={require('../../images/Image.jpg')} alt="Ithoob" className="w-100s" />

        <div className="bannerWrapper__content"><div className="container">
          <div className="row">
            <div className="col-12">
              <div>
              <Breadcrumb
                  dataCategorySlug={this.props.dataCategorySlug}
                  dataProductList={this.props.productList}
                />
                <div className="title">
                  {this.props.categories && this.props.categories.length > 0
                    ? this.props.categories.map(x =>
                        x.slug === this.props.dataCategorySlug.slug ||
                        x.subCategory.find(
                          y => y.slug === this.props.dataCategorySlug.slug
                        ) ? (
                          <h3
                            key={x.slug}
                            className="sideFilterContainer__sideFilter__mainMenu"
                          >
                            <span className="sideFilterContainer__sideFilter__mainMenu__Title">
                              {x.mainCategory}
                            </span>
                          </h3>
                        ) : (
                          ""
                        )
                      )
                    : ""}
                </div>

               
              </div>
            </div>
          </div>
        </div></div>
      </div>
    );
  }
}

const mapProductListStateToProps = state => ({
  language: state.generalReducer.language,
  products: state.productList.products,
  productList: state.productList,
  dataCategorySlug: state.productList.dataCategorySlug,

  categories: state.categories.categories,
  activeMenu: state.categories.activeMenu
});

export default connect(
  mapProductListStateToProps,
  null
)(Banner);
