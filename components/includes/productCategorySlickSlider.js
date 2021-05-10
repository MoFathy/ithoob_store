import React, { Component } from "react";
// import "slick-carousel";
// import { NavLink } from "react-router-dom";
import Link from "next/link";
import { getStringVal } from "../../scripts/multiLang";
import { connect } from "react-redux";

// import $ from "jquery";
// import 'slick-carousel/slick/slick';

import $ from "jquery";
// import "slick-carousel/slick/slick.js";
import ProductCard from "./productCard";

class ProductCategory extends Component {
  componentDidMount() {
    require("jquery");
    const slick = require("slick-carousel/slick/slick.js");
    $(".productSlider.slick-initialized").slick("destroy");
    this.initSlick();
  }

  initSlick = () => {
    $(".productSlider")
      .not(".slick-initialized")
      .slick({
        slidesToShow: 4,
        // slidesToScroll: 1,
        // infinite: true,
        infinite: false,
        // rtl: true,
        // initialSlide: 1,
        nextArrow: '<span class="icon-arrow-right"></span>',
        prevArrow: '<span class="icon-arrow-left"></span>',
        initialSlide: 0,
        // variableWidth: true,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 3,
              arrows: true,
              // initialSlide: 3,
            },
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              arrows: true,
            },
          },
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 2,
              arrows: true,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              arrows: true,
            },
          },
          {
            breakpoint: 320,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      });
  };
  componentDidUpdate(prevProps) {
    if (
      this.props.dataCategory.products !== prevProps.dataCategory.products &&
      this.props.dataStatus &&
      this.props.dataCategory.products.length != 0
    ) {
      if ($(".productSlider").hasClass(".slick-initialized")) {
        $(
          ".productSlider.slick-initialized .slick-arrow,.productSlider.slick-initialized .slick-arrow"
        ).remove();
        $(".productSlider.slick-initialized").slick("reinit");
      } else if (this.props.dataCategory.products.length != 0) {
        this.initSlick();
      }
    }
  }

  componentWillUnmount() {
    $(".productSlider").html("");
  }
  render() {
    const {
      dataCategory,
      dataStatus,
      dataMessage,
      categories,
      dataRecommendedCategory,
      productsDetailsPage,
    } = this.props;
    return (
      <div
        className={
          this.props.className && this.props.className.length > 0
            ? `homeCategory ${this.props.className}`
            : "homeCategory"
        }
      >
        <div className="container">
          {dataCategory.title && !productsDetailsPage ? (
            <h1 className="homeCategory__categoryTitle">
              <span>
                {!dataRecommendedCategory
                  ? getStringVal(this.props.language, "LATEST") + " " + dataCategory.title
                  : getStringVal(this.props.language, "RECOMMENDED")}{" "}
                
              </span>
              {!dataRecommendedCategory ? (
                <Link
                  as={`/products-list/${dataCategory.slug}`}
                  href={`/productsList?slug=${dataCategory.slug}`}
                >
                  <a>
                    {getStringVal(this.props.language, "VIEW_MORE")}{" "}
                    {`${dataCategory.title}`}
                  </a>
                </Link>
              ) : (
                ""
              )}
            </h1>
          ) : this.props.categories && this.props.categories.length > 0 ? (
            <h1 className="homeCategory__categoryTitle">
              <span>
                {getStringVal(this.props.language, "MORE_OF")}{" "}
                {this.props.categories[0].title}
              </span>
            </h1>
          ) : (
            ""
          )}

          {dataStatus &&
          dataCategory.products &&
          dataCategory.products.length > 0 ? (
            <div className="homeCategory__products productSlider row">
              {dataCategory.products.map((product, index) => (
                // index === 3 && dataCategory.commercialDesc ? (
                //   <div className="product" data-index={index} key={index}>
                //     <div className="card">
                //       <div className="commercialCard">
                //         <p>{dataCategory.commercialDesc}</p>
                //         <Link
                //           as={`/products-list/${dataCategory.slug}`}
                //           href={`/products-list?slug=${dataCategory.slug}`}
                //         >
                //           <a className="btn button">
                //             {getStringVal(this.props.language, "SHOP_NOW")}
                //           </a>
                //         </Link>
                //       </div>
                //     </div>
                //   </div>
                // ) :

                <div
                  key={index}
                  // dataIndex={index}
                >
                  <ProductCard
                    dataItem={product}
                    dataSlug={dataCategory.slug}
                    dataCategory={dataCategory}
                    dataLazy={this.props.dataLazy}
                  />
                </div>
              ))}

              {/*               
              {dataCategory.commercialDesc ? (
                <div className="product" data-index="-1" key="-1">
                  <div className="card">
                    <div className="commercialCard">
                      <p>{dataCategory.commercialDesc}</p>
                      <Link
                        as={`/products-list/${dataCategory.slug}`}
                        href={`/products-list?slug=${dataCategory.slug}`}
                      >
                        <a className="btn button">
                          {getStringVal(this.props.language, "SHOP_NOW")}
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )} */}
            </div>
          ) : dataMessage && dataMessage.length > 0 ? (
            <div className="alert alert-danger">{dataMessage}</div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

const mapCartHeaderStateToProps = (state) => ({
  language: state.generalReducer.language,
  ithoobCookie: state.loginReducer.ithoobCookie,
  cartCount: state.cartHeader.cartCount,
  cartItems: state.cartHeader.cartItems,
});
export default connect(mapCartHeaderStateToProps, null)(ProductCategory);
