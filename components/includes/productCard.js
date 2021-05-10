import $ from "jquery";
import React, { Component } from "react";
import Link from "next/link";
import { addToCart } from "../../actions/productDetails/addToCart";
import { connect } from "react-redux";
import { getStringVal } from "../../scripts/multiLang";
import {Img} from 'react-image'
class ProductCard extends Component {
  state = {
    error : false,
    loading : false
  }
  addToCart(e) {
    e.preventDefault();
    this.props.addToCart(
      this.props.language === "false" ? 1 : 2,
      this.props.dataItem.slug,
      this.props.dataItem.title_ar,
      this.props.dataItem.title_en,
      this.props.dataItem.img,
      this.props.dataItem.productId,
      this.props.dataItem.price,
      this.props.dataItem.price_discount,
      this.props.dataItem.tags.discount,
      1,
      this.props.dataItem.sizeType
    );

    // Cart Notification
    let addedToCartModal = document.querySelector('#cartNotification');
    if(addedToCartModal) {
      addedToCartModal.classList.add('active');
  
      setTimeout(() => {
        addedToCartModal.classList.remove('active');
      }, 2000)
    }
  }

  handleClick = (e, id) => {
    const colorId = id;
    const selectedImg = $(e.target)
      .parents(".product")
      .find(".modalColorImg[id = " + colorId + "]");
    if (selectedImg) {
      $(e.target)
        .parents(".product")
        .find(".card-img-top.default")
        .css("display", "none");
      $(e.target)
        .parents(".product")
        .find(".modalColorImg")
        .css("display", "none");
      $(selectedImg).css("display", "block");
    } else {
      $(e.target)
        .parents(".product")
        .find(".card-img-top.default")
        .css("display", "block");
    }
    // const modalImg = $(".modalColorImg").find(img => img.id == colorId);
    // console.log(modalImg);
  };

  render() {
    const { dataItem } = this.props;
    return (
      <div className="product">
        <div className="card">
          <div className="productImg">
            <ul className="productTags">
              {dataItem.tags.discount ? (
                dataItem.tags.discount !== 0 ? (
                  <li
                    className={
                      this.props.language === true
                        ? "tagSpan discount"
                        : "tagSpan discount"
                    }
                  >
                    {dataItem.tags.discount}%
                  </li>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
              {dataItem.tags.isRecommended ? (
                <li className="tagSpan">
                  {getStringVal(this.props.language, "RECOMMENDED_A")}
                </li>
              ) : (
                ""
              )}
              {dataItem.tags.isBestSeller ? (
                <li className="tagSpan">
                  {getStringVal(this.props.language, "BEST_SELLER")}
                </li>
              ) : (
                ""
              )}
              {dataItem.stock == 0 ? (
                <li className="tagSpan">
                  {getStringVal(this.props.language, "THIS_PRODUCT_IS_OUT_OF_STOCK")}
                </li>
              ) : (
                ""
              )}
            </ul>

            <div className={dataItem.stock !== null && dataItem.stock < 1 ? "product-img-wrapper has-out-of-stock-product" : "product-img-wrapper"}>

              {dataItem.img ? (
                this.props.dataLazy == "false" ? (
                  <Img
                    src={[dataItem.img, require('../../images/FsMtu.gif')]}
                    className="card-img-top default"
                  />
                  // <img
                  //   className="card-img-top default"
                  //   src={!this.state.error ? dataItem.img : require('../../images/FsMtu.gif')}
                  //   alt={dataItem.title}
                  //   onError={() => this.setState({error : true})}
                  //   onLoad={() => this.setState({error: false})}
                  // />
                ) : (
                  <Img
                    src={[dataItem.img, require('../../images/FsMtu.gif')]}
                    className="card-img-top default"
                  />
                  // <img
                  //   className="card-img-top default lazyload"
                  //   // data-src={dataItem.img || require('../../images/FsMtu.gif')}
                  //   // alt={dataItem.title}
                  //   data-src={!this.state.error ? dataItem.img : require('../../images/FsMtu.gif')}
                  //   alt={dataItem.title}
                  //   onError={() => this.setState({error : true})}
                  //   onLoad={() => this.setState({error: false})}
                  // />
                )
              ) : (
                ""
              )}

              {dataItem.colors
                ? dataItem.colors.map(color => (
                  <Img
                    src={[color.productImg, require('../../images/FsMtu.gif')]}
                    className="card-img-top modalColorImg"
                    key={color.id}
                    id={color.id}
                  />
                    // <img
                    //   className="card-img-top modalColorImg"
                    //   src={color.productImg}
                    //   alt={dataItem.title}
                    //   key={color.id}
                    //   id={color.id}
                    // />
                  ))
                : ""}

              {dataItem.sizeType == "sizeable" ? (
                <div className="overlayOnHover">
                  <Link
                    href={`/product-details?slug=${dataItem.slug}`}
                    as={`/product-details/${dataItem.slug}`}
                  >
                    <a className="">
                      {getStringVal(this.props.language, "PRODUCT_DISPLAY")}
                    </a>
                  </Link>
                </div>
              ) : (
                <div className="overlayOnHover">

                  {/* If the product is Out of Stock, don't display "Add To Cart" button */}
                  {dataItem.stock > 0 ? (
                    <a className="" onClick={e => this.addToCart(e)} href="#">
                      {getStringVal(this.props.language, "ADD_TO_CART")}
                    </a>
                  ) : ( "" )}

                  <Link
                    href={`/product-details?slug=${dataItem.slug}`}
                    as={`/product-details/${dataItem.slug}`}
                  >
                    <a className="">
                      {getStringVal(this.props.language, "PRODUCT_DISPLAY")}
                    </a>
                  </Link>
                </div>
              )}

              {/* {dataItem.stock !== null && dataItem.stock < 1 ? (
                  <div className="out-of-stock">
                    {getStringVal(this.props.language, "THIS_PRODUCT_IS_OUT_OF_STOCK")}
                  </div>
                ) : (
                  ""
                )
              }         */}
            </div>
          </div>

          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center upperDetails">
              <p>
                {dataItem.season ? (
                  <span className="season">{dataItem.season}</span>
                ) : (
                  ""
                )}
                {dataItem.type ? (
                  <span className="type">{dataItem.type}</span>
                ) : (
                  ""
                )}
              </p>

              {dataItem.tags.discount ? (
                dataItem.tags.discount !== 0 ? (
                  <p
                    className={
                      this.props.language === true
                        ? "card-text priceBeforeDiscount"
                        : "card-text priceBeforeDiscount"
                    }
                  >
                    {dataItem.price}
                    <span className="currency">
                      {getStringVal(this.props.language, "SR")}
                    </span>
                  </p>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </div>

            <div className={`d-flex justify-content-between align-items-center titleAndPrice ${dataItem.tags.isRecommended ? " titleAndPriceHome" : ""}`}
            >
              <Link
                as={`/product-details/${dataItem.slug}`}
                href={`/product-details?slug=${dataItem.slug}`}
              >
                <a>
                  <h5 className="card-title">{dataItem.title}</h5>
                </a>
              </Link>

              {dataItem.tags.discount && dataItem.tags.discount !== 0 ? (
                <p
                  className={
                    this.props.language === true
                      ? "card-text"
                      : "card-text"
                  }
                >
                  {/* {dataItem.price -
                      (dataItem.tags.discount * dataItem.price) / 100} */}
                  {dataItem.price_discount}
                  <span className="currency">
                    {getStringVal(this.props.language, "SR")}
                  </span>
                </p>
              ) : (
                <p
                  className={
                    this.props.language === true
                      ? "card-text"
                      : "card-text"
                  }
                >
                  {dataItem.price}
                  <span className="currency">
                    {getStringVal(this.props.language, "SR")}
                  </span>
                </p>
              )}
            </div>

            {dataItem.sizeType == "sizeable" ?<hr /> : ""}
            {dataItem.desc && dataItem.sizeType == "sizeable" ? (
              <p className={`desc  ${dataItem.tags.isRecommended ? " descHome" : ""}`}>
                {dataItem.desc.length > 70
                  ? dataItem.desc.slice(0, 70)
                  : dataItem.desc}
                {dataItem.desc.length > 70 ? <span>...</span> : ""}
              </p>
            ) : (
              ""
            )}
            {dataItem.colors.length > 0 ?(
              <div className={`colors  ${dataItem.tags.isRecommended ? " colorsHome" : ""}`}>
                {dataItem.colors.map((color, index) => (
                  <Img
                  src={[color.img, require('../../images/FsMtu.gif')]}
                  className="lazyload"
                  key={color.id}
                  id={color.id}
                  onClick={$event => this.handleClick($event, color.id)}
                />
                  // <img
                  //   className="lazyload"
                  //   data-src={color.img}
                  //   alt={dataItem.title}
                  //   key={color.id}
                  //   id={color.id}
                  //   onClick={$event => this.handleClick($event, color.id)}
                  // />
                ))}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}
const mapProductCardToProps = state => ({
  language: state.generalReducer.language
});
const mapProductCardDispatchToProps = dispatch => ({
  addToCart: (
    language,
    slug,
    title,
    title_en,
    img,
    productId,
    price,
    price_discount,
    discount,
    quantity,
    sizeType
  ) => {
    dispatch(
      addToCart(
        language,
        slug,
        title,
        title_en,
        img,
        productId,
        price,
        price_discount,
        discount,
        null,
        null,
        quantity,
        null,
        null,
        null,
        sizeType
      )
    );
  }
});
export default connect(
  mapProductCardToProps,
  mapProductCardDispatchToProps
)(ProductCard);
